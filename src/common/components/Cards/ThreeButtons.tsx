import { HStack, Image, Text } from '@chakra-ui/react';

type ThreeButtonsProps = {
    bookmarks?: number;
    likes?: number;
    views?: number;
};

export const ThreeButtons = ({ bookmarks, likes, views }: ThreeButtonsProps) => {
    const buttonsData = [
        { type: 'bookmarks', count: bookmarks, icon: '/src/assets/icons/bookmark.svg' },
        { type: 'likes', count: likes, icon: '/src/assets/icons/like.svg' },
        { type: 'persons', count: views, icon: '/src/assets/icons/persons.svg' },
    ];

    return (
        <HStack spacing='8px'>
            {buttonsData.map(({ type, count, icon }) =>
                typeof count === 'number' ? (
                    <ButtonItem key={type} iconSrc={icon} count={count} />
                ) : null,
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
