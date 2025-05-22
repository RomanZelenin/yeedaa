import {
    Button,
    HStack,
    Image,
    PinInput,
    PinInputField,
    Text,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { Form, useForm } from 'react-hook-form';

import codeRecoveryImg from '~/assets/images/code-recovery.svg';
import { ErrorAlert } from '~/common/components/Alert/ErrorAlert';
import { StatusCode } from '~/query/constants/api';
import { LoginResponse, useVerifyOTPMutation } from '~/query/create-api';
import { Error, ResponseError, setAppLoader } from '~/store/app-slice';
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
    const [error, setError] = useState<ResponseError>({ value: Error.NONE });
    const {
        isOpen: isOpenErrorAlert,
        onClose: onCloseErrorAlert,
        onOpen: onOpenErrorAlert,
    } = useDisclosure();

    const dispatch = useAppDispatch();
    const [inputPinKey, setInputPinKey] = useState(0);
    const handleComplete = (pin: string) => {
        onSubmit({ data: { email, otpToken: pin } });
        if (error.value !== Error.INVALID_CODE) resetPinInput();
    };
    const resetPinInput = () => {
        setInputPinKey((prev) => prev + 1);
    };

    const [verifyOtp] = useVerifyOTPMutation();

    const handleOnError = useCallback((response?: LoginResponse) => {
        switch (response?.status) {
            case StatusCode.BadRequest:
                setError({
                    value: response.data.message,
                    message: '',
                });
                break;
            case StatusCode.Forbidden:
                setError({
                    value: Error.INVALID_CODE,
                    message: '',
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
        if (response?.status !== StatusCode.Forbidden) onOpenErrorAlert();
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
            <Form control={control}>
                <VStack spacing='32px' p='32px'>
                    <Image boxSize={{ base: '108px', lg: '206px' }} src={codeRecoveryImg} />
                    <VStack spacing='16px' textAlign='center'>
                        {error.value === Error.INVALID_CODE && (
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
                                        data-test-id={`verification-code-input-${i}`}
                                        key={i}
                                        borderColor={
                                            error.value === Error.INVALID_CODE ? 'red' : 'inherit'
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
            <ErrorAlert
                isOpen={isOpenErrorAlert}
                onClose={onCloseErrorAlert}
                bottom='20px'
                title={error.value}
                message={error.message ?? ''}
                position='fixed'
            />
        </>
    );
};
