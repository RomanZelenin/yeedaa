import {
    Button,
    IconButton,
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Text,
    VStack,
} from '@chakra-ui/react';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';

import i from '~/assets/images/login-failed.svg';
import { CloseInCircleIcon } from '~/common/components/Icons/CloseInCircleIcon';
import { StatusCode } from '~/query/constants';
import { useDeleteProfileMutation } from '~/query/create-recipe-api';
import { StatusResponse } from '~/query/types';
import { ApplicationRoute } from '~/router';
import { Error, setAppLoader, setNotification } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

export const DeleteAccountModal = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    const [deleteProfile, { isError, isLoading, isSuccess, error }] = useDeleteProfileMutation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

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

    useEffect(() => {
        if (isLoading) {
            dispatch(setAppLoader(true));
        }
        if (isSuccess) {
            dispatch(setAppLoader(false));
            sessionStorage.removeItem('access_token');
            navigate(ApplicationRoute.LOGIN);
            dispatch(
                setNotification({
                    _id: crypto.randomUUID(),
                    title: 'Аккаунт успешно удалён',
                    message: '',
                    type: 'success',
                }),
            );
        }
        if (isError) {
            dispatch(setAppLoader(false));
            handleOnError(error as StatusResponse);
        }
    }, [isError, isLoading, isSuccess]);

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

                        <VStack p='32px' align='center' spacing='32px'>
                            <Image boxSize={{ base: '108px', lg: '206px' }} src={i} />
                            <VStack spacing='16px'>
                                <Text textAlign='center' textStyle='text2xlLh8Bold'>
                                    Действительно хотите удалить свой аккаунт?
                                </Text>
                                <Text
                                    textAlign='center'
                                    textStyle='textMdLh6Normal'
                                    color='blackAlpha.700'
                                >
                                    Если вы удалите аккаунт, вы больше не сможете всеми функциями
                                    сервиса, которые вы использовали.
                                </Text>
                                <Text
                                    textAlign='center'
                                    textStyle='textMdLh6Normal'
                                    color='blackAlpha.700'
                                >
                                    Мы удалим все ваши опубликованные рецепты и записи в блоге.
                                </Text>
                            </VStack>
                            <Button
                                onClick={() => deleteProfile()}
                                alignSelf='stretch'
                                variant='solid'
                                bgColor='black'
                                color='white'
                            >
                                Удалить мой аккаунт
                            </Button>
                            <Text
                                textStyle='textXsLh4Normal'
                                textAlign='center'
                                color='blackAlpha.600'
                                whiteSpace='nowrap'
                            >
                                Остались вопросы? Свяжитесь с{' '}
                                <span style={{ textDecoration: 'underline' }}>поддержкой</span>
                            </Text>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
