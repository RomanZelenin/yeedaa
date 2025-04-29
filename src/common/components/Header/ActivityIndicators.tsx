import { Flex, HStack, Text } from '@chakra-ui/react';
import { useMemo } from 'react';

import { BookmarkIcon } from '../Icons/BookmarkIcon';
import { LikeIcon } from '../Icons/LikeIcon';
import { PersonsIcon } from '../Icons/PersonsIcon';

export const ActivityIndicators = ({
    bookmarks,
    persons,
    likes,
}: {
    bookmarks: number;
    persons: number;
    likes: number;
}) => {
    const menuItems = useMemo(
        () => [
            { icon: <BookmarkIcon boxSize='12px' />, count: bookmarks },
            { icon: <PersonsIcon boxSize='12px' />, count: persons },
            { icon: <LikeIcon boxSize='12px' />, count: likes },
        ],
        [bookmarks, persons, likes],
    );

    return (
        <HStack spacing='0' px={{ base: '8px', md: '16px' }}>
            {menuItems.map((it, id) => (
                <Flex key={id} px='8px' alignItems='center' columnGap='6px'>
                    {it.icon}
                    <Text textStyle='counterIndicator'>{it.count}</Text>
                </Flex>
            ))}
        </HStack>
    );
};
