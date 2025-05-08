import { Box, GridItem, VStack } from '@chakra-ui/react';
import { JSX } from '@emotion/react/jsx-runtime';
import { useMemo } from 'react';
import { useParams } from 'react-router';

import { filterSelector } from '~/app/features/filters/filtersSlice';
import { RecipeCollection } from '~/common/components/RecipeCollection/RecipeCollection';
import { Subcategory, useGetCategoriesQuery, useGetRecipeQuery } from '~/query/create-api';
import {
    Error,
    isSearchSelector,
    querySelector,
    recipesSelector,
    setAppError,
    setAppQuery,
    setIsSearch,
    setRecepies,
} from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

import SectionRelevantKitchen from '../../Home/Sections/SectionRelevantKitchen';
import HeaderContainer from './HeaderContainer';

export default function ContentContainer({
    title,
    subtitle,
    children,
}: {
    title: string;
    subtitle?: string;
    children: JSX.Element;
}) {
    let recipes = useAppSelector(recipesSelector);
    const query = useAppSelector(querySelector);
    const filter = useAppSelector(filterSelector);
    const isSearch = useAppSelector(isSearchSelector);
    const dispatcher = useAppDispatch();

    const { category: categoryName } = useParams();
    const { data: categories, isSuccess: isGetCategoriesSuccess /* , isLoading, isError */ } =
        useGetCategoriesQuery();

    /*     if (isLoading) {
            return <></>;
        }
    
        if (isError) {
            return <></>;
        } */

    const { subcategoriesIds, allergens, garnish, meat } = useMemo(
        () => ({
            subcategoriesIds: filter.categories
                .filter((category) => category.selected)
                .map((category) => category.title)
                .join(','),
            allergens: filter.allergens
                .filter((allergen) => allergen.selected)
                .map((allergen) => allergen.title)
                .join(','),
            garnish: filter.side
                .filter((it) => it.selected)
                .map((garnish) => garnish.title)
                .join(','),
            meat: filter.meat
                .filter((it) => it.selected)
                .map((meat) => meat.title)
                .join(','),
        }),
        [categories, filter.allergens, filter.side, filter.meat, filter.categories, categoryName],
    );

    const { data, isError, isSuccess } = useGetRecipeQuery(
        {
            page: 1,
            limit: 8,
            searchString: query,
            allergens: allergens.length > 0 ? allergens : undefined,
            subcategoriesIds: subcategoriesIds,
            garnish: garnish,
            meat: meat,
        },
        { skip: !isSearch },
    );

    recipes = data?.data ?? recipes;
    if (isError) {
        dispatcher(
            setAppError({ value: Error.SERVER, message: 'Попробуйте поискать снова попозже' }),
        );
        dispatcher(setAppQuery(''));
        dispatcher(setRecepies([]));
        dispatcher(setIsSearch(false));
    }

    if (isSuccess) {
        if (recipes.length === 0) {
            dispatcher(setAppError({ value: Error.RECEPIES_NOT_FOUND }));
            dispatcher(setAppQuery(''));
        } else {
            dispatcher(setAppError({ value: Error.NONE }));
        }
        dispatcher(setRecepies(recipes));
        dispatcher(setIsSearch(false));
    }

    if (isGetCategoriesSuccess) {
        const subcategories = recipes.map(
            (recipe) =>
                categories!.find(
                    (category) => category._id === recipe.categoriesIds![0],
                )! as unknown as Subcategory,
        );
        const rootCategories = subcategories.map((subcategory) =>
            categories.find((category) => category._id === subcategory?.rootCategoryId),
        );

        recipes = recipes.map((recipe, i) => ({
            ...recipe,
            path: `/${rootCategories.at(i)?.category}/${subcategories.at(i)?.category}/${recipe._id}`,
        }));
    }

    return (
        <>
            <GridItem
                px={{ md: '30px' }}
                colSpan={{ base: 4, md: 8 }}
                display='block'
                colStart={{ base: 1, md: 2, lg: 3, xl: 3 }}
                colEnd={{ base: 5, md: 12, lg: 12, xl: 11 }}
            >
                <HeaderContainer title={title} subtitle={subtitle} />
            </GridItem>

            <GridItem
                colSpan={{ base: 4, md: 13 }}
                mt={{ base: '16px', lg: '24px' }}
                display='block'
                colStart={1}
                colEnd={{ lg: 13 }}
            >
                {recipes.length === 0 ? (
                    <VStack align='stretch' spacing='32px'>
                        {children}
                    </VStack>
                ) : (
                    <VStack spacing='12px'>
                        <RecipeCollection recipes={recipes} />
                    </VStack>
                )}
                <Box mt={{ base: '32px', lg: '40px' }}>
                    <SectionRelevantKitchen />
                </Box>
            </GridItem>
        </>
    );
}
