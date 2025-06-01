import { useMemo } from 'react';

import { useGetCategoriesQuery } from '~/query/create-category-api';

export function useCurrentCategory({
    categoryName,
    subcategoryName,
}: {
    categoryName?: string;
    subcategoryName?: string;
}) {
    const { data: categories } = useGetCategoriesQuery();
    const category = useMemo(
        () => categories?.find((it) => it.category === categoryName),
        [categories, categoryName],
    );
    const subcategory = useMemo(
        () =>
            category?.subCategories?.find((subcategory) => subcategory.category == subcategoryName),
        [category, subcategoryName],
    );

    return { category: category, subcategory: subcategory };
}
