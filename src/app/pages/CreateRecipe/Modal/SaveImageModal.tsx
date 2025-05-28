import {
    Box,
    Button,
    IconButton,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Text,
    VStack,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';

import { Fallback } from '~/common/components/Fallback/Fallback';
import { CloseInCircleIcon } from '~/common/components/Icons/CloseInCircleIcon';

export const SaveImageModal = ({
    image,
    onClickClose,
    onClickSave,
    onClickDelete,
}: {
    image?: string;
    onClickDelete: () => void;
    onClickClose: () => void;
    onClickSave: (img: string | ArrayBuffer | null) => void;
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(image ?? null);

    const handleImageClick = () => {
        fileInputRef.current!.value = '';
        fileInputRef.current!.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleOnClickSave = () => {
        onClickSave(preview);
        onClickClose();
    };

    const handleOnClickDelete = () => {
        setPreview(null);
        onClickDelete();
        onClickClose();
    };

    return (
        <Modal onClose={onClickClose} isOpen={true} isCentered>
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
                        onClick={onClickClose}
                        backgroundColor='transparent'
                        icon={<CloseInCircleIcon boxSize='24px' />}
                        aria-label='close'
                    />
                    <VStack p='32px' align='center' spacing='32px'>
                        <Text textStyle='text2xlLh8Bold'>Изображение</Text>
                        <Box>
                            <Input
                                type='file'
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                accept='image/*'
                                onChange={(e) => handleFileChange(e)}
                            />
                            <Image
                                src={preview?.toString()}
                                onClick={handleImageClick}
                                height='206px'
                                fallback={
                                    <Fallback
                                        onClick={handleImageClick}
                                        height='206px'
                                        width='206px'
                                    />
                                }
                            />
                        </Box>
                        <VStack
                            display={preview === null ? 'none' : 'flex'}
                            alignSelf='stretch'
                            spacing='16px'
                            align='stretch'
                        >
                            <Button
                                onClick={handleOnClickSave}
                                variant='solid'
                                backgroundColor='black'
                                color='white'
                            >
                                Сохранить
                            </Button>
                            <Button variant='ghost' onClick={handleOnClickDelete}>
                                Удалить
                            </Button>
                        </VStack>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
