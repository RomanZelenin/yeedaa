import { HStack, Image, Text } from '@chakra-ui/react';

interface ThreeButtonsProps {
    bookmarksCount?: number;
    likesCount?: number;
    personsCount?: number;
}

export const ThreeButtons = ({ bookmarksCount, likesCount, personsCount }: ThreeButtonsProps) => {
    const buttonsData = [
        { type: 'bookmarks', count: bookmarksCount, icon: '/src/assets/icons/bookmark.svg' },
        { type: 'likes', count: likesCount, icon: '/src/assets/icons/like.svg' },
        { type: 'persons', count: personsCount, icon: '/src/assets/icons/persons.svg' },
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
        <Image src={iconSrc} boxSize='12px' alt='' />
        <Text textStyle='textXsLh4Semibold' color='lime.600'>
            {count}
        </Text>
    </HStack>
);
