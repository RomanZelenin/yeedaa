import { CloseIcon } from '@chakra-ui/icons';
import { Box, Flex, Hide, IconButton, Show, Spacer, useDisclosure } from '@chakra-ui/react';

import { NavigationBreadcrumb } from '../Breadcrumbs/NavigationBreadcrumb';
import { BurgerIcon } from '../Icons/BurgerIcon';
import { HamburgerMenu } from '../Menu/HamburgerMenu';
import { ActivityIndicators } from './ActivityIndicators';
import { Logo } from './Logo';
import { Profile, ProfileInfo } from './ProfileInfo';

export const Header = ({ profile }: { profile: Profile }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Flex
                justifyContent='center'
                position='fixed'
                bg={!isOpen ? 'lime.50' : 'white'}
                h={{ base: '64px', md: '80px' }}
                w='100%'
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
                            <ActivityIndicators
                                bookmarks={profile.activity.bookmarks}
                                persons={profile.activity.persons}
                                likes={profile.activity.likes}
                            />
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
                            <NavigationBreadcrumb />
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
