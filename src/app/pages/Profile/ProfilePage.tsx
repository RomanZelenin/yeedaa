import { Avatar, IconButton, Stack, Text } from '@chakra-ui/react';

import { IconWithCounter } from '~/common/components/Cards/IconWithCounter';
import { BookmarkIcon } from '~/common/components/Icons/BookmarkIcon';
import { GearIcon } from '~/common/components/Icons/GearIcon';
import { PersonsIcon } from '~/common/components/Icons/PersonsIcon';

import { EmptyConatainer } from '../common/Containers/EmptyContainer';

export const ProfilePage = () => (
    <EmptyConatainer>
        <>
            <Stack px={{ base: '16px' }} rowGap='16px'>
                <ProfileHeader />
            </Stack>
        </>
    </EmptyConatainer>
);

export const ProfileHeader = () => (
    <>
        <Stack
            position='relative'
            direction={{ base: 'column', md: 'row' }}
            gap='24px'
            align='stretch'
            justify={{ md: 'start' }}
        >
            <IconButton
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
                name='Екатерина Константинопольская'
                src=''
                boxSize={{ base: '96px', lg: '128px' }}
            />
            <Stack justify='center' spacing='12px'>
                <Text
                    textAlign={{ base: 'center', md: 'start' }}
                    data-test-id='blogger-user-info-name'
                    alignSelf={{ base: 'center', md: 'start' }}
                    textStyle={{ base: 'text2xlLh8Bold', lg: 'text5xlLhNoneBold' }}
                >
                    Екатерина Константинопольская
                </Text>
                <Text
                    alignSelf={{ base: 'center', md: 'start' }}
                    textStyle='profileNicknameBlogCard'
                    noOfLines={1}
                >
                    @vasya
                </Text>
                <Stack
                    direction='row'
                    alignSelf={{ base: 'center', md: 'start' }}
                    justify='space-between'
                >
                    <Stack direction='row'>
                        <IconWithCounter icon={<BookmarkIcon boxSize='12px' />} count={1} />
                        <IconWithCounter
                            icon={<PersonsIcon fill='black' boxSize='12px' />}
                            count={1}
                        />
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    </>
);
