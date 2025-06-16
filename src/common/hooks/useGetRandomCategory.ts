import { useMemo } from 'react';
import { useParams } from 'react-router';

import { useGetCategoriesQuery } from '~/query/create-category-api';

import { getRandomNumber } from '../utils/getRandomNumber';

export function useGetRandomCategory() {
    const { category: categoryId } = useParams();
    const { data: categories, isSuccess, isLoading, isError } = useGetCategoriesQuery();

    const randomCategory = useMemo(() => {
        if (isSuccess) {
            const mainCategories = categories.filter((it) => !!it.subCategories);
            const randomIdx = getRandomNumber(1, mainCategories.length) - 1;
            return mainCategories[randomIdx];
        }
    }, [categoryId, categories, isSuccess]);

    return { randomCategory, isSuccess, isLoading, isError };
}
