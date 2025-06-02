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

import loginFailedImg from '~/assets/images/login-failed.svg';
import { CloseInCircleIcon } from '~/common/components/Icons/CloseInCircleIcon';
import { WriteLineIcon } from '~/common/components/Icons/WriteLineIcon';

export const ExitConfirmationModal = ({
    onClose,
    onExitWithoutSaving,
    onClickSaving,
}: {
    onClose: () => void;
    onExitWithoutSaving: () => void;
    onClickSaving: () => void;
}) => (
    <Modal onClose={onClose} isOpen={true} isCentered>
        <ModalOverlay />
        <ModalContent
            borderRadius='16px'
            width={{ base: '316px', lg: '396px' }}
            data-test-id='sign-in-error-modal'
        >
            <ModalBody data-test-id='recipe-preventive-modal' p={0}>
                <IconButton
                    position='absolute'
                    right={0}
                    data-test-id='close-button'
                    m='24px'
                    boxSize='24px'
                    alignSelf='end'
                    minW={0}
                    onClick={onClose}
                    backgroundColor='transparent'
                    icon={<CloseInCircleIcon boxSize='24px' />}
                    aria-label='close'
                />
                <VStack spacing='32px' p='32px'>
                    <Image boxSize={{ base: '108px', lg: '206px' }} src={loginFailedImg} />
                    <VStack spacing={0}>
                        <Text textStyle='text2xlLh8Bold' mb={{ base: '16px' }} textAlign='center'>
                            Выйти без сохранения?
                        </Text>
                        <Text textStyle='textMdLh6Normal' color='blackAlpha.700' textAlign='center'>
                            Чтобы сохранить, нажмите кнопку сохранить черновик
                        </Text>
                    </VStack>
                    <VStack alignSelf='stretch' spacing='16px' align='stretch'>
                        <Button
                            leftIcon={<WriteLineIcon filter='invert(100%)' />}
                            data-test-id='repeat-button'
                            width='100%'
                            bgColor='black'
                            color='white'
                            onClick={onClickSaving}
                            height={{ base: '48px' }}
                        >
                            <Text textStyle='textLgLh7Semibold'>Сохранить черновик</Text>
                        </Button>
                        <Button variant='ghost' onClick={onExitWithoutSaving}>
                            Выйти без сохранения
                        </Button>
                    </VStack>
                </VStack>
            </ModalBody>
        </ModalContent>
    </Modal>
);
