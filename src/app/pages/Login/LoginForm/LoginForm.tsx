import { Box, Button, Input, Link, Stack, Text, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useRef, useState } from 'react';
import { Form, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { PasswordInput } from '~/common/components/PasswordInput/PasswordInput';
import { StatusCode } from '~/query/constants/api';
import { LoginResponse, useLoginMutation } from '~/query/create-api';
import { Error, errorSelector, setAppError, setAppLoader } from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

import { LoginFailedModal } from '../Modal/LoginFailedModal';
import { RecoveryModal } from '../Modal/Recovery/RecoveryModal';
import { loginFormSchema } from '../schemes';

export type LoginFormData = {
    login: string;
    password: string;
};

export const LoginForm = () => {
    const dispatch = useAppDispatch();
    const naviagate = useNavigate();
    const loginInputRef = useRef<HTMLInputElement>(null);
    const [isShowRecoveryModal, setIsShowRecoveryModal] = useState(false);

    const error = useAppSelector(errorSelector);
    const [isShowLoginFailed, setIsShowLoginFailed] = useState(false);

    const {
        control,
        register,
        setValue,
        getValues,
        formState: { errors: formErrors },
    } = useForm({
        resolver: yupResolver(loginFormSchema),
        mode: 'onChange',
    });

    const [login] = useLoginMutation();
    const handleOnError = useCallback((response?: LoginResponse) => {
        switch (response?.status) {
            case StatusCode.Unauthorized:
                dispatch(
                    setAppError({
                        value: Error.INCORRECT_LOGIN_OR_PASSWORD,
                        message: 'Попробуйте снова.',
                    }),
                );
                break;
            case StatusCode.Forbidden:
                dispatch(
                    setAppError({
                        value: Error.EMAIL_NOT_VERIFED,
                        message: 'Проверьте почту и перейдите по ссылке.',
                    }),
                );
                break;
            case StatusCode.InternalServerError:
                setIsShowLoginFailed(true);
                break;
            default:
                dispatch(
                    setAppError({
                        value: response!.data.error,
                        message: response!.data.message,
                    }),
                );
        }
    }, []);
    const onSubmit = useCallback(
        async ({
            data,
        }: {
            formData?: FormData;
            data: LoginFormData;
            formDataJson?: string;
            event?: React.BaseSyntheticEvent;
        }) => {
            try {
                setIsShowLoginFailed(false);
                dispatch(setAppLoader(true));
                await login(data as LoginFormData).unwrap();
                naviagate('/', { replace: true });
            } catch (e) {
                handleOnError(e as LoginResponse);
            } finally {
                dispatch(setAppLoader(false));
            }
        },
        [dispatch, login],
    );

    const isIncorrectLoginOrPassword =
        formErrors.login || error.value === Error.INCORRECT_LOGIN_OR_PASSWORD;

    return (
        <>
            <Form onSubmit={onSubmit} control={control} data-test-id='sign-in-form'>
                <Stack spacing={{ base: '4px' }}>
                    <label htmlFor='login'>
                        <Text textStyle='textMdLh6Normal'>Логин для входа на сайт</Text>
                    </label>
                    <Box mb='24px'>
                        <Input
                            data-test-id='login-input'
                            borderRadius='6px'
                            borderColor={isIncorrectLoginOrPassword ? 'red' : 'lime.150'}
                            bgColor='white'
                            _active={{
                                bgColor: 'white',
                                borderColor: isIncorrectLoginOrPassword ? 'red' : 'lime.150',
                            }}
                            _focus={{
                                bgColor: 'white',
                                borderColor: isIncorrectLoginOrPassword ? 'red' : 'lime.150',
                            }}
                            placeholder='Введите логин'
                            variant='filled'
                            id='login'
                            {...register('login')}
                            onInput={(e) => {
                                dispatch(setAppError({ value: Error.NONE }));
                                setValue('login', (e.target as HTMLInputElement).value.trim());
                            }}
                            ref={loginInputRef}
                            aria-invalid={formErrors.login ? 'true' : 'false'}
                            onBlur={() => {
                                const thisElement = document.getElementById(
                                    'login',
                                ) as HTMLInputElement;
                                thisElement.value = thisElement.value.trim();
                            }}
                        />
                        <Text textStyle='textXsLh4Normal' color='red'>
                            {formErrors.login?.message}
                        </Text>
                    </Box>
                    <Box>
                        <label htmlFor='password'>
                            <Text textStyle='textMdLh6Normal'>Пароль</Text>
                        </label>
                        <PasswordInput
                            data-test-id='password-input'
                            placeholder='Пароль для сайта'
                            borderRadius='6px'
                            borderColor={isIncorrectLoginOrPassword ? 'red' : 'lime.150'}
                            bgColor='white'
                            _active={{
                                bgColor: 'white',
                                borderColor: isIncorrectLoginOrPassword ? 'red' : 'lime.150',
                            }}
                            _focus={{
                                boxShadow: 'none',
                                bgColor: 'white',
                                borderColor: isIncorrectLoginOrPassword ? 'red' : 'lime.150',
                            }}
                            id='password'
                            {...register('password')}
                            onInput={(e) => {
                                dispatch(setAppError({ value: Error.NONE }));
                                setValue('password', (e.target as HTMLInputElement).value);
                            }}
                            aria-invalid={formErrors.password ? 'true' : 'false'}
                        />
                        <Text textStyle='textXsLh4Normal' color='red'>
                            {formErrors.password?.message}
                        </Text>
                    </Box>
                </Stack>
                <VStack mt={{ base: '112px' }} spacing='16px'>
                    <Button
                        data-test-id='submit-button'
                        type='submit'
                        bgColor='black'
                        color='white'
                        width='100%'
                    >
                        Войти
                    </Button>
                    <Link
                        data-test-id='forgot-password'
                        textStyle='textMdLh6Semibold'
                        onClick={() => {
                            setIsShowRecoveryModal(true);
                        }}
                    >
                        Забыли логин и пароль?
                    </Link>
                </VStack>
            </Form>
            {isShowLoginFailed && (
                <LoginFailedModal onClickRepeat={() => onSubmit({ data: getValues() })} />
            )}
            {isShowRecoveryModal && (
                <RecoveryModal
                    onClickClose={() => {
                        setIsShowRecoveryModal(false);
                    }}
                />
            )}
        </>
    );
};
