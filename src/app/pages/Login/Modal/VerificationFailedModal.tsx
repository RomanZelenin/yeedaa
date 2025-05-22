import {
    IconButton,
    Image,
    Link,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Text,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';

import verificationFailedImg from '~/assets/images/verification-failed.svg';
import { CloseInCircleIcon } from '~/common/components/Icons/CloseInCircleIcon';

export const VerificationFailedModal = () => {
    const { isOpen: isVisible, onClose } = useDisclosure({ defaultIsOpen: true });

    const handleOnClickClose = () => {
        onClose();
    };

    return (
        <Modal onClose={handleOnClickClose} isOpen={isVisible} isCentered>
            <ModalOverlay />
            <ModalContent
                borderRadius='16px'
                width={{ base: '316px', lg: '396px' }}
                data-test-id='email-verification-failed-modal'
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
                        <Image
                            boxSize={{ base: '108px', lg: '206px' }}
                            src={verificationFailedImg}
                        />
                        <VStack spacing={0} textAlign='center'>
                            <Text textStyle='text2xlLh8Bold' mb={{ base: '16px' }}>
                                Упс! Что-то пошло не так
                            </Text>
                            <Text color='blackAlpha.700'>
                                Ваша ссылка для верификации недействительна. Попробуйте
                                зарегистрироваться снова.
                            </Text>
                        </VStack>

                        <Text textAlign='center' textStyle='textXsLh4Normal' color='blackAlpha.700'>
                            {`Остались вопросы? Свяжитесь `}
                            <Link href='#' textDecoration='underline'>{`с\u00A0поддержкой`}</Link>
                        </Text>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
