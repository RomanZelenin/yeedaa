import { Progress, Stack, Text } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Form, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { ErrorAlert } from '~/common/components/Alert/ErrorAlert';
import { LoginResponse, useSignupMutation } from '~/query/create-api';
import { Error, ResponseError, setAppLoader } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

import { VerificationEmailModal } from '../Modal/VerificationEmailModal';
import { LoginAndPassword } from './LoginAndPassword';
import { PersonalInformation } from './PersonalInformation';

export type RegistrationFormData = {
    firstName: string;
    lastName: string;
    email: string;
    login: string;
    password: string;
    confirmPassword: string;
};

const registrationFormSchema: yup.ObjectSchema<RegistrationFormData> = yup
    .object({
        firstName: yup
            .string()
            .required('Введите имя')
            .max(50, 'Максимальная длина 50 символов')
            .test({
                name: 'start-first-name',
                test(value, ctx) {
                    if (!/^[А-ЯЁ]/.test(value)) {
                        return ctx.createError({
                            message: 'Должно начинаться с кириллицы А-Я',
                        });
                    }
                    if (!/^[а-яА-ЯЁё-]*$/.test(value)) {
                        return ctx.createError({ message: 'Только кириллица А-Я, и "-"' });
                    }
                    return true;
                },
            }),
        lastName: yup
            .string()
            .required('Введите фамилию')
            .max(50, 'Максимальная длина 50 символов')
            .test({
                name: 'start-last-name',
                test(value, ctx) {
                    if (!/^[А-ЯЁ]/.test(value)) {
                        return ctx.createError({
                            message: 'Должно начинаться с кириллицы А-Я',
                        });
                    }
                    if (!/^[а-яА-ЯЁё-]*$/.test(value)) {
                        return ctx.createError({ message: 'Только кириллица А-Я, и "-"' });
                    }
                    return true;
                },
            }),
        email: yup
            .string()
            .required('Введите e-mail')
            .test({
                name: 'email',
                test(value, ctx) {
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                        return ctx.createError({ message: 'Введите корректный e-mail' });
                    }

                    return true;
                },
            })
            .max(50, 'Максимальная длина 50 символов'),
        login: yup
            .string()
            .required('Введите логин')
            .max(50, 'Максимальная длина 50 символов')
            .min(5, 'Не соответствует формату')
            .test({
                name: 'valid-symbols',
                test(value, ctx) {
                    if (!/^[A-Za-z0-9!@#$&_+\-.]+$/.test(value)) {
                        return ctx.createError({ message: 'Не соответствует формату' });
                    }
                    return true;
                },
            }),
        password: yup
            .string()
            .required('Введите пароль')
            .max(50, 'Максимальная длина 50 символов')
            .min(8, 'Не соответствует формату')
            .test({
                name: 'valid-symbols',
                test(value, ctx) {
                    if (!/^(?=.*[A-Z])(?=.*\d)[A-Za-z0-9!@#$&_+\-.]+$/.test(value)) {
                        return ctx.createError({ message: 'Не соответствует формату' });
                    }
                    return true;
                },
            }),
        confirmPassword: yup
            .string()
            .required('Повторите пароль')
            .when('password', (password, schema) =>
                password && password.length > 0
                    ? schema.oneOf(password, 'Пароли должны совпадать')
                    : schema,
            ),
    })
    .required();

export const RegistrationForm = () => {
    const dispatch = useAppDispatch();
    const [error, setError] = useState<ResponseError>({ value: Error.NONE });
    const [isShowSuccessModalDialog, setIsShowSuccessModalDialog] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };
    const {
        trigger,
        watch,
        getValues,
        control,
        register,
        clearErrors,
        formState: { errors: formErrors },
    } = useForm({
        resolver: yupResolver(registrationFormSchema),
        mode: 'onChange',
    });
    const steps = [
        {
            title: 'Шаг 1. Личная информация',
            content: (
                <PersonalInformation
                    onClickNext={() => {
                        if (progress === 50) {
                            clearErrors();
                            nextStep();
                        }
                    }}
                    register={register}
                    errors={formErrors}
                />
            ),
        },
        {
            title: 'Шаг 2. Логин и пароль',
            content: (
                <LoginAndPassword
                    onClickRegister={() => {
                        if (progress === 100) {
                            onSubmit({ data: getValues() });
                        }
                    }}
                    register={register}
                    errors={formErrors}
                />
            ),
        },
    ];

    const password = watch('password');
    useEffect(() => {
        if (watch('confirmPassword')) {
            trigger('confirmPassword');
        }
    }, [password, trigger]);

    const getProgress = () => {
        const numFields = 6;
        const numValidFields = Object.entries(watch())
            .filter((it) => it[1].length !== 0)
            .flatMap((it) => it[0])
            .filter((it) => !Object.keys(formErrors).includes(it)).length;
        return (100 / numFields) * numValidFields;
    };

    const [singnup] = useSignupMutation();
    const handleOnError = useCallback((response?: LoginResponse) => {
        switch (response?.status) {
            case 400:
                setError({
                    value: response.data.message,
                    message: '',
                });
                break;
            case 500:
            default:
                setError({
                    value: Error.SERVER,
                    message: 'Попробуйте немного позже',
                });
        }
    }, []);
    const onSubmit = useCallback(
        async ({
            data,
        }: {
            formData?: FormData;
            data: RegistrationFormData;
            formDataJson?: string;
            event?: React.BaseSyntheticEvent;
        }) => {
            try {
                setError({ value: Error.NONE });
                dispatch(setAppLoader(true));
                await singnup(data as RegistrationFormData).unwrap();
                setIsShowSuccessModalDialog(true);
            } catch (e) {
                handleOnError(e as LoginResponse);
            } finally {
                dispatch(setAppLoader(false));
            }
        },
        [dispatch, singnup],
    );

    const progress = getProgress();
    return (
        <>
            <ErrorHandler error={error}>
                <Form control={control}>
                    <Stack spacing={{ base: '24px' }}>
                        <Stack>
                            <label>
                                <Text textStyle='textMdLh6Normal'>{steps[currentStep].title}</Text>
                            </label>
                            <Progress
                                aria-valuenow={progress}
                                colorScheme='green'
                                hasStripe
                                value={progress}
                                width='100%'
                            />
                        </Stack>
                        {steps[currentStep].content}
                    </Stack>
                </Form>
            </ErrorHandler>
            {isShowSuccessModalDialog && <VerificationEmailModal email={getValues().email} />}
        </>
    );
};

const ErrorHandler = ({ children, error }: { children: ReactNode; error: ResponseError }) => {
    let alert = null;
    switch (error.value) {
        case Error.NONE:
            alert = null;
            break;
        default:
            alert = (
                <ErrorAlert
                    bottom='20px'
                    title={error.value}
                    message={error.message ?? ''}
                    position='absolute'
                />
            );
    }
    return (
        <>
            {children}
            {alert}
        </>
    );
};
