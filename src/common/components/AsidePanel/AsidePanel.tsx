import { Box, LinkBox, LinkOverlay, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router';

import { IconWithCounter } from '../Cards/IconWithCounter';
import { BookmarkIcon } from '../Icons/BookmarkIcon';
import { LikeIcon } from '../Icons/LikeIcon';
import { PersonsIcon } from '../Icons/PersonsIcon';
import { WriteIcon } from '../Icons/WriteIcon';
import { useResource } from '../ResourceContext/ResourceContext';

export const AsidePanel = ({
    bookmarks,
    persons,
    likes,
}: {
    bookmarks: number;
    persons: number;
    likes: number;
}) => {
    const { getString } = useResource();
    return (
        <VStack pos='fixed' bottom={0} top='80px' justify='space-between'>
            <VStack spacing='32px' px='8px' pt='16px'>
                <IconWithCounter icon={<BookmarkIcon boxSize='16px' />} count={bookmarks} />
                <IconWithCounter
                    icon={<PersonsIcon boxSize='16px' fill='black' />}
                    count={persons}
                />
                <IconWithCounter icon={<LikeIcon boxSize='16px' />} count={likes} />
            </VStack>

            <LinkBox data-test-id='add-recipe-button'>
                <LinkOverlay as={Link} to='/new-recipe'>
                    <Box
                        as='button'
                        boxSize='208px'
                        bgGradient='radial(50% 50% at 50% 50%, lime.150 0%, rgba(255, 255, 255, 0) 100%) lime.50'
                    >
                        <VStack spacing='12px'>
                            <Box bgColor='black' borderRadius='100%'>
                                <WriteIcon filter='invert(100%)' boxSize='48px' />
                            </Box>
                            <Text textStyle='writeRecipieBtn'>{getString('write-recipe')}</Text>
                        </VStack>
                    </Box>
                </LinkOverlay>
            </LinkBox>
        </VStack>
    );
};
