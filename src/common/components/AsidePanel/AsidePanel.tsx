import { Box, LinkBox, LinkOverlay, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router';

import { useGetProfileActivity } from '~/common/hooks/useGetProfileActivity';
import { isShowRecommendSelector, myProfile } from '~/store/app-slice';
import { useAppSelector } from '~/store/hooks';

import { IconWithCounter } from '../Cards/IconWithCounter';
import { BookmarkIcon } from '../Icons/BookmarkIcon';
import { LikeIcon } from '../Icons/LikeIcon';
import { PersonsIcon } from '../Icons/PersonsIcon';
import { RecommendIcon } from '../Icons/RecommendIcon';
import { WriteIcon } from '../Icons/WriteIcon';
import { useResource } from '../ResourceContext/ResourceContext';

export const AsidePanel = () => {
    const { getString } = useResource();
    const profile = useAppSelector(myProfile);
    const { bookmarks, likes, subscribers, recommendations } = useGetProfileActivity(profile);
    const isShowRecommendations = useAppSelector(isShowRecommendSelector);

    return (
        <VStack pos='fixed' bottom={0} top='80px' justify='space-between'>
            {profile.statistic && (
                <VStack spacing='32px' px='8px' pt='16px'>
                    {isShowRecommendations && (
                        <IconWithCounter
                            icon={<RecommendIcon boxSize='16px' />}
                            count={recommendations}
                        />
                    )}
                    <IconWithCounter icon={<BookmarkIcon boxSize='16px' />} count={bookmarks} />
                    <IconWithCounter
                        icon={<PersonsIcon boxSize='16px' fill='black' />}
                        count={subscribers}
                    />
                    <IconWithCounter icon={<LikeIcon boxSize='16px' />} count={likes} />
                </VStack>
            )}

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
