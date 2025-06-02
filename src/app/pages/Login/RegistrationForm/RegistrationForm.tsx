import { Progress, Stack, Text } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useState } from 'react';
import { Form, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { StatusCode } from '~/query/constants';
import { useSignupMutation } from '~/query/create-auth-api';
import { StatusResponse } from '~/query/types';
import { Error, removeNotification, setAppLoader, setNotification } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

import { VerificationEmailModal } from '../Modal/VerificationEmailModal';
import { registrationFormSchema } from '../schemes';
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

export const RegistrationForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
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
            .filter((it) => it[1] && it[1].length !== 0)
            .flatMap((it) => it[0])
            .filter((it) => !Object.keys(formErrors).includes(it)).length;
        return (100 / numFields) * numValidFields;
    };

    const [singnup] = useSignupMutation();
    const handleOnError = useCallback((response?: StatusResponse) => {
        switch (response?.status) {
            case StatusCode.BadRequest:
                dispatch(
                    setNotification({
                        _id: crypto.randomUUID(),
                        title: response.data.message,
                        type: 'error',
                    }),
                );
                break;
            case StatusCode.InternalServerError:
                dispatch(
                    setNotification({
                        _id: crypto.randomUUID(),
                        title: Error.SERVER,
                        message: 'Попробуйте немного позже',
                        type: 'error',
                    }),
                );
                break;
            default:
                dispatch(
                    setNotification({
                        _id: crypto.randomUUID(),
                        title: response!.data.error,
                        message: response!.data.message,
                        type: 'error',
                    }),
                );
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
                dispatch(removeNotification());
                dispatch(setAppLoader(true));
                await singnup(data as RegistrationFormData).unwrap();
                setIsShowSuccessModalDialog(true);
            } catch (e) {
                handleOnError(e as StatusResponse);
            } finally {
                dispatch(setAppLoader(false));
            }
        },
        [dispatch, singnup],
    );

    const progress = getProgress();
    return (
        <>
            <Form control={control} data-test-id='sign-up-form'>
                <Stack spacing={{ base: '24px' }}>
                    <Stack>
                        <label>
                            <Text textStyle='textMdLh6Normal'>{steps[currentStep].title}</Text>
                        </label>
                        <Progress
                            height='8px'
                            backgroundColor='blackAlpha.100'
                            data-test-id='sign-up-progress'
                            aria-valuenow={progress}
                            sx={{
                                '& > div': {
                                    backgroundColor: 'lime.300',
                                },
                            }}
                            hasStripe
                            value={progress}
                            width='100%'
                        />
                    </Stack>
                    {steps[currentStep].content}
                </Stack>
            </Form>
            {isShowSuccessModalDialog && (
                <VerificationEmailModal
                    email={getValues().email}
                    onClickClose={() => {
                        navigate('/login', { replace: true });
                    }}
                />
            )}
        </>
    );
};
