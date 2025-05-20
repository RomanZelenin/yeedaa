import { Box, Button, Input, Link, Stack, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useRef, useState } from 'react';
import { Form, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import * as yup from 'yup';

import { ErrorAlert } from '~/common/components/Alert/ErrorAlert';
import { PasswordInput } from '~/common/components/PasswordInput/PasswordInput';
import { StatusCode } from '~/query/constants/api';
import { LoginResponse, useLoginMutation } from '~/query/create-api';
import { Error, ResponseError, setAppError, setAppLoader } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

import { LoginFailedModal } from '../Modal/LoginFailedModal';
import { RecoveryModal } from '../Modal/Recovery/RecoveryModal';

export type LoginFormData = {
    login: string;
    password: string;
};

const loginFormSchema: yup.ObjectSchema<LoginFormData> = yup
    .object({
        login: yup
            .string()
            .trim()
            .required('Введите логин')
            .max(50, 'Максимальная длина 50 символов'),
        password: yup.string().required('Введите пароль').max(50, 'Максимальная длина 50 символов'),
    })
    .required();

export const LoginForm = () => {
    const dispatch = useAppDispatch();
    const naviagate = useNavigate();
    const loginInputRef = useRef<HTMLInputElement>(null);
    const [isShowRecoveryModal, setIsShowRecoveryModal] = useState(false);
    const [error, setError] = useState<ResponseError>({ value: Error.NONE });
    const {
        isOpen: isOpenErrorAlert,
        onClose: onCloseErrorAlert,
        onOpen: onOpenErrorAlert,
    } = useDisclosure();
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
                setError({
                    value: Error.INCORRECT_LOGIN_OR_PASSWORD,
                    message: 'Попробуйте снова.',
                });
                break;
            case StatusCode.Forbidden:
                setError({
                    value: Error.EMAIL_NOT_VERIFED,
                    message: 'Проверьте почту и перейдите по ссылке.',
                });
                break;
            case StatusCode.InternalServerError:
                setError({
                    value: Error.SERVER,
                    message: 'Попробуйте немного позже',
                });
                break;
            default:
                setError({
                    value: response!.data.error,
                    message: response!.data.message,
                });
        }
        onOpenErrorAlert();
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
                setError({ value: Error.NONE });
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
                            borderColor={
                                formErrors.login ||
                                error.value === Error.INCORRECT_LOGIN_OR_PASSWORD
                                    ? 'red'
                                    : 'lime.150'
                            }
                            bgColor='white'
                            _active={{
                                bgColor: 'white',
                                borderColor:
                                    formErrors.login ||
                                    error.value === Error.INCORRECT_LOGIN_OR_PASSWORD
                                        ? 'red'
                                        : 'lime.150',
                            }}
                            _focus={{
                                bgColor: 'white',
                                borderColor:
                                    formErrors.login ||
                                    error.value === Error.INCORRECT_LOGIN_OR_PASSWORD
                                        ? 'red'
                                        : 'lime.150',
                            }}
                            placeholder='Введите логин'
                            variant='filled'
                            id='login'
                            {...register('login')}
                            onInput={(e) => {
                                setError({ value: Error.NONE });
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
                            borderColor={
                                formErrors.password ||
                                error.value === Error.INCORRECT_LOGIN_OR_PASSWORD
                                    ? 'red'
                                    : 'lime.150'
                            }
                            bgColor='white'
                            _active={{
                                bgColor: 'white',
                                borderColor:
                                    formErrors.password ||
                                    error.value === Error.INCORRECT_LOGIN_OR_PASSWORD
                                        ? 'red'
                                        : 'lime.150',
                            }}
                            _focus={{
                                boxShadow: 'none',
                                bgColor: 'white',
                                borderColor:
                                    formErrors.password ||
                                    error.value === Error.INCORRECT_LOGIN_OR_PASSWORD
                                        ? 'red'
                                        : 'lime.150',
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
            {error.value !== Error.NONE ? (
                error.value === Error.SERVER ? (
                    <LoginFailedModal onClickRepeat={() => onSubmit({ data: getValues() })} />
                ) : (
                    <ErrorAlert
                        isOpen={isOpenErrorAlert}
                        onClose={onCloseErrorAlert}
                        bottom='20px'
                        title={error.value}
                        message={error.message ?? ''}
                        position='absolute'
                    />
                )
            ) : null}
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
