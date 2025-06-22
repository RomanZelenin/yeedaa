import { skipToken } from '@reduxjs/toolkit/query';
import { useMemo } from 'react';

import { useGetMyProfileQuery, useGetMyStatisticQuery } from '~/query/create-recipe-api';
import { ActivityStats, UserProfile } from '~/query/types';

export function useGetMyProfileData(accessToken?: string | null) {
    const {
        isError: isErrorGetMyProfile,
        isLoading: isLoadingGetMyProfile,
        isSuccess: isSuccessGetMyProfile,
        data: dataMyProfile,
        isFetching: isFetchingMyProfile,
    } = useGetMyProfileQuery(accessToken ? undefined : skipToken);

    const {
        isError: isErrorGetMyStatistic,
        isLoading: isLoadingGetMyStatistic,
        isSuccess: isSuccessGetMyStatistic,
        data: statistic,
        isFetching: isFetchingMyStatistics,
    } = useGetMyStatisticQuery(accessToken ? undefined : skipToken);

    const myProfile = useMemo(
        () => ({
            profileInfo: dataMyProfile as UserProfile,
            statistic: statistic as ActivityStats,
        }),
        [dataMyProfile, statistic],
    );

    return {
        data: myProfile,
        isLoading: isLoadingGetMyProfile || isLoadingGetMyStatistic,
        isError: isErrorGetMyProfile || isErrorGetMyStatistic,
        isSuccess: isSuccessGetMyProfile && isSuccessGetMyStatistic,
        isFetching: isFetchingMyProfile || isFetchingMyStatistics,
    };
}
