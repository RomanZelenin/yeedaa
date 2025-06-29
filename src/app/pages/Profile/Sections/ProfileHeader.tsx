import { Avatar, IconButton, Stack, Text } from '@chakra-ui/react';
import { Link } from 'react-router';

import { IconWithCounter } from '~/common/components/Cards/IconWithCounter';
import { BookmarkIcon } from '~/common/components/Icons/BookmarkIcon';
import { GearIcon } from '~/common/components/Icons/GearIcon';
import { PersonsIcon } from '~/common/components/Icons/PersonsIcon';
import { useGetProfileActivity } from '~/common/hooks/useGetProfileActivity';
import { MyProfile } from '~/store/app-slice';

export const ProfileHeader = ({ profile }: { profile: MyProfile }) => {
    const { bookmarks, subscribers } = useGetProfileActivity(profile);
    return (
        <>
            <Stack
                data-test-id='user-profile-box'
                position='relative'
                direction={{ base: 'column', md: 'row' }}
                gap='24px'
                align='stretch'
                justify={{ md: 'start' }}
            >
                <IconButton
                    as={Link}
                    to='/profile/settings'
                    data-test-id='settings-button'
                    p='12px'
                    minW={0}
                    right={0}
                    top={0}
                    position='absolute'
                    bgColor='transparent'
                    icon={<GearIcon boxSize='24px' />}
                    aria-label='profile settings'
                />
                <Avatar
                    alignSelf='center'
                    size={{ base: 'md', md: 'lg', xl: 'xl' }}
                    name={`${profile.profileInfo?.firstName} ${profile.profileInfo?.lastName}`}
                    src={profile.profileInfo?.photoLink}
                    boxSize={{ base: '96px', lg: '128px' }}
                />
                <Stack justify='center' spacing='12px'>
                    <Text
                        textAlign={{ base: 'center', md: 'start' }}
                        data-test-id='user-profile-name'
                        alignSelf={{ base: 'center', md: 'start' }}
                        textStyle={{ base: 'text2xlLh8Bold', lg: 'text5xlLhNoneBold' }}
                    >
                        {`${profile.profileInfo?.firstName} ${profile.profileInfo?.lastName}`}
                    </Text>
                    <Text
                        data-test-id='user-profile-login'
                        alignSelf={{ base: 'center', md: 'start' }}
                        textStyle='profileNicknameBlogCard'
                        noOfLines={1}
                    >
                        {`@${profile.profileInfo?.login}`}
                    </Text>
                    <Stack
                        direction='row'
                        alignSelf={{ base: 'center', md: 'start' }}
                        justify='space-between'
                    >
                        <Stack direction='row' data-test-id='user-profile-stats-block'>
                            <IconWithCounter
                                icon={<BookmarkIcon boxSize='12px' />}
                                count={bookmarks}
                            />
                            <IconWithCounter
                                icon={<PersonsIcon fill='black' boxSize='12px' />}
                                count={subscribers}
                            />
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </>
    );
};
