import { useMemo } from 'react';

import { MyProfile } from '~/store/app-slice';

export const useGetProfileActivity = (profile: MyProfile) => {
    const bookmarks = useMemo(
        () =>
            profile.statistic?.bookmarks
                .map((it) => it.count)
                .reduce((prev, curr) => curr + prev, 0) ?? 0,
        [profile.statistic?.bookmarks],
    );
    const likes = useMemo(
        () =>
            profile.statistic?.likes.map((it) => it.count).reduce((prev, curr) => curr + prev, 0) ??
            0,
        [profile.statistic?.likes],
    );
    const subscribers = profile.profileInfo?.subscribers.length ?? 0;
    const recommendations = profile.statistic?.recommendationsCount ?? 0;
    return { bookmarks, likes, subscribers, recommendations };
};
