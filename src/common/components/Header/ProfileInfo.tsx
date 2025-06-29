import { Avatar, Box, Flex, VStack } from '@chakra-ui/react';
import { memo } from 'react';
import { Link } from 'react-router';

import { UserProfile } from '~/query/types';
import { ApplicationRoute } from '~/router';

export const ProfileInfo = memo(({ profile }: { profile?: UserProfile }) => (
    <>
        {profile && (
            <Flex
                data-test-id='header-profile-button'
                as={Link}
                to={ApplicationRoute.PROFILE}
                alignItems='center'
                px='24px'
                columnGap='12px'
            >
                <Avatar
                    src={profile.photoLink}
                    name={`${profile.firstName} ${profile.lastName}`}
                    boxSize='48px'
                />
                <VStack spacing={0} alignItems='start'>
                    <Box textStyle='profileName'>{`${profile.firstName} ${profile.lastName}`}</Box>
                    <Box textStyle='profileNickname'>@{profile.login}</Box>
                </VStack>
            </Flex>
        )}
    </>
));
