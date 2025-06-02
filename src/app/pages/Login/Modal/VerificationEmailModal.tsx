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

import selebratingImg from '~/assets/images/selebrating.svg';
import { CloseInCircleIcon } from '~/common/components/Icons/CloseInCircleIcon';

export const VerificationEmailModal = ({
    email,
    onClickClose,
}: {
    email: string;
    onClickClose: () => void;
}) => {
    const { isOpen: isVisible, onClose } = useDisclosure({ defaultIsOpen: true });

    const handleOnClickClose = () => {
        onClickClose();
        onClose();
    };

    return (
        <Modal onClose={handleOnClickClose} isOpen={isVisible} isCentered>
            <ModalOverlay />
            <ModalContent
                borderRadius='16px'
                width={{ base: '316px', lg: '396px' }}
                data-test-id='sign-up-success-modal'
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
                        <Image boxSize={{ base: '108px', lg: '206px' }} src={selebratingImg} />
                        <VStack spacing={0} textAlign='center'>
                            <Text textStyle='text2xlLh8Bold' mb={{ base: '16px' }}>
                                Остался последний шаг. Нужно верифицировать ваш e-mail
                            </Text>
                            <Text textStyle='textMdLh6Semibold' color='blackAlpha.700'>
                                Мы отправили вам на почту{' '}
                                <Text color='blackAlpha.900'>{email}</Text> ссылку для верификации.
                            </Text>
                        </VStack>

                        <Text textAlign='center' textStyle='textXsLh4Normal' color='blackAlpha.700'>
                            {`Не пришло письмо? Проверьте\u00A0папку\u00A0Спам. По\u00A0другим\u00A0вопросам\u00A0свяжитесь`}{' '}
                            <Link href='#' textDecoration='underline'>{`с\u00A0поддержкой`}</Link>
                        </Text>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
