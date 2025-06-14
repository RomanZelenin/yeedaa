import { CloseIcon } from '@chakra-ui/icons';
import { Box, Flex, Hide, HStack, IconButton, Show, Spacer, useDisclosure } from '@chakra-ui/react';

import { NavigationBreadcrumb } from '../Breadcrumbs/NavigationBreadcrumb';
import { IconWithCounter } from '../Cards/IconWithCounter';
import { BookmarkIcon } from '../Icons/BookmarkIcon';
import { BurgerIcon } from '../Icons/BurgerIcon';
import { LikeIcon } from '../Icons/LikeIcon';
import { PersonsIcon } from '../Icons/PersonsIcon';
import { HamburgerMenu } from '../Menu/HamburgerMenu';
import { Logo } from './Logo';
import { Profile, ProfileInfo } from './ProfileInfo';

export const Header = ({ profile }: { profile: Profile }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

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
                        <Box display={!isOpen ? 'block' : 'none'}>
                            <HStack spacing='0' px={{ base: '8px', md: '16px' }}>
                                <IconWithCounter
                                    icon={<BookmarkIcon boxSize='16px' />}
                                    count={profile.activity.bookmarks}
                                />
                                <IconWithCounter
                                    icon={<PersonsIcon boxSize='16px' fill='black' />}
                                    count={profile.activity.persons}
                                />
                                <IconWithCounter
                                    icon={<LikeIcon boxSize='16px' />}
                                    count={profile.activity.likes}
                                />
                            </HStack>
                        </Box>
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
                            <ProfileInfo profile={profile} />
                        </Box>
                    </Show>
                </Flex>
            </Flex>
        </>
    );
};
