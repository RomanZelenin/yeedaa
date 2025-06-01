import { useMemo } from 'react';
import { useParams } from 'react-router';

import { useGetCategoriesQuery } from '~/query/create-category-api';

import { getRandomNumber } from '../utils/getRandomNumber';

export function useRandomCategory() {
    const { category: categoryId } = useParams();
    const { data: categories } = useGetCategoriesQuery();

    const category = useMemo(() => {
        const mainCategories = categories?.filter((it) => !!it.subCategories);
        const randomIdx = getRandomNumber(1, mainCategories?.length ?? 1) - 1;
        return mainCategories?.at(randomIdx);
    }, [categoryId, categories]);

    return category;
}
