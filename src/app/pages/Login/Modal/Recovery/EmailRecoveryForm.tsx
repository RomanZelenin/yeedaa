import { Button, Image, Input, Stack, Text, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useState } from 'react';
import { Form, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { LoginResponse, useForgotPasswordMutation } from '~/query/create-api';
import { Error, ResponseError, setAppLoader } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

import { ErrorHandler } from './RecoveryModal';

export type EmailRecoveryFormData = {
    email: string;
};

export const EmailRecoveryForm = ({
    onSuccess,
}: {
    onSuccess: (data: EmailRecoveryFormData) => void;
}) => {
    const [error, setError] = useState<ResponseError>({ value: Error.NONE });
    const dispatch = useAppDispatch();
    const schema: yup.ObjectSchema<EmailRecoveryFormData> = yup
        .object({
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
        })
        .required();

    const {
        control,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const [forgotPassword] = useForgotPasswordMutation();
    const handleOnError = useCallback((response?: LoginResponse) => {
        switch (response?.status) {
            case 400:
                setError({
                    value: response.data.message,
                    message: '',
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
            data: EmailRecoveryFormData;
            formDataJson?: string;
            event?: React.BaseSyntheticEvent;
        }) => {
            try {
                dispatch(setAppLoader(true));
                await forgotPassword(data).unwrap();
                onSuccess(data);
            } catch (e) {
                handleOnError(e as LoginResponse);
            } finally {
                dispatch(setAppLoader(false));
            }
        },
        [dispatch, forgotPassword],
    );

    return (
        <>
            <Form onSubmit={onSubmit} control={control}>
                <VStack spacing='32px' p='32px'>
                    <Image
                        boxSize={{ base: '108px', lg: '206px' }}
                        src='/src/assets/images/login-failed.svg'
                    />
                    <Stack spacing={0} textAlign='center'>
                        <Text textStyle='textMdLh6Normal' mb={{ base: '16px' }}>
                            {`Для восстановления входа введите ваш\u00A0e-mail, куда можно отправить уникальный код`}
                        </Text>
                        <label htmlFor='email'>
                            <Text textAlign='start' textStyle='textMdLh6Normal'>
                                Ваш e-mail
                            </Text>
                        </label>
                        <Input
                            {...register('email')}
                            type='email'
                            borderRadius='6px'
                            borderColor={
                                errors.email || error.value !== Error.NONE ? 'red' : 'lime.150'
                            }
                            bgColor='white'
                            _active={{
                                bgColor: 'white',
                                borderColor:
                                    errors.email || error.value !== Error.NONE ? 'red' : 'lime.150',
                            }}
                            _focus={{
                                bgColor: 'white',
                                borderColor:
                                    errors.email || error.value !== Error.NONE ? 'red' : 'lime.150',
                            }}
                            placeholder='e-mail'
                            variant='filled'
                            id='email'
                        />
                    </Stack>
                    <VStack spacing='24px'>
                        <Button
                            type='submit'
                            width='100%'
                            bgColor='black'
                            color='white'
                            onClick={() => {}}
                            height={{ base: '48px' }}
                        >
                            <Text textStyle='textLgLh7Semibold'>Получить код</Text>
                        </Button>
                        <Text
                            textStyle='textXsLh4Normal'
                            color='blackAlpha.600'
                            textAlign='center'
                        >{`Не пришло письмо? Проверьте\u00A0папку\u00A0Спам.`}</Text>
                    </VStack>
                </VStack>
            </Form>
            <ErrorHandler error={error} />
        </>
    );
};
