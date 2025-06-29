import { useEffect, useState } from 'react';

import { Recipe } from '~/app/mocks/types/type_defenitions';
import { useGetAllUsersQuery, User, UsersResponse } from '~/query/create-recipe-api';

export const useGetRecommendingUser = (recipe: Recipe) => {
    const [recommendingUser, setRecommendingUser] = useState<User>();
    const [idx, setIdx] = useState(0);
    const recommendByUserId = recipe.recommendedByUserId?.at(idx);

    const { data, isSuccess, isLoading } = useGetAllUsersQuery();

    useEffect(() => {
        if (isSuccess && recommendByUserId) {
            const response = data as UsersResponse;
            const user = response.find((it) => it.id === recommendByUserId);
            if (user) {
                setRecommendingUser(user);
            } else if (idx + 1 < (recipe.recommendedByUserId?.length ?? 0)) {
                setIdx(idx + 1);
            }
        }
    }, [data, isLoading, isSuccess, idx]);

    return recommendingUser;
};
