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

import { Fallback } from '~/common/components/Fallback/Fallback';
import { CloseInCircleIcon } from '~/common/components/Icons/CloseInCircleIcon';

export const SaveImageModal = () => {
    const { isOpen, _onClose } = useDisclosure({ defaultIsOpen: true });

    const handleOnClickClose = () => {};

    return (
        <Modal onClose={handleOnClickClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent
                data-test-id=''
                borderRadius='16px'
                width={{ base: '316px', lg: '396px' }}
            >
                <ModalBody p={0}>
                    <IconButton
                        position='absolute'
                        right={0}
                        top={0}
                        data-test-id='close-button'
                        boxSize='24px'
                        alignSelf='end'
                        margin='24px'
                        minW={0}
                        onClick={handleOnClickClose}
                        backgroundColor='transparent'
                        icon={<CloseInCircleIcon boxSize='24px' />}
                        aria-label='close'
                    />
                    <VStack p='32px' align='center' spacing='32px'>
                        <Text textStyle='text2xlLh8Bold'>Изображение</Text>
                        <Image
                            height='206px'
                            fallback={<Fallback height='206px' width='206px' />}
                        />
                        <VStack alignSelf='stretch' spacing='16px' align='stretch'>
                            <Button variant='solid' backgroundColor='black' color='white'>
                                Сохранить
                            </Button>
                            <Button variant='ghost'>Удалить</Button>
                        </VStack>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
