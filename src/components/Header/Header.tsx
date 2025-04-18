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
                position='fixed'
                bg={!isOpen ? 'lime.50' : 'white'}
                h={{ base: '64px', md: '80px' }}
                w='100%'
                alignItems='center'
                px='16px'
                data-test-id='header'
                zIndex='popover'
            >
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

                    <IconButton
                        aria-label='Open hamburger menu'
                        icon={
                            !isOpen ? <BurgerIcon boxSize='24px' /> : <CloseIcon boxSize='12px' />
                        }
                        variant='ghost'
                        boxSize='48px'
                        onClick={!isOpen ? onOpen : onClose}
                    />

                    <HamburgerMenu isOpen={isOpen} onClose={onClose} />
                </Hide>

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
        </>
    );
};
