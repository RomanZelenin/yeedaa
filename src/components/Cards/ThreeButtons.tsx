import { Box, Flex, HStack, Image } from '@chakra-ui/react';

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
    <Flex alignItems='center' columnGap='6px'>
        <Image src={iconSrc} boxSize='12px' alt='' />
        <Box as='span' fontSize='12px' lineHeight='16px' fontWeight='600' color='lime.600'>
            {count}
        </Box>
    </Flex>
);
