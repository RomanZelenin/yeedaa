import { Stack } from '@chakra-ui/react';

import { myProfile } from '~/store/app-slice';
import { useAppSelector } from '~/store/hooks';

import { EmptyConatainer } from '../common/Containers/EmptyContainer';
import { FooterProfileSettings } from './Sections/FooterProfileSettings';
import { HeaderProfileSettings } from './Sections/HeaderProfileSettings';
import { ProfileStatistics } from './Sections/ProfileStatistics';

export const ProfileSettingsPage = () => {
    const profile = useAppSelector(myProfile);

    return (
        <>
            <EmptyConatainer>
                <>
                    {profile.profileInfo && (
                        <Stack rowGap='24px' px={{ base: '16px', lg: '0px' }}>
                            <HeaderProfileSettings profile={profile} />
                            <ProfileStatistics profile={profile} />
                            <FooterProfileSettings />
                        </Stack>
                    )}
                </>
            </EmptyConatainer>
        </>
    );
};
