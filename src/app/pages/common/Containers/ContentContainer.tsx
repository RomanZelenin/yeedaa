import { Box, GridItem, VStack } from '@chakra-ui/react';
import { JSX } from '@emotion/react/jsx-runtime';
import { useMemo } from 'react';

import { filterSelector } from '~/app/features/filters/filtersSlice';
import { RecipeCollection } from '~/common/components/RecipeCollection/RecipeCollection';
import { useMapRecipesToCategoryPaths } from '~/common/hooks/useMapRecipesToCategoryPaths';
import { joinSelected } from '~/common/utils/joinSelected';
import { useGetRecipeQuery } from '~/query/create-api';
import {
    Error,
    isSearchSelector,
    querySelector,
    recipesSelector,
    removeNotification,
    setAppQuery,
    setIsSearch,
    setNotification,
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
    const dispatch = useAppDispatch();

    const { _subcategoriesIds, allergens, _garnish, _meat } = useMemo(
        () => ({
            subcategoriesIds: joinSelected(filter.categories),
            allergens: joinSelected(filter.allergens),
            garnish: joinSelected(filter.side),
            meat: joinSelected(filter.meat),
        }),
        [filter.allergens, filter.side, filter.meat, filter.categories],
    );

    const { data, isError, isSuccess } = useGetRecipeQuery(
        {
            page: 1,
            limit: 8,
            searchString: query,
            allergens: allergens.length > 0 ? allergens : undefined,
            subcategoriesIds: undefined,
            garnish: undefined,
            meat: undefined,
        },
        { skip: !isSearch },
    );

    if (isError) {
        dispatch(
            setNotification({
                _id: crypto.randomUUID(),
                title: Error.SERVER,
                message: 'Попробуйте поискать снова попозже',
                type: 'error',
            }),
        );
        dispatch(setAppQuery(''));
        dispatch(setRecepies([]));
        dispatch(setIsSearch(false));
    }

    if (isSuccess) {
        recipes = data.data;
        if (recipes.length === 0) {
            dispatch(
                setNotification({
                    _id: crypto.randomUUID(),
                    title: Error.RECEPIES_NOT_FOUND,
                    type: 'error',
                }),
            );
            dispatch(setAppQuery(''));
        } else {
            dispatch(removeNotification());
        }
        dispatch(setRecepies(recipes));
        dispatch(setIsSearch(false));
    }

    recipes = useMapRecipesToCategoryPaths(recipes);

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
