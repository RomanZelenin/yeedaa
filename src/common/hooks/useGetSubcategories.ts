import { useEffect, useState } from 'react';

import { useGetCategoriesQuery } from '~/query/create-category-api';
import { Subcategory } from '~/query/types';

export const useGetSubcategories = () => {
    const { data: categories, isSuccess: isSuccessGetCategories } = useGetCategoriesQuery();
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

    /* const subcategories = useMemo(() => {
        return isSuccessGetCategories 
            ? categories.flatMap(category => category.subCategories ?? [])
            : [];
    }, [categories, isSuccessGetCategories]); */
    useEffect(() => {
        if (isSuccessGetCategories) {
            setSubcategories(categories.flatMap((category) => category.subCategories ?? []));
        }
    }, [categories, isSuccessGetCategories]);

    return subcategories;
};
