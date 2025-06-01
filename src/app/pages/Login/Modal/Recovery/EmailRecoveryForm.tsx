import { Button, Image, Input, Stack, Text, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useState } from 'react';
import { Form, useForm } from 'react-hook-form';

import loginFailedImg from '~/assets/images/login-failed.svg';
import { CustomAlert } from '~/common/components/Alert/CustomAlert';
import { StatusCode } from '~/query/constants';
import { useForgotPasswordMutation } from '~/query/create-auth-api';
import { StatusResponse } from '~/query/types';
import { Error, Notification, setAppLoader } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

import { emailRecoverySchema } from '../../schemes';

export type EmailRecoveryFormData = {
    email: string;
};

export const EmailRecoveryForm = ({
    onSuccess,
}: {
    onSuccess: (data: EmailRecoveryFormData) => void;
}) => {
    const [notification, setNotification] = useState<Notification | null>(null);
    const dispatch = useAppDispatch();
    const {
        control,
        register,
        setValue,
        formState: { errors: formErrors },
    } = useForm({
        resolver: yupResolver(emailRecoverySchema),
        mode: 'onChange',
    });

    const [forgotPassword] = useForgotPasswordMutation();
    const handleOnError = useCallback((response?: StatusResponse) => {
        switch (response?.status) {
            case StatusCode.BadRequest:
                setNotification({
                    _id: crypto.randomUUID(),
                    title: response.data.message,
                    type: 'error',
                });
                break;
            case StatusCode.Forbidden:
                setValue('email', '');
                setNotification({
                    _id: crypto.randomUUID(),
                    title: 'Такого e-mail нет',
                    message: 'Попробуйте другой e-mail или проверьте правильность его написания',
                    type: 'error',
                });
                break;
            case StatusCode.InternalServerError:
                setValue('email', '');
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
            data: EmailRecoveryFormData;
            formDataJson?: string;
            event?: React.BaseSyntheticEvent;
        }) => {
            try {
                dispatch(setAppLoader(true));
                await forgotPassword(data).unwrap();
                onSuccess(data);
            } catch (e) {
                handleOnError(e as StatusResponse);
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
                    <Image boxSize={{ base: '108px', lg: '206px' }} src={loginFailedImg} />
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
                            data-test-id='email-input'
                            {...register('email')}
                            type='email'
                            borderRadius='6px'
                            borderColor={
                                formErrors.email || notification !== null ? 'red' : 'lime.150'
                            }
                            bgColor='white'
                            _active={{
                                bgColor: 'white',
                                borderColor:
                                    formErrors.email || notification !== null ? 'red' : 'lime.150',
                            }}
                            _focus={{
                                bgColor: 'white',
                                borderColor:
                                    formErrors.email || notification !== null ? 'red' : 'lime.150',
                            }}
                            placeholder='e-mail'
                            variant='filled'
                            id='email'
                        />
                        <Text textStyle='textXsLh4Normal' textAlign='start' color='red'>
                            {formErrors.email?.message}
                        </Text>
                    </Stack>
                    <VStack spacing='24px'>
                        <Button
                            data-test-id='submit-button'
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
