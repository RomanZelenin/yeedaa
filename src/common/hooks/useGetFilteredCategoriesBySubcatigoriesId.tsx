import { useEffect, useMemo, useState } from 'react';

import { useGetCategoriesQuery } from '~/query/create-category-api';
import { CategoryResponse } from '~/query/types';

export const useGetFilteredCategoriesBySubcatigoriesId = (
    subCategoriesIds?: string[] | undefined,
) => {
    const subcategoriesIds = useMemo(() => subCategoriesIds?.map((id) => id), [subCategoriesIds]);
    const responseCategories = useGetCategoriesQuery();
    const [categories, setCategories] = useState<CategoryResponse[]>();

    useEffect(() => {
        setCategories(
            responseCategories.data?.filter((it) =>
                it.subCategories?.some((it) => subcategoriesIds?.includes(it._id)),
            ),
        );
    }, [responseCategories]);

    return { categories };
};
