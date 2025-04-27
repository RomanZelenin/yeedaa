import { Box, Button, GridItem, VStack } from '@chakra-ui/react';
import { JSX } from '@emotion/react/jsx-runtime';
import { useLocation, useParams } from 'react-router';
import { Link } from 'react-router';

import { filterRecipesByAllergens } from '~/app/Utils/filterRecipesByAllergens';
import { filterRecipesByTitleOrIngridient } from '~/app/Utils/filterRecipesByTitle';
import { RecipeCollection } from '~/components/RecipeCollection/RecipeCollection';
import { useResource } from '~/components/ResourceContext/ResourceContext';
import {
    allergensSelector,
    globalFilterSelector,
    isFilteredSelector,
    querySelector,
    recipesSelector,
} from '~/store/app-slice';
import { useAppSelector } from '~/store/hooks';

import SectionRandomCategory from '../Sections/SectionRandomCategory';
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
    const isGlobalFiltered = useAppSelector(isFilteredSelector);
    const globalFilter = useAppSelector(globalFilterSelector);
    const query = useAppSelector(querySelector);
    const location = useLocation();
    const { category, subcategory } = useParams();
    const { getString } = useResource();

    let recipes = useAppSelector(recipesSelector);
    const allergens = useAppSelector(allergensSelector).filter((item) => item.selected === true);

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
    if (query.length > 0) {
        recipes = filterRecipesByTitleOrIngridient(recipes, query);

        if (location.pathname.startsWith('/the-juiciest')) {
            recipes = [...recipes].sort((a, b) => b.likes - a.likes);
        }
    }
    if (category) {
        recipes = recipes.filter((recepie) => recepie.category.includes(category!));
        if (subcategory) {
            recipes = recipes.filter((recepie) => recepie.subcategory.includes(subcategory!));
        }
    }
    if (allergens.length > 0) {
        recipes = filterRecipesByAllergens(
            recipes,
            allergens.map((it) => it.title),
        );
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
                {!isGlobalFiltered && query.length == 0 && allergens.length == 0 ? (
                    <VStack align='stretch' spacing='32px'>
                        {children}
                    </VStack>
                ) : (
                    <>
                        <VStack spacing='12px'>
                            <RecipeCollection recipes={recipes} />
                            <Button
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
                    </>
                )}
                <Box mt={{ base: '32px', lg: '40px' }}>
                    <SectionRandomCategory />
                </Box>
            </GridItem>
        </>
    );
}
