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
import { useCallback, useState } from 'react';
import { FieldValues, Form, useForm } from 'react-hook-form';

import { Fallback } from '~/common/components/Fallback/Fallback';
import { CloseInCircleIcon } from '~/common/components/Icons/CloseInCircleIcon';
import { StatusCode } from '~/query/constants';
import { useFileUploadMutation } from '~/query/create-file-api';
import { StatusResponse } from '~/query/types';
import { Error, setAppLoader, setNotification } from '~/store/app-slice';
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

export const SaveImageModal = ({ props }: { props: SaveImageModalProps }) => {
    const dispatch = useAppDispatch();
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(props.image ?? null);
    const { control, register } = useForm();
    const [fileUpload] = useFileUploadMutation();

    const handleImageClick = () => {
        const fileInputRef = document.querySelector('#file') as HTMLInputElement | null;
        if (fileInputRef !== null) {
            fileInputRef.value = '';
            fileInputRef.click();
        }
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

    const handleOnClickSave = async (formData: FormData) => {
        try {
            props.onClickClose();
            dispatch(setAppLoader(true));
            const result = await fileUpload(formData).unwrap();
            props.onClickSave(result.url);
        } catch (e) {
            handleOnError(e as StatusResponse);
        } finally {
            dispatch(setAppLoader(false));
        }
    };

    const handleOnClickDelete = () => {
        setPreview(null);
        props.onClickDelete();
        props.onClickClose();
    };

    const onSubmit = (data: FieldValues) => {
        const formData = new FormData();
        formData.append('file', data.file[0] as Blob);
        handleOnClickSave(formData);
    };

    return (
        <Modal onClose={() => props.onClickClose()} isOpen={true} isCentered>
            <ModalOverlay />
            <ModalContent borderRadius='16px' width={{ base: '316px', lg: '396px' }}>
                <ModalBody data-test-id={props.dataTestIdModal} p={0}>
                    <Form method='post' control={control} onSubmit={({ data }) => onSubmit(data)}>
                        <IconButton
                            position='absolute'
                            right={0}
                            top={0}
                            data-test-id='close-button'
                            boxSize='24px'
                            alignSelf='end'
                            margin='24px'
                            minW={0}
                            onClick={() => props.onClickClose()}
                            backgroundColor='transparent'
                            icon={<CloseInCircleIcon boxSize='24px' />}
                            aria-label='close'
                        />
                        <VStack p='32px' align='center' spacing='32px'>
                            <Text textStyle='text2xlLh8Bold'>Изображение</Text>
                            <Box>
                                <Input
                                    data-test-id={props.dataTestIdInput}
                                    type='file'
                                    {...register('file')}
                                    id='file'
                                    style={{ display: 'none' }}
                                    accept='image/*'
                                    onChange={(e) => {
                                        handleFileChange(e);
                                        register('file').onChange(e);
                                    }}
                                />
                                {preview ? (
                                    <Image
                                        data-test-id={props.dataTestIdPreview}
                                        src={preview.toString()}
                                        onClick={handleImageClick}
                                        width='206px'
                                        height='206px'
                                    />
                                ) : (
                                    <Fallback
                                        data-test-id={props.dataTestIdFallback}
                                        onClick={handleImageClick}
                                        height='206px'
                                        width='206px'
                                    />
                                )}
                            </Box>
                            {preview && (
                                <VStack alignSelf='stretch' spacing='16px' align='stretch'>
                                    <Button
                                        type='submit'
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
                            )}
                        </VStack>
                    </Form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
