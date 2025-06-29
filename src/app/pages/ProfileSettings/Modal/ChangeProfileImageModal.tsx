import {
    Box,
    Button,
    IconButton,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Text,
    VStack,
} from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';

import { CloseInCircleIcon } from '~/common/components/Icons/CloseInCircleIcon';
import getCroppedImg from '~/common/utils/getCroppedImg';
import { StatusCode } from '~/query/constants';
import { useLoadPhotoMutation } from '~/query/create-recipe-api';
import { StatusResponse } from '~/query/types';
import { Error, setNotification } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

export type SaveImageModalProps = {
    image?: string;
    onClickDelete: () => void;
    onClickClose: () => void;
    onClickSave: (img: string | ArrayBuffer | null) => void;
    dataTestIdInput?: string;
    dataTestIdModal?: string;
    dataTestIdPreview?: string;
    dataTestIdFallback?: string;
};

export const ChangeProfileImageModal = ({
    image,
    isOpen,
    onClose,
    onSuccess,
}: {
    image: string;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (croppedImage: string) => void;
}) => {
    const dispatch = useAppDispatch();

    const handleOnError = useCallback((response?: StatusResponse) => {
        switch (response?.status) {
            case StatusCode.InternalServerError:
                dispatch(
                    setNotification({
                        _id: crypto.randomUUID(),
                        title: Error.SERVER,
                        message: 'Попробуйте сохранить фото позже.',
                        type: 'error',
                    }),
                );
                break;
            default:
                dispatch(
                    setNotification({
                        _id: crypto.randomUUID(),
                        title: response!.data.error,
                        message: response!.data.message,
                        type: 'error',
                    }),
                );
        }
    }, []);
    const [loadPhoto] = useLoadPhotoMutation();
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const onCropComplete = (_croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };
    const croppedAndSaveImage = async () => {
        try {
            const croppedCanvas = await getCroppedImg(image, croppedAreaPixels!);
            croppedCanvas?.toBlob(async (file) => {
                try {
                    const formData = new FormData();
                    formData.append('file', file!);
                    const _res = await loadPhoto(formData).unwrap();
                    onSuccess(croppedCanvas!.toDataURL('image/jpeg') as string);
                    onClose();
                } catch (e) {
                    handleOnError(e as StatusResponse);
                }
            }, 'image/jpeg');
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay backdropFilter='blur(2px)' />
            <ModalContent borderRadius='16px' width={{ base: '316px', lg: '396px' }}>
                <ModalBody data-test-id='' p={0}>
                    <IconButton
                        position='absolute'
                        right={0}
                        top={0}
                        data-test-id='close-button'
                        boxSize='24px'
                        alignSelf='end'
                        margin='24px'
                        minW={0}
                        onClick={onClose}
                        backgroundColor='transparent'
                        icon={<CloseInCircleIcon boxSize='24px' />}
                        aria-label='close'
                    />
                    <VStack p='32px' align='center' spacing='32px'>
                        <Text textAlign='center' textStyle='text2xlLh8Bold'>
                            Изменить изображение профиля
                        </Text>
                        <Box
                            pos='relative'
                            width={{ base: '108px', lg: '206px' }}
                            height={{ base: '108px', lg: '206px' }}
                        >
                            <Cropper
                                aspect={1}
                                image={image}
                                crop={crop}
                                cropShape='round'
                                zoomWithScroll={true}
                                zoom={zoom}
                                onZoomChange={setZoom}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                            />
                        </Box>
                        <VStack alignSelf='stretch' spacing='16px' align='stretch'>
                            <Button
                                onClick={() => croppedAndSaveImage()}
                                variant='solid'
                                backgroundColor='black'
                                color='white'
                            >
                                Кадрировать и сохранить
                            </Button>
                        </VStack>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
