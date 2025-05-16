import { Box, Button, Input, Link, Stack, Text, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useRef, useState } from 'react';
import { Form, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { ErrorAlert } from '~/common/components/Alert/ErrorAlert';
import { PasswordInput } from '~/common/components/PasswordInput/PasswordInput';
import { LoginResponse, useLoginMutation } from '~/query/create-api';
import { Error, ResponseError, setAppError, setAppLoader } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

import { LoginFailedModal } from './LoginFailedModal';

export type LoginFormData = {
    login: string;
    password: string;
};

export const LoginForm = () => {
    const dispatch = useAppDispatch();
    const [error, setError] = useState<ResponseError>({ value: Error.NONE });
    const schema: yup.ObjectSchema<LoginFormData> = yup
        .object({
            login: yup.string().required('Введите логин').max(50, 'Максимальная длина 50 символов'),
            password: yup
                .string()
                .required('Введите пароль')
                .max(50, 'Максимальная длина 50 символов'),
        })
        .required();
    const {
        control,
        register,
        setValue,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });
    const loginInputRef = useRef<HTMLInputElement>(null);

    const [login] = useLoginMutation();

    const handleOnError = useCallback((response?: LoginResponse) => {
        switch (response?.status) {
            case 401:
                setError({
                    value: Error.INCORRECT_LOGIN_OR_PASSWORD,
                    message: 'Попробуйте снова.',
                });
                break;
            case 403:
                setError({
                    value: Error.EMAIL_NOT_VERIFED,
                    message: 'Проверьте почту и перейдите по ссылке.',
                });
                break;
            case 500:
            default:
                setAppError({
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
            data: LoginFormData;
            formDataJson?: string;
            event?: React.BaseSyntheticEvent;
        }) => {
            try {
                setError({ value: Error.NONE });
                dispatch(setAppLoader(true));
                await login(data as LoginFormData).unwrap();
            } catch (e) {
                handleOnError(e as LoginResponse);
            } finally {
                dispatch(setAppLoader(false));
            }
        },
        [dispatch, login],
    );

    return (
        <Form onSubmit={onSubmit} control={control}>
            <Stack spacing={{ base: '4px' }}>
                <label htmlFor='login'>
                    <Text textStyle='textMdLh6Normal'>Логин для входа на сайт</Text>
                </label>
                <Box mb='24px'>
                    <Input
                        borderRadius='6px'
                        borderColor={
                            errors.login || error.value === Error.INCORRECT_LOGIN_OR_PASSWORD
                                ? 'red'
                                : 'lime.150'
                        }
                        bgColor='white'
                        _active={{
                            bgColor: 'white',
                            borderColor:
                                errors.login || error.value === Error.INCORRECT_LOGIN_OR_PASSWORD
                                    ? 'red'
                                    : 'lime.150',
                        }}
                        _focus={{
                            bgColor: 'white',
                            borderColor:
                                errors.login || error.value === Error.INCORRECT_LOGIN_OR_PASSWORD
                                    ? 'red'
                                    : 'lime.150',
                        }}
                        placeholder='Введите логин'
                        variant='filled'
                        id='login'
                        {...register('login')}
                        onInput={(e) => {
                            dispatch(setAppError({ value: Error.NONE }));
                            setValue('login', e.target.value);
                        }}
                        ref={loginInputRef}
                        aria-invalid={errors.login ? 'true' : 'false'}
                        onBlur={() => {
                            loginInputRef.current!.value = loginInputRef.current!.value.trim();
                        }}
                    />
                    <Text textStyle='textXsLh4Normal' color='red'>
                        {errors.login?.message}
                    </Text>
                </Box>
                <Box>
                    <label htmlFor='password'>
                        <Text textStyle='textMdLh6Normal'>Пароль</Text>
                    </label>
                    <PasswordInput
                        placeholder='Пароль для сайта'
                        borderRadius='6px'
                        borderColor={
                            errors.password || error.value === Error.INCORRECT_LOGIN_OR_PASSWORD
                                ? 'red'
                                : 'lime.150'
                        }
                        bgColor='white'
                        _active={{
                            bgColor: 'white',
                            borderColor:
                                errors.password || error.value === Error.INCORRECT_LOGIN_OR_PASSWORD
                                    ? 'red'
                                    : 'lime.150',
                        }}
                        _focus={{
                            boxShadow: 'none',
                            bgColor: 'white',
                            borderColor:
                                errors.password || error.value === Error.INCORRECT_LOGIN_OR_PASSWORD
                                    ? 'red'
                                    : 'lime.150',
                        }}
                        id='password'
                        {...register('password')}
                        onInput={(e) => {
                            dispatch(setAppError({ value: Error.NONE }));
                            setValue('password', e.target.value);
                        }}
                        aria-invalid={errors.password ? 'true' : 'false'}
                    />
                    <Text textStyle='textXsLh4Normal' color='red'>
                        {errors.password?.message}
                    </Text>
                </Box>
            </Stack>
            <VStack mt={{ base: '112px' }} spacing='16px'>
                <Button
                    isLoading={isSubmitting}
                    type='submit'
                    bgColor='black'
                    color='white'
                    width='100%'
                >
                    Войти
                </Button>
                <Link textStyle='textMdLh6Semibold'>Забыли логин и пароль?</Link>
            </VStack>
            <ErrorHandler error={error} onRetry={() => onSubmit({ data: getValues() })} />
        </Form>
    );
};

const ErrorHandler = ({ error, onRetry }: { error: ResponseError; onRetry: () => void }) => {
    if (error.value === Error.NONE) {
        return null;
    }

    return error.value === Error.SERVER ? (
        <LoginFailedModal onClickRepeat={onRetry} />
    ) : (
        <ErrorAlert
            bottom='20px'
            title={error.value}
            message={error.message ?? ''}
            position='absolute'
        />
    );
};
