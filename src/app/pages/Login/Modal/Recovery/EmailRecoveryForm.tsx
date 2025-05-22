import { Button, Image, Input, Stack, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useState } from 'react';
import { Form, useForm } from 'react-hook-form';

import { ErrorAlert } from '~/common/components/Alert/ErrorAlert';
import { StatusCode } from '~/query/constants/api';
import { LoginResponse, useForgotPasswordMutation } from '~/query/create-api';
import { Error, ResponseError, setAppLoader } from '~/store/app-slice';
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
    const [error, setError] = useState<ResponseError>({ value: Error.NONE });
    const {
        isOpen: isOpenErrorAlert,
        onClose: onCloseErrorAlert,
        onOpen: onOpenErrorAlert,
    } = useDisclosure({ defaultIsOpen: error.value !== Error.NONE });
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
    const handleOnError = useCallback((response?: LoginResponse) => {
        switch (response?.status) {
            case StatusCode.BadRequest:
                setError({
                    value: response.data.message,
                    message: '',
                });
                break;
            case StatusCode.Forbidden:
                setValue('email', '');
                setError({
                    value: 'Такого e-mail нет',
                    message: `Попробуйте другой e-mail или проверьте правильность его написания`,
                });
                break;
            case StatusCode.InternalServerError:
                setValue('email', '');
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
                            data-test-id='email-input'
                            {...register('email')}
                            type='email'
                            borderRadius='6px'
                            borderColor={
                                formErrors.email || error.value !== Error.NONE ? 'red' : 'lime.150'
                            }
                            bgColor='white'
                            _active={{
                                bgColor: 'white',
                                borderColor:
                                    formErrors.email || error.value !== Error.NONE
                                        ? 'red'
                                        : 'lime.150',
                            }}
                            _focus={{
                                bgColor: 'white',
                                borderColor:
                                    formErrors.email || error.value !== Error.NONE
                                        ? 'red'
                                        : 'lime.150',
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
            <ErrorAlert
                isOpen={isOpenErrorAlert}
                onClose={onCloseErrorAlert}
                alertProps={{
                    bottom: '20px',
                    title: error.value,
                    message: error.message ?? '',
                    position: 'fixed',
                }}
            />
        </>
    );
};
