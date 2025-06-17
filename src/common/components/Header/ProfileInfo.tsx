import { Avatar, Box, Flex, VStack } from '@chakra-ui/react';
import { memo } from 'react';
import { Link } from 'react-router';

import { UserProfile } from '~/query/types';
import { ApplicationRoute } from '~/router';

export type Profile = {
    _id?: string;
    isFavorite?: boolean;
    avatar?: string;
    firstName: string;
    lastName: string;
    nickname: string;
    activity: {
        bookmarks: number;
        subscribers: number;
        likes: number;
    };
};

export const ProfileInfo = memo(({ profile }: { profile?: UserProfile }) => (
    <>
        {profile && (
            <Flex
                as={Link}
                to={ApplicationRoute.PROFILE}
                alignItems='center'
                px='24px'
                columnGap='12px'
            >
                <Avatar src='#' name={`${profile.firstName} ${profile.lastName}`} boxSize='48px' />
                <VStack spacing={0} alignItems='start'>
                    <Box textStyle='profileName'>{`${profile.firstName} ${profile.lastName}`}</Box>
                    <Box textStyle='profileNickname'>@{profile.login}</Box>
                </VStack>
            </Flex>
        )}
    </>
));
