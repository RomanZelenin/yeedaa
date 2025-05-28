import { Button, Input, Stack, Text, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useState } from 'react';
import { Form, useForm } from 'react-hook-form';

import { CustomAlert } from '~/common/components/Alert/CustomAlert';
import { PasswordInput } from '~/common/components/PasswordInput/PasswordInput';
import { StatusCode } from '~/query/constants/api';
import { LoginResponse, useResetPasswordMutation } from '~/query/create-api';
import { Error, Notification, setAppLoader } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

import { accountRecoverySchema } from '../../schemes';

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

export const AccountRecoveryForm = ({
    email,
    onSuccess,
}: {
    email: string;
    onSuccess: () => void;
}) => {
    const dispatch = useAppDispatch();
    const [notification, setNotification] = useState<Notification | null>(null);
    const {
        getValues,
        setValue,
        control,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(accountRecoverySchema),
        mode: 'onChange',
    });

    const [resetPassword] = useResetPasswordMutation();
    const handleOnError = useCallback((response?: LoginResponse) => {
        switch (response?.status) {
            case StatusCode.InternalServerError:
                setNotification({
                    _id: crypto.randomUUID(),
                    title: Error.SERVER,
                    message: 'Попробуйте немного позже',
                    type: 'error',
                });
                break;
            default:
                setNotification({
                    _id: crypto.randomUUID(),
                    title: response!.data.error,
                    message: response!.data.message,
                    type: 'error',
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
                width='fit-content'
            >
                Восстановление аккаунта
            </Text>
            <Form
                onSubmit={() => {
                    onSubmit({
                        data: {
                            email: email,
                            login: getValues().login,
                            password: getValues().password,
                            passwordConfirm: getValues().passwordConfirm,
                        },
                    });
                }}
                control={control}
            >
                <VStack spacing='16px' px='32px' pt='122px' pb='32px'>
                    <Stack>
                        <label htmlFor='login'>
                            <Text textStyle='textMdLh6Normal'>Логин для входа на сайт</Text>
                        </label>
                        <Stack gap='4px'>
                            <Input
                                data-test-id='login-input'
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
                                id='recovery-login'
                                onInput={(e) => {
                                    setNotification(null);
                                    setValue('login', (e.target as HTMLInputElement).value);
                                }}
                                onBlur={() => {
                                    const thisElement = document.getElementById(
                                        'recovery-login',
                                    ) as HTMLInputElement;
                                    thisElement.value = thisElement.value.trim();
                                    setValue('login', thisElement.value);
                                }}
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
                                data-test-id='password-input'
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
                            data-test-id='confirm-password-input'
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
                        data-test-id='submit-button'
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
            {notification && (
                <CustomAlert
                    position='fixed'
                    key={notification._id}
                    notification={notification}
                    bottom='20px'
                />
            )}
        </>
    );
};
