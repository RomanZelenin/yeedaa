import { CloseIcon } from '@chakra-ui/icons';
import { Box, Flex, Hide, HStack, IconButton, Show, Spacer, useDisclosure } from '@chakra-ui/react';

import { useGetProfileActivity } from '~/common/hooks/useGetProfileActivity';
import { myProfile } from '~/store/app-slice';
import { useAppSelector } from '~/store/hooks';

import { NavigationBreadcrumb } from '../Breadcrumbs/NavigationBreadcrumb';
import { IconWithCounter } from '../Cards/IconWithCounter';
import { BookmarkIcon } from '../Icons/BookmarkIcon';
import { BurgerIcon } from '../Icons/BurgerIcon';
import { LikeIcon } from '../Icons/LikeIcon';
import { PersonsIcon } from '../Icons/PersonsIcon';
import { HamburgerMenu } from '../Menu/HamburgerMenu';
import { Logo } from './Logo';
import { ProfileInfo } from './ProfileInfo';

export const Header = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const profile = useAppSelector(myProfile);
    const { bookmarks, likes, subscribers } = useGetProfileActivity(profile);

    return (
        <>
            <Flex
                justifyContent='center'
                position='fixed'
                top={0}
                left={0}
                bg={!isOpen ? 'lime.50' : 'white'}
                h={{ base: '64px', md: '80px' }}
                w='100vw'
                alignItems='center'
                px='16px'
                data-test-id='header'
                zIndex={isOpen ? 'popover' : 'docked'}
            >
                <Flex alignItems='center' flex={1} maxW='1920px'>
                    <Logo />
                    <Hide above='lg'>
                        <Spacer alignSelf='center' />
                        {profile.statistic && (
                            <Box display={!isOpen ? 'block' : 'none'}>
                                <HStack spacing='0' px={{ base: '8px', md: '16px' }}>
                                    <IconWithCounter
                                        icon={<BookmarkIcon boxSize='16px' />}
                                        count={bookmarks}
                                    />
                                    <IconWithCounter
                                        icon={<PersonsIcon boxSize='16px' fill='black' />}
                                        count={subscribers}
                                    />
                                    <IconWithCounter
                                        icon={<LikeIcon boxSize='16px' />}
                                        count={likes}
                                    />
                                </HStack>
                            </Box>
                        )}

                        <HamburgerMenu isOpen={isOpen} onClose={onClose} />
                    </Hide>
                    <IconButton
                        visibility={{ lg: 'hidden' }}
                        data-test-id={!isOpen ? 'hamburger-icon' : 'close-icon'}
                        aria-label='Open hamburger menu'
                        icon={
                            !isOpen ? <BurgerIcon boxSize='24px' /> : <CloseIcon boxSize='12px' />
                        }
                        variant='ghost'
                        boxSize='48px'
                        onClick={!isOpen ? onOpen : onClose}
                    />

                    <Show above='lg'>
                        <Box ml='127px'>
                            <NavigationBreadcrumb
                                onClickBreadcrumb={() => {
                                    onClose();
                                }}
                            />
                        </Box>
                        <Spacer />
                        <Box mr='40px'>
                            <ProfileInfo profile={profile.profileInfo} />
                        </Box>
                    </Show>
                </Flex>
            </Flex>
        </>
    );
};
