import { useMemo } from 'react';

import { useGetCategoriesQuery } from '~/query/create-category-api';

export function useGetCategories() {
    const { data, isSuccess, isLoading, isError } = useGetCategoriesQuery();
    const categories = useMemo(
        () => (isSuccess ? data.filter((it) => !!it.subCategories) : []),
        [isSuccess, data],
    );
    return { categories, isSuccess, isLoading, isError };
}
