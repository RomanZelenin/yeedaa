import { Flex, HStack, Text } from '@chakra-ui/react';

import { BookmarkIcon } from '../Icons/BookmarkIcon';
import { LikeIcon } from '../Icons/LikeIcon';
import { PersonsIcon } from '../Icons/PersonsIcon';

export default function ActivityIndicators({
    bookmarks,
    persons,
    likes,
}: {
    bookmarks: number;
    persons: number;
    likes: number;
}) {
    const menuItems = [
        { icon: <BookmarkIcon boxSize='12px' />, count: bookmarks },
        { icon: <PersonsIcon boxSize='12px' />, count: persons },
        { icon: <LikeIcon boxSize='12px' />, count: likes },
    ];
    return (
        <HStack spacing='0' px={{ base: '8px', md: '16px' }}>
            {menuItems.map((it, idx) => (
                <Flex key={idx} px='8px' alignItems='center' columnGap='6px'>
                    {it.icon}
                    <Text textStyle='counterIndicator'>{it.count}</Text>
                </Flex>
            ))}
        </HStack>
    );
}
