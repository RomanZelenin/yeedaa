import { Navigate } from 'react-router';

import { useGetCategoriesQuery } from '~/query/create-api';

export const CategoryGuard = ({ category, subcategoryName, children }) => {
    const { isSuccess, isError } = useGetCategoriesQuery();

    if (isSuccess || isError) {
        if (!category || !category.subCategories?.find((it) => it.category === subcategoryName)) {
            return <Navigate to='/not-found' replace />;
        }
    }
    return children;
};
