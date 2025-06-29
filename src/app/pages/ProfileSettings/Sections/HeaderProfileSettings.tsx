import {
    Avatar,
    AvatarBadge,
    Button,
    Center,
    Image,
    Input,
    SimpleGrid,
    Stack,
    SystemStyleObject,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useRef, useState } from 'react';
import { Form, useForm } from 'react-hook-form';

import { profileSchema } from '~/app/pages/Login/schemes';
import avatarBageIcon from '~/assets/icons/BsFillImageFill.svg';
import { useUpdateProfileNameMutation } from '~/query/create-recipe-api';
import { Error, MyProfile, setNotification } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

import { ChangeProfileImageModal } from '../Modal/ChangeProfileImageModal';
import { ChangeProfilePasswordModal } from '../Modal/ChangeProfilePasswordModal';

export type ProfileNameFormData = {
    firstName: string;
    lastName: string;
};

export const HeaderProfileSettings = ({ profile }: { profile: MyProfile }) => {
    const dispatch = useAppDispatch();

    const {
        isOpen: isOpenChangeProfileImageModal,
        onClose: onCloseChangeProfileImageModal,
        onOpen: onOpenChangeProfileImageModal,
    } = useDisclosure({ defaultIsOpen: false });

    const {
        isOpen: isOpenChangeProfilePasswordModal,
        onClose: onCloseChangeProfilePasswordModal,
        onOpen: onOpenChangeProfilePasswordModal,
    } = useDisclosure({ defaultIsOpen: false });

    const {
        control,
        register,
        formState: { errors: formErrors },
    } = useForm({
        resolver: yupResolver(profileSchema),
        mode: 'onChange',
        defaultValues: {
            firstName: profile.profileInfo!.firstName,
            lastName: profile.profileInfo!.lastName,
        },
    });

    const inputStyleFirstName: SystemStyleObject = {
        bgColor: 'white',
        borderColor: formErrors.firstName ? 'red' : 'lime.150',
    };
    const inputStyleLastName: SystemStyleObject = {
        bgColor: 'white',
        borderColor: formErrors.lastName ? 'red' : 'lime.150',
    };

    const handleOnBlurFirstName = () => {
        const thisElement = document.getElementById('firstName') as HTMLInputElement;
        thisElement.value = thisElement.value.trim();
    };

    const handleOnBlurLastName = () => {
        const thisElement = document.getElementById('lastName') as HTMLInputElement;
        thisElement.value = thisElement.value.trim();
    };

    const [updateProfileName, { isError, isLoading, isSuccess, error }] =
        useUpdateProfileNameMutation();

    useEffect(() => {
        if (isSuccess) {
            dispatch(
                setNotification({
                    _id: crypto.randomUUID(),
                    title: 'Изменения сохранены',
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
                    message: 'Попробуйте немного позже.',
                    type: 'error',
                }),
            );
        }
    }, [isError, isLoading, isSuccess, error]);

    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                onOpenChangeProfileImageModal();
            };
            reader.readAsDataURL(file);
        }
    };
    const [avatar, setAvatar] = useState<string>(profile.profileInfo?.photoLink ?? '');

    return (
        <>
            <Form control={control} onSubmit={({ data }) => updateProfileName(data)}>
                <Stack>
                    <Text textStyle='textLgLh7Bold'>Авторизация и персонализация</Text>
                    <Avatar
                        alignSelf={{ base: 'center', lg: 'start' }}
                        size={{ base: 'md', md: 'lg', xl: 'xl' }}
                        name={`${profile.profileInfo!.firstName} ${profile.profileInfo!.lastName}`}
                        src={avatar}
                        boxSize={{ base: '96px', lg: '128px' }}
                    >
                        <Input
                            ref={fileInputRef}
                            type='file'
                            id='file'
                            style={{ display: 'none' }}
                            accept='image/*'
                            onChange={handleFileChange}
                        />
                        <AvatarBadge
                            onClick={() => fileInputRef.current?.click()}
                            transform='translate(1px, 1px)'
                            bg='black'
                            borderWidth='4px'
                        >
                            <Center boxSize='24px'>
                                <Image filter='invert(100%)' src={avatarBageIcon} boxSize='12px' />
                            </Center>
                        </AvatarBadge>
                    </Avatar>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing='16px'>
                        <Stack>
                            <label htmlFor='firstName'>
                                <Text textStyle='textMdLh6Normal'>Имя</Text>
                            </label>
                            <Input
                                {...register('firstName')}
                                data-test-id='first-name-input'
                                borderRadius='6px'
                                borderColor={formErrors.firstName ? 'red' : 'lime.150'}
                                bgColor='white'
                                placeholder='Имя'
                                variant='filled'
                                id='firstName'
                                _active={inputStyleFirstName}
                                _focus={inputStyleFirstName}
                                onBlur={() => handleOnBlurFirstName()}
                            />
                            <Text textStyle='textXsLh4Normal' color='red'>
                                {formErrors.firstName?.message}
                            </Text>
                        </Stack>
                        <Stack>
                            <label htmlFor='lastName'>
                                <Text textStyle='textMdLh6Normal'>Фамилия</Text>
                            </label>
                            <Input
                                {...register('lastName')}
                                data-test-id=''
                                borderRadius='6px'
                                borderColor={formErrors.firstName ? 'red' : 'lime.150'}
                                bgColor='white'
                                placeholder='Фамилия'
                                variant='filled'
                                id='lastName'
                                _active={inputStyleLastName}
                                _focus={inputStyleLastName}
                                onBlur={() => handleOnBlurLastName()}
                            />
                            <Text textStyle='textXsLh4Normal' color='red'>
                                {formErrors.lastName?.message}
                            </Text>
                        </Stack>

                        <Stack>
                            <label htmlFor='email'>
                                <Text textStyle='textMdLh6Normal'>E-mail</Text>
                            </label>
                            <Input
                                disabled={true}
                                data-test-id='email-input'
                                type='email'
                                borderRadius='6px'
                                borderColor='transparent'
                                bgColor='white'
                                placeholder='e-mail'
                                variant='filled'
                                _hover={{
                                    bgColor: 'transparent',
                                }}
                                id='email'
                                value={profile.profileInfo!.email}
                            />
                        </Stack>
                        <Stack>
                            <label htmlFor='login'>
                                <Text textStyle='textMdLh6Normal'>Логин</Text>
                            </label>
                            <Input
                                disabled={true}
                                data-test-id=''
                                type='text'
                                borderRadius='6px'
                                borderColor='transparent'
                                bgColor='white'
                                placeholder='Логин'
                                variant='filled'
                                _hover={{
                                    bgColor: 'transparent',
                                }}
                                id='login'
                                value={profile.profileInfo!.login}
                            />
                        </Stack>
                    </SimpleGrid>
                    <Button
                        onClick={() => onOpenChangeProfilePasswordModal()}
                        variant='ghost'
                        alignSelf={{ md: 'start' }}
                    >
                        Сменить пароль
                    </Button>
                    <Button
                        type='submit'
                        alignSelf={{ md: 'start' }}
                        bgColor='black'
                        color='white'
                        variant='solid'
                    >
                        Сохранить изменения
                    </Button>
                </Stack>
            </Form>
            <ChangeProfileImageModal
                image={preview as string}
                isOpen={isOpenChangeProfileImageModal}
                onClose={() => onCloseChangeProfileImageModal()}
                onSuccess={(croppedImage) => setAvatar(croppedImage)}
            />
            <ChangeProfilePasswordModal
                isOpen={isOpenChangeProfilePasswordModal}
                onClose={() => onCloseChangeProfilePasswordModal()}
            />
        </>
    );
};
