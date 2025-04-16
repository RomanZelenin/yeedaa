import { Avatar, Box, Flex, Text, VStack } from '@chakra-ui/react';
import { useMemo, useState } from 'react';

import { HomeIcon } from '../Icons/HomeIcon';
import { SearchIcon } from '../Icons/SearchIcon';
import { WriteIcon } from '../Icons/WriteIcon';

export default function BottomMenu({ avatar }: { avatar: string }) {
    const [selectedMenuIdx, _] = useState(0);

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
            },
            {
                icon: (
                    <SearchIcon
                        boxSize='40px'
                        filter={selectedMenuIdx === 1 ? 'invert(100%)' : 'none'}
                    />
                ),
                title: 'Поиск',
            },
            {
                icon: (
                    <WriteIcon
                        boxSize='40px'
                        filter={selectedMenuIdx === 2 ? 'invert(100%)' : 'none'}
                    />
                ),
                title: 'Записать',
            },
            {
                icon: (
                    <Avatar
                        src={avatar}
                        boxSize='40px'
                        filter={selectedMenuIdx === 3 ? 'invert(100%)' : 'none'}
                    />
                ),
                title: 'Мой профиль',
            },
        ];
        return menuItems;
    }, [avatar, selectedMenuIdx]);

    return (
        <Flex
            position='fixed'
            bg='lime.50'
            h={{ base: '84px', md: '96px' }}
            bottom={0}
            w='100%'
            data-test-id='footer'
        >
            {items.map((it, idx) => (
                <Box
                    key={idx}
                    as='button'
                    py='10px'
                    flex={1}
                    fontSize='12px'
                    fontWeight={selectedMenuIdx === idx ? '500' : '400'}
                    lineHeight='133%'
                    color={selectedMenuIdx === idx ? 'black' : 'rgba(0, 0, 0, 0.64)'}
                    bgGradient={
                        selectedMenuIdx === idx
                            ? 'radial(62.5% 62.5% at 48.89% 37.5%, lime.150 0%, rgba(255, 255, 255, 0) 100%) lime.50'
                            : 'none'
                    }
                >
                    <VStack spacing={0}>
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
}
