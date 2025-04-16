import { Flex, Text, VStack } from '@chakra-ui/react';

import { BookmarkIcon } from '../Icons/BookmarkIcon';
import { LikeIcon } from '../Icons/LikeIcon';
import { PersonsIcon } from '../Icons/PersonsIcon';

export default function ProfileNotification({
    bookmarks,
    persons,
    likes,
}: {
    bookmarks: number;
    persons: number;
    likes: number;
}) {
    const menuItems = [
        { icon: <BookmarkIcon boxSize='16px' />, count: bookmarks },
        { icon: <PersonsIcon boxSize='16px' />, count: persons },
        { icon: <LikeIcon boxSize='16px' />, count: likes },
    ];
    return (
        <VStack spacing='32px' px='8px' pt='16px'>
            {menuItems.map((it, idx) => (
                <Flex key={idx} alignItems='center' columnGap={['8px']}>
                    {it.icon}
                    <Text textStyle='profileNotification'>{it.count}</Text>
                </Flex>
            ))}
        </VStack>
    );
}
