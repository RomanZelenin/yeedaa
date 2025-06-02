import { HStack, Image, Text } from '@chakra-ui/react';

type ThreeButtonsProps = {
    bookmarks?: number;
    likes?: number;
    views?: number;
};

import bookmarkIcon from '~/assets/icons/bookmark.svg';
import likeIcon from '~/assets/icons/like.svg';
import personsIcon from '~/assets/icons/persons.svg';

export const ThreeButtons = ({ bookmarks, likes, views }: ThreeButtonsProps) => {
    const buttonsData = [
        { type: 'bookmarks', count: bookmarks, icon: bookmarkIcon },
        { type: 'likes', count: likes, icon: likeIcon },
        { type: 'persons', count: views, icon: personsIcon },
    ];

    return (
        <HStack spacing='8px'>
            {buttonsData.map(
                ({ type, count, icon }) =>
                    typeof count === 'number' && (
                        <ButtonItem key={type} iconSrc={icon} count={count} />
                    ),
            )}
        </HStack>
    );
};

const ButtonItem = ({ iconSrc, count }: { iconSrc: string; count: number }) => (
    <HStack spacing='6px' p='4px'>
        <Image src={iconSrc} boxSize='12px' alt='icon' />
        <Text textStyle='textXsLh4Semibold' color='lime.600'>
            {count}
        </Text>
    </HStack>
);
