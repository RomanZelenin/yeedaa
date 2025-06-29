import { CloseIcon, Text } from '@chakra-ui/icons';
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    IconButton,
    Spacer,
    Stack,
    Textarea,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Form, useForm } from 'react-hook-form';

import { Note } from '~/app/pages/Home/Sections/SectionCookingBlogs';
import { noteSchema } from '~/app/pages/Login/schemes';
import { useCreateNoteMutation } from '~/query/create-recipe-api';
import { Error, setNotification } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

import { useResource } from '../ResourceContext/ResourceContext';

export type NoteFormData = {
    text: string;
};

export const AddNoteDrawer = ({
    isOpen,
    onClose,
    onSuccess,
}: {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (note: Note) => void;
}) => {
    const dispatch = useAppDispatch();
    const { getString } = useResource();
    const [createNote, { isError, isLoading, isSuccess, data }] = useCreateNoteMutation();
    const {
        register,
        setValue,
        control,
        formState: { errors: formErrors },
    } = useForm({
        resolver: yupResolver(noteSchema),
        mode: 'onSubmit',
    });

    useEffect(() => {
        if (isSuccess) {
            onSuccess(data as Note);
            setValue('text', '');
            dispatch(
                setNotification({
                    _id: crypto.randomUUID(),
                    title: 'Заметка опубликована',
                    message: '',
                    type: 'success',
                }),
            );
        }
        if (isError) {
            dispatch(
                setNotification({
                    _id: crypto.randomUUID(),
                    title: Error.SERVER,
                    message: 'Попробуйте позже.',
                    type: 'error',
                }),
            );
        }
    }, [isError, isLoading, isSuccess]);

    return (
        <Drawer isOpen={isOpen} placement='right' onClose={onClose} size='md'>
            <DrawerOverlay />
            <DrawerContent maxW='450px' h='100vh' p={{ base: '32px' }} data-test-id='filter-drawer'>
                <DrawerHeader p={0}>
                    <Flex align='center'>
                        <Text textStyle='text2xlLh8Bold' flex={1}>
                            {getString('new-note')}
                        </Text>
                        <IconButton
                            data-test-id=''
                            _hover={{ bgColor: 'black' }}
                            boxSize='24px'
                            borderRadius='50%'
                            bgColor='black'
                            minW={0}
                            onClick={() => onClose()}
                            icon={<CloseIcon bgColor='black' color='white' boxSize='10px' />}
                            aria-label='close button'
                        />
                    </Flex>
                </DrawerHeader>
                <DrawerBody display='flex' flexDirection='column' mt='24px'>
                    <Form
                        control={control}
                        onSubmit={({ data }) => {
                            onClose();
                            createNote(data.text);
                        }}
                        style={{ height: '100%' }}
                    >
                        <Stack h='100%'>
                            <Textarea
                                {...register('text')}
                                placeholder='Максимально 160 символов'
                                borderColor={formErrors.text ? 'rgb(229, 62, 62)' : 'lime.150'}
                            />
                            <Text textStyle='textXsLh4Normal' color='red'>
                                {formErrors.text?.message}
                            </Text>
                            <Spacer />
                            <Button
                                alignSelf='end'
                                type='submit'
                                variant='solid'
                                bgColor='black'
                                color='white'
                                data-test-id=''
                            >
                                <Text
                                    textStyle={{
                                        base: 'textSmLh5Semibold',
                                        lg: 'textLgLh7Semibold',
                                    }}
                                >
                                    {getString('publish')}
                                </Text>
                            </Button>
                        </Stack>
                    </Form>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};
