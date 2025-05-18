import { Button, HStack, Image, PinInput, PinInputField, Text, VStack } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { Form, useForm } from 'react-hook-form';

import { LoginResponse, useVerifyOTPMutation } from '~/query/create-api';
import { Error, ResponseError, setAppLoader } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

import { ErrorHandler } from './RecoveryModal';

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
    const [error, setError] = useState<ResponseError>({ value: Error.NONE });
    const dispatch = useAppDispatch();
    const [pin, setPin] = useState('');
    const [inputPinKey, setInputPinKey] = useState(0);
    const handleComplete = (value: string) => {
        setPin(value);
    };
    const resetPinInput = () => {
        setPin('');
        setInputPinKey((prev) => prev + 1);
    };

    const [verifyOtp] = useVerifyOTPMutation();

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
                    value: response.data.message,
                    message: '',
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
            data: OTPFormData;
            formDataJson?: string;
            event?: React.BaseSyntheticEvent;
        }) => {
            try {
                setError({ value: Error.NONE });
                dispatch(setAppLoader(true));
                await verifyOtp(data).unwrap();
                onSuccess(data);
            } catch (e) {
                handleOnError(e as LoginResponse);
            } finally {
                dispatch(setAppLoader(false));
            }
        },
        [dispatch, verifyOtp],
    );
    const { control } = useForm();
    return (
        <>
            <Form
                onSubmit={() => {
                    if (pin.length === 6) {
                        onSubmit({ data: { email, otpToken: pin } });
                        resetPinInput();
                    }
                }}
                control={control}
            >
                <VStack spacing='32px' p='32px'>
                    <Image
                        boxSize={{ base: '108px', lg: '206px' }}
                        src='/src/assets/images/code-recovery.svg'
                    />
                    <VStack spacing='16px' textAlign='center'>
                        {error.value !== Error.NONE && (
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
                                onChange={() => setError({ value: Error.NONE })}
                            >
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <PinInputField
                                        key={i}
                                        borderColor={error.value !== Error.NONE ? 'red' : 'inherit'}
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
            <ErrorHandler error={error} />
        </>
    );
};
