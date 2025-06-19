import { useEffect, useState } from 'react';

import { Recipe } from '~/app/mocks/types/type_defenitions';
import { useGetBloggerQuery } from '~/query/create-recipe-api';
import { BloggerInfoResponse, UserProfile } from '~/query/types';

import { getJWTPayload } from '../utils/getJWTPayload';

export const useGetRecommendingUser = (recipe: Recipe) => {
    const [recommendingUser, setRecommendingUser] = useState<UserProfile>();
    const recommendByUserId = recipe.recommendedByUserId?.at(0);
    const { data, isLoading, isSuccess, isError } = useGetBloggerQuery(
        { bloggerId: recommendByUserId ?? '', currentUserId: getJWTPayload().userId },
        { skip: !recommendByUserId },
    );
    useEffect(() => {
        if (isSuccess) {
            const response = data as BloggerInfoResponse;
            setRecommendingUser(response.bloggerInfo);
        }
    }, [data, isLoading, isSuccess, isError]);

    return recommendingUser;
};
