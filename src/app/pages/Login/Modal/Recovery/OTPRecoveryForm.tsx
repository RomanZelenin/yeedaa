import { Button, HStack, Image, PinInput, PinInputField, Text, VStack } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { Form, useForm } from 'react-hook-form';

import codeRecoveryImg from '~/assets/images/code-recovery.svg';
import { CustomAlert } from '~/common/components/Alert/CustomAlert';
import { StatusCode } from '~/query/constants';
import { useVerifyOTPMutation } from '~/query/create-auth-api';
import { StatusResponse } from '~/query/types';
import { Error, Notification, setAppLoader } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

export type OTPFormData = {
    email: string;
    otpToken: string;
};

export const OTPRecoveryFrom = ({
    email,
    onSuccess,
}: {
    email: string;
    onSuccess: (data: OTPFormData) => void;
}) => {
    const [notification, setNotification] = useState<Notification | null>(null);
    const dispatch = useAppDispatch();
    const [inputPinKey, setInputPinKey] = useState(0);
    const handleComplete = (pin: string) => {
        onSubmit({ data: { email, otpToken: pin } });
        if (notification?.title !== Error.INVALID_CODE) resetPinInput();
    };
    const resetPinInput = () => {
        setInputPinKey((prev) => prev + 1);
    };
    const [verifyOtp] = useVerifyOTPMutation();
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
                setNotification({
                    _id: crypto.randomUUID(),
                    title: Error.INVALID_CODE,
                    type: 'error',
                });
                break;
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
            data: OTPFormData;
            formDataJson?: string;
            event?: React.BaseSyntheticEvent;
        }) => {
            try {
                setNotification(null);
                dispatch(setAppLoader(true));
                await verifyOtp(data).unwrap();
                onSuccess(data);
            } catch (e) {
                handleOnError(e as StatusResponse);
            } finally {
                dispatch(setAppLoader(false));
            }
        },
        [dispatch, verifyOtp],
    );
    const { control } = useForm();
    return (
        <>
            <Form control={control}>
                <VStack spacing='32px' p='32px'>
                    <Image boxSize={{ base: '108px', lg: '206px' }} src={codeRecoveryImg} />
                    <VStack spacing='16px' textAlign='center'>
                        {notification?.title === Error.INVALID_CODE && (
                            <Text textStyle='text2xlLh8Bold'>Неверный код</Text>
                        )}
                        <Text textStyle='textMdLh6Normal'>
                            Мы отправили вам на e-mail
                            <Text textStyle='textMdLh6Semibold' color='blackAlpha.900'>
                                {email}
                            </Text>
                            {`шестизначный код. Введите\u00A0его\u00A0ниже.`}
                        </Text>
                        <HStack>
                            <PinInput
                                otp
                                onComplete={handleComplete}
                                key={inputPinKey}
                                onChange={() => setNotification(null)}
                            >
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <PinInputField
                                        data-test-id={`verification-code-input-${i}`}
                                        key={i}
                                        borderColor={
                                            notification?.title === Error.INVALID_CODE
                                                ? 'red'
                                                : 'inherit'
                                        }
                                    />
                                ))}
                            </PinInput>
                        </HStack>
                    </VStack>
                    <Text textAlign='center' textStyle='textXsLh4Normal' color='blackAlpha.700'>
                        {`Не пришло письмо? Проверьте\u00A0папку\u00A0Спам.`}
                    </Text>
                </VStack>
                <Button type='submit' display='none' />
            </Form>
            {notification && notification.title !== Error.INVALID_CODE && (
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
