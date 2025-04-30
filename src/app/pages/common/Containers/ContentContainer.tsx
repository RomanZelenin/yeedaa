import { Box, Button, GridItem, VStack } from '@chakra-ui/react';
import { JSX } from '@emotion/react/jsx-runtime';
import { Link } from 'react-router';

import { RecipeCollection } from '~/common/components/RecipeCollection/RecipeCollection';
import { useResource } from '~/common/components/ResourceContext/ResourceContext';
import { filterRecipesByTitleOrIngridient } from '~/common/utils/filterRecipesByTitle';
import {
    ERR_RECEPIES_NOT_FOUND,
    errorSelector,
    globalFilterSelector,
    isFilteredSelector,
    querySelector,
    recipesSelector,
    setAppError,
} from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

import SectionRandomCategory from '../../Home/Sections/SectionRandomCategory';
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
    const dispatcher = useAppDispatch();
    const error = useAppSelector(errorSelector);
    const isGlobalFiltered = useAppSelector(isFilteredSelector);
    const globalFilter = useAppSelector(globalFilterSelector);
    const { getString } = useResource();

    let recipes = useAppSelector(recipesSelector);

    if (globalFilter.allergens.length > 0) {
        recipes = recipes.filter(
            (recepie) =>
                !recepie.ingredients
                    .map((it) => it.title)
                    .some((it) =>
                        globalFilter.allergens.map((it) => it.toLocaleLowerCase()).includes(it),
                    ),
        );
    }
    if (globalFilter.categories.length > 0) {
        recipes = recipes.filter((recepie) =>
            recepie.category.some((it) => globalFilter.categories.includes(it)),
        );
    }
    if (globalFilter.meat.length > 0) {
        recipes = recipes.filter((recepie) =>
            recepie.meat ? globalFilter.meat.includes(recepie.meat) : false,
        );
    }
    if (globalFilter.side_dish.length > 0) {
        recipes = recipes.filter((recepie) =>
            recepie.side ? globalFilter.side_dish.includes(recepie.side) : false,
        );
    }

    const query = useAppSelector(querySelector);
    if (query.length > 0) {
        recipes = filterRecipesByTitleOrIngridient(recipes, query);
        if (recipes.length === 0) {
            dispatcher(setAppError(ERR_RECEPIES_NOT_FOUND));
        } else {
            dispatcher(setAppError(null));
        }
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
                {!isGlobalFiltered ? (
                    <VStack align='stretch' spacing='32px'>
                        {children}
                    </VStack>
                ) : (
                    <>
                        <VStack spacing='12px'>
                            <RecipeCollection recipes={recipes} />
                        </VStack>
                    </>
                )}
                {error !== ERR_RECEPIES_NOT_FOUND ? (
                    <VStack mt='12px'>
                        <Button
                            textAlign='center'
                            display='inline-flex'
                            as={Link}
                            to='#'
                            bgColor='lime.300'
                            alignSelf='center'
                            fontSize='16px'
                            color='black'
                            variant='ghost'
                            flex={1}
                            px='16px'
                            py='8px'
                        >
                            {getString('load-more')}
                        </Button>
                    </VStack>
                ) : (
                    <></>
                )}
                <Box mt={{ base: '32px', lg: '40px' }}>
                    <SectionRandomCategory />
                </Box>
            </GridItem>
        </>
    );
}
