import { Box, Flex, HStack, Image } from '@chakra-ui/react';

function ThreeButtons({
    bookmarksCount,
    likesCount,
    personsCount,
}: {
    bookmarksCount?: number;
    likesCount?: number;
    personsCount?: number;
}) {
    return (
        <HStack spacing='8px'>
            {typeof bookmarksCount === 'number' ? (
                <>
                    <Flex alignItems='center' columnGap={['6px']}>
                        <Image src='./src/assets/icons/bookmark.svg' boxSize={['12px']} />
                        <Box
                            as='span'
                            fontSize={['12px']}
                            lineHeight={['16px']}
                            fontWeight='600'
                            color='lime.600'
                        >
                            {bookmarksCount}
                        </Box>
                    </Flex>
                </>
            ) : (
                <></>
            )}
            {typeof likesCount === 'number' ? (
                <>
                    <Flex alignItems='center' columnGap={['6px']}>
                        <Image src='./src/assets/icons/like.svg' boxSize={['12px']} />
                        <Box
                            as='span'
                            fontSize={['12px']}
                            lineHeight={['16px']}
                            fontWeight='600'
                            color='lime.600'
                        >
                            {likesCount}
                        </Box>
                    </Flex>
                </>
            ) : (
                <></>
            )}
            {typeof personsCount === 'number' ? (
                <>
                    <Flex alignItems='center' columnGap={['6px']}>
                        <Image src='./src/assets/icons/persons.svg' boxSize={['12px']} />
                        <Box
                            as='span'
                            fontSize={['12px']}
                            lineHeight={['16px']}
                            fontWeight='600'
                            color='lime.600'
                        >
                            {personsCount}
                        </Box>
                    </Flex>
                </>
            ) : (
                <></>
            )}
        </HStack>
    );
}

export default ThreeButtons;
