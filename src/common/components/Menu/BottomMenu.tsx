import { Avatar, Box, Flex, Text, VStack } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { Link as ReactRouterLink } from 'react-router';

import { ApplicationRoute } from '~/router';
import { myProfile } from '~/store/app-slice';
import { useAppSelector } from '~/store/hooks';

import { HomeIcon } from '../Icons/HomeIcon';
import { SearchIcon } from '../Icons/SearchIcon';
import { WriteIcon } from '../Icons/WriteIcon';

export const BottomMenu = () => {
    const DEFAULT_SELECTED_MENU_ITEM = 0;
    const [selectedMenuIdx, setSelectedMenuIdx] = useState(DEFAULT_SELECTED_MENU_ITEM);
    const profile = useAppSelector(myProfile);

    const items = useMemo(() => {
        const menuItems = [
            {
                icon: (
                    <HomeIcon
                        boxSize='40px'
                        filter={selectedMenuIdx === 0 ? 'invert(100%)' : 'none'}
                    />
                ),
                title: 'Главная',
                path: ApplicationRoute.INDEX,
            },
            {
                icon: (
                    <SearchIcon
                        boxSize='40px'
                        filter={selectedMenuIdx === 1 ? 'invert(100%)' : 'none'}
                    />
                ),
                title: 'Поиск',
                path: '#',
            },
            {
                icon: (
                    <WriteIcon
                        boxSize='40px'
                        filter={selectedMenuIdx === 2 ? 'invert(100%)' : 'none'}
                    />
                ),
                title: 'Записать',
                path: ApplicationRoute.NEW_RECIPE,
            },
            {
                icon: (
                    <Avatar
                        src={profile.profileInfo?.photoLink}
                        name={`${profile?.profileInfo?.firstName} ${profile?.profileInfo?.lastName}`}
                        boxSize='40px'
                    />
                ),
                title: 'Мой профиль',
                path: ApplicationRoute.PROFILE,
            },
        ];
        return menuItems;
    }, [profile, selectedMenuIdx]);

    return (
        <Flex
            position='fixed'
            bg='lime.50'
            h={{ base: '84px', md: '96px' }}
            bottom={0}
            w='100%'
            data-test-id='footer'
            zIndex={1}
        >
            {items.map((it, idx) => (
                <Box
                    key={idx}
                    as='button'
                    py='10px'
                    flex={1}
                    fontSize='12px'
                    fontWeight={selectedMenuIdx === idx ? 500 : 400}
                    lineHeight='133%'
                    color={selectedMenuIdx === idx ? 'black' : 'rgba(0, 0, 0, 0.64)'}
                    bgGradient={
                        selectedMenuIdx === idx
                            ? 'radial(62.5% 62.5% at 48.89% 37.5%, lime.150 0%, rgba(255, 255, 255, 0) 100%) lime.50'
                            : 'none'
                    }
                >
                    <VStack
                        data-test-id={
                            it.path === ApplicationRoute.PROFILE ? 'footer-profile-button' : ''
                        }
                        as={ReactRouterLink}
                        to={it.path}
                        spacing={0}
                        onClick={() => setSelectedMenuIdx(idx)}
                    >
                        <Box
                            bgColor={selectedMenuIdx === idx ? 'black' : 'none'}
                            borderRadius='100%'
                        >
                            {it.icon}
                        </Box>
                        <Text>{it.title}</Text>
                    </VStack>
                </Box>
            ))}
        </Flex>
    );
};
