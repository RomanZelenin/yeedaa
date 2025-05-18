import { Button, Input, Stack, Text, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useState } from 'react';
import { Form, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { PasswordInput } from '~/common/components/PasswordInput/PasswordInput';
import { LoginResponse, useResetPasswordMutation } from '~/query/create-api';
import { Error, ResponseError, setAppLoader } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

import { ErrorHandler } from './RecoveryModal';

export type AccountFormData = {
    login: string;
    password: string;
    passwordConfirm: string;
};

export type RecoveryFormData = {
    email: string;
    login: string;
    password: string;
    passwordConfirm: string;
};

const schema: yup.ObjectSchema<AccountFormData> = yup
    .object({
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
        passwordConfirm: yup
            .string()
            .required('Повторите пароль')
            .when('password', (password, schema) =>
                password && password.length > 0
                    ? schema.oneOf(password, 'Пароли должны совпадать')
                    : schema,
            ),
    })
    .required();

export const AccountRecoveryForm = ({
    email,
    onSuccess,
}: {
    email: string;
    onSuccess: () => void;
}) => {
    const dispatch = useAppDispatch();
    const [error, setError] = useState<ResponseError>({ value: Error.NONE });

    const {
        getValues,
        control,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const [resetPassword] = useResetPasswordMutation();
    const handleOnError = useCallback((response?: LoginResponse) => {
        switch (response?.status) {
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
            data: RecoveryFormData;
            formDataJson?: string;
            event?: React.BaseSyntheticEvent;
        }) => {
            try {
                dispatch(setAppLoader(true));
                await resetPassword(data).unwrap();
                console.log(data);
                onSuccess();
            } catch (e) {
                handleOnError(e as LoginResponse);
            } finally {
                dispatch(setAppLoader(false));
            }
        },
        [dispatch, resetPassword],
    );

    return (
        <>
            <Text
                px={{ base: '32px', lg: '42px' }}
                pos='absolute'
                top='42px'
                textStyle='text2xlLh8Bold'
                textAlign='center'
            >
                Восстановление аккаунта
            </Text>
            <Form control={control}>
                <VStack spacing='16px' px='32px' pt='52px' pb='32px'>
                    <Stack>
                        <label htmlFor='login'>
                            <Text textStyle='textMdLh6Normal'>Логин для входа на сайт</Text>
                        </label>
                        <Stack gap='4px'>
                            <Input
                                {...register('login')}
                                borderRadius='6px'
                                borderColor={errors.login ? 'red' : 'lime.150'}
                                bgColor='white'
                                _active={{
                                    bgColor: 'white',
                                    borderColor: errors.login ? 'red' : 'lime.150',
                                }}
                                _focus={{
                                    bgColor: 'white',
                                    borderColor: errors.login ? 'red' : 'lime.150',
                                }}
                                placeholder='Логин'
                                variant='filled'
                                id='login'
                            />
                            <Text textStyle='textXsLh4Normal' color='blackAlpha.700'>
                                Логин не менее 5 символов, только латиница и !@#$&_+-.
                            </Text>
                        </Stack>

                        <Text textStyle='textXsLh4Normal' color='red'>
                            {errors.login?.message}
                        </Text>
                    </Stack>
                    <Stack>
                        <label htmlFor='password'>
                            <Text textStyle='textMdLh6Normal'>Пароль</Text>
                        </label>
                        <Stack gap='4px'>
                            <PasswordInput
                                {...register('password')}
                                borderRadius='6px'
                                borderColor={errors.password ? 'red' : 'lime.150'}
                                bgColor='white'
                                _active={{
                                    bgColor: 'white',
                                    borderColor: errors.password ? 'red' : 'lime.150',
                                }}
                                _focus={{
                                    boxShadow: 'none',
                                    bgColor: 'white',
                                    borderColor: errors.password ? 'red' : 'lime.150',
                                }}
                                placeholder='Пароль'
                                id='password'
                                aria-invalid={errors.password ? 'true' : 'false'}
                            />
                            <Text textStyle='textXsLh4Normal' color='blackAlpha.700'>
                                Пароль не менее 8 символов, с заглавной буквой и цифрой
                            </Text>
                            <Text textStyle='textXsLh4Normal' color='red'>
                                {errors.password?.message}
                            </Text>
                        </Stack>
                        <label htmlFor='confirmPassword'>
                            <Text textStyle='textMdLh6Normal'>Повторите пароль</Text>
                        </label>
                        <PasswordInput
                            {...register('passwordConfirm')}
                            borderRadius='6px'
                            borderColor={errors.passwordConfirm ? 'red' : 'lime.150'}
                            bgColor='white'
                            _active={{
                                bgColor: 'white',
                                borderColor: errors.passwordConfirm ? 'red' : 'lime.150',
                            }}
                            _focus={{
                                boxShadow: 'none',
                                bgColor: 'white',
                                borderColor: errors.passwordConfirm ? 'red' : 'lime.150',
                            }}
                            placeholder='Пароль'
                            id='confirmPassword'
                            aria-invalid={errors.passwordConfirm ? 'true' : 'false'}
                        />
                        <Text textStyle='textXsLh4Normal' color='red'>
                            {errors.passwordConfirm?.message}
                        </Text>
                    </Stack>
                    <Button
                        onClick={() => {
                            onSubmit({
                                data: {
                                    email: email,
                                    login: getValues().login,
                                    password: getValues().password,
                                    passwordConfirm: getValues().passwordConfirm,
                                },
                            });
                        }}
                        type='submit'
                        bgColor='black'
                        color='white'
                        width='100%'
                        mt='24px'
                    >
                        Зарегистрироваться
                    </Button>
                </VStack>
            </Form>
            <ErrorHandler error={error} />
        </>
    );
};
