import {
    Button,
    IconButton,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Stack,
    SystemStyleObject,
    Text,
    VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect } from 'react';
import { Form, useForm } from 'react-hook-form';

import { changeProfilePasswordSchema } from '~/app/pages/Login/schemes';
import { CloseInCircleIcon } from '~/common/components/Icons/CloseInCircleIcon';
import { PasswordInput } from '~/common/components/PasswordInput/PasswordInput';
import { StatusCode } from '~/query/constants';
import { useUpdateProfilePasswordMutation } from '~/query/create-recipe-api';
import { StatusResponse } from '~/query/types';
import { Error, setAppLoader, setNotification } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

export type ChangeProfilePasswordFormData = {
    password: string;
    newPassword: string;
    repeatedPassword: string;
};

export const ChangeProfilePasswordModal = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    const dispatch = useAppDispatch();
    const {
        control,
        register,
        setError,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(changeProfilePasswordSchema),
        mode: 'onChange',
    });

    const inputStylePassword: SystemStyleObject = {
        bgColor: 'white',
        borderColor: errors.password ? 'red' : 'lime.150',
    };
    const inputStyleNewPassword: SystemStyleObject = {
        bgColor: 'white',
        borderColor: errors.newPassword ? 'red' : 'lime.150',
    };
    const inputStyleRepeatedPassword: SystemStyleObject = {
        bgColor: 'white',
        borderColor: errors.repeatedPassword ? 'red' : 'lime.150',
    };

    const handleOnError = useCallback((response?: StatusResponse) => {
        switch (response?.status) {
            case StatusCode.InternalServerError:
                dispatch(
                    setNotification({
                        _id: crypto.randomUUID(),
                        title: Error.SERVER,
                        message: 'Попробуйте немного позже',
                        type: 'error',
                    }),
                );
                break;
            default:
                if (response?.data.message === 'Новый и старый пароль совпадают') {
                    setError('newPassword', {});
                } else if (response?.data.message === 'Не верный пароль') {
                    setError('password', {});
                }
                dispatch(
                    setNotification({
                        _id: crypto.randomUUID(),
                        title: response!.data.message,
                        message: 'Попробуйте снова',
                        type: 'error',
                    }),
                );
        }
    }, []);

    const [updateUserPassword, { isError, isLoading, isSuccess, error }] =
        useUpdateProfilePasswordMutation();
    useEffect(() => {
        if (isLoading) {
            dispatch(setAppLoader(true));
        }
        if (isSuccess) {
            onClose();
            dispatch(setAppLoader(false));
            dispatch(
                setNotification({
                    _id: crypto.randomUUID(),
                    title: 'Пароль успешно изменен',
                    message: '',
                    type: 'success',
                }),
            );
        }
        if (isError) {
            dispatch(setAppLoader(false));
            handleOnError(error as StatusResponse);
        }
    }, [isLoading, isError, isSuccess, error]);

    return (
        <>
            <Modal
                onClose={() => {
                    onClose();
                }}
                isOpen={isOpen}
                isCentered
            >
                <ModalOverlay backdropFilter='blur(2px)' />
                <ModalContent
                    data-test-id=''
                    borderRadius='16px'
                    width={{ base: '316px', lg: '396px' }}
                >
                    <ModalBody p={0}>
                        <IconButton
                            right={0}
                            position='absolute'
                            data-test-id='close-button'
                            m='24px'
                            boxSize='24px'
                            alignSelf='end'
                            minW={0}
                            onClick={() => {
                                onClose();
                            }}
                            backgroundColor='transparent'
                            icon={<CloseInCircleIcon boxSize='24px' />}
                            aria-label='close'
                        />
                        <Form control={control} onSubmit={({ data }) => updateUserPassword(data)}>
                            <VStack p='32px' align='center' spacing='32px'>
                                <Text textAlign='center' textStyle='text2xlLh8Bold'>
                                    Сменить пароль
                                </Text>
                                <Stack>
                                    <label htmlFor='password'>
                                        <Text textStyle='textMdLh6Normal'>
                                            Введите старый пароль
                                        </Text>
                                    </label>
                                    <Stack gap='4px'>
                                        <PasswordInput
                                            data-test-id=''
                                            {...register('password')}
                                            borderRadius='6px'
                                            borderColor={errors.password ? 'red' : 'lime.150'}
                                            bgColor='white'
                                            _active={inputStylePassword}
                                            _focus={inputStylePassword}
                                            placeholder='Старый пароль'
                                            id='password'
                                        />
                                        <Text textStyle='textXsLh4Normal' color='red'>
                                            {errors.password?.message}
                                        </Text>
                                    </Stack>
                                    <label htmlFor='newPassword'>
                                        <Text textStyle='textMdLh6Normal'>
                                            Введите новый пароль
                                        </Text>
                                    </label>
                                    <PasswordInput
                                        data-test-id=''
                                        {...register('newPassword')}
                                        borderRadius='6px'
                                        borderColor={errors.newPassword ? 'red' : 'lime.150'}
                                        bgColor='white'
                                        _active={inputStyleNewPassword}
                                        _focus={inputStyleNewPassword}
                                        placeholder='Новый пароль'
                                        id='newPassword'
                                    />
                                    <Text textStyle='textXsLh4Normal' color='blackAlpha.700'>
                                        Пароль не менее 8 символов, с заглавной буквой и цифрой
                                    </Text>
                                    <Text textStyle='textXsLh4Normal' color='red'>
                                        {errors.newPassword?.message}
                                    </Text>
                                    <label htmlFor='repeatedPassword'>
                                        <Text textStyle='textMdLh6Normal'>Повторите пароль</Text>
                                    </label>
                                    <Stack gap='4px'>
                                        <PasswordInput
                                            data-test-id=''
                                            {...register('repeatedPassword')}
                                            borderRadius='6px'
                                            borderColor={
                                                errors.repeatedPassword ? 'red' : 'lime.150'
                                            }
                                            bgColor='white'
                                            _active={inputStyleRepeatedPassword}
                                            _focus={inputStyleRepeatedPassword}
                                            placeholder='Пароль'
                                            id='repeatedPassword'
                                        />
                                        <Text textStyle='textXsLh4Normal' color='red'>
                                            {errors.repeatedPassword?.message}
                                        </Text>
                                    </Stack>
                                    <VStack alignSelf='stretch' spacing='16px' align='stretch'>
                                        <Button
                                            type='submit'
                                            variant='solid'
                                            backgroundColor='black'
                                            color='white'
                                        >
                                            Сохранить пароль
                                        </Button>
                                    </VStack>
                                </Stack>
                            </VStack>
                        </Form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
