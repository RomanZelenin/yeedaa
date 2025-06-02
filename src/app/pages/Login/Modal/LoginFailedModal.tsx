import {
    Button,
    IconButton,
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Text,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';

import loginFailedImg from '~/assets/images/login-failed.svg';
import { CloseInCircleIcon } from '~/common/components/Icons/CloseInCircleIcon';

export const LoginFailedModal = ({ onClickRepeat }: { onClickRepeat: () => void }) => {
    const { isOpen: isVisible, onClose } = useDisclosure({ defaultIsOpen: true });

    const handleOnClickClose = () => {
        onClose();
    };

    const handleOnClickRepeat = () => {
        handleOnClickClose();
        onClickRepeat();
    };

    return (
        <Modal onClose={handleOnClickClose} isOpen={isVisible} isCentered>
            <ModalOverlay />
            <ModalContent
                borderRadius='16px'
                width={{ base: '316px', lg: '396px' }}
                data-test-id='sign-in-error-modal'
            >
                <ModalBody p={0}>
                    <IconButton
                        position='absolute'
                        right={0}
                        data-test-id='close-button'
                        m='24px'
                        boxSize='24px'
                        alignSelf='end'
                        minW={0}
                        onClick={handleOnClickClose}
                        backgroundColor='transparent'
                        icon={<CloseInCircleIcon boxSize='24px' />}
                        aria-label='close'
                    />
                    <VStack spacing='32px' p='32px'>
                        <Image boxSize={{ base: '108px', lg: '206px' }} src={loginFailedImg} />
                        <VStack spacing={0}>
                            <Text textStyle='text2xlLh8Bold' mb={{ base: '16px' }}>
                                Вход не выполнен
                            </Text>
                            <Text textStyle='textMdLh6Normal' color='blackAlpha.700'>
                                Что-то пошло не так.
                            </Text>
                            <Text textStyle='textMdLh6Normal' color='blackAlpha.700'>
                                Попробуйте еще раз
                            </Text>
                        </VStack>
                        <Button
                            data-test-id='repeat-button'
                            width='100%'
                            bgColor='black'
                            color='white'
                            onClick={handleOnClickRepeat}
                            height={{ base: '48px' }}
                        >
                            <Text textStyle='textLgLh7Semibold'>Повторить</Text>
                        </Button>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
