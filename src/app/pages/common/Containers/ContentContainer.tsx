import { Box, GridItem, VStack } from '@chakra-ui/react';
import { JSX } from '@emotion/react/jsx-runtime';
import { useEffect } from 'react';
import { useParams } from 'react-router';

import { filterSelector } from '~/app/features/filters/filtersSlice';
import { filterRecipesByTitleOrIngridient } from '~/common/utils/filterRecipesByTitle';
import { querySelector, recipesSelector, setRecepies } from '~/store/app-slice';
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
    const dispatcher = useAppDispatch();

    const filter = useAppSelector(filterSelector);
    let recipes = useAppSelector(recipesSelector);
    const query = useAppSelector(querySelector);

    const { category } = useParams();

    useEffect(() => {
        if (filter.allergens.filter((it) => it.selected).length > 0) {
            recipes = recipes.filter(
                (recepie) =>
                    !recepie.ingredients
                        .map((it) => it.title)
                        .some((ingridient) =>
                            filter.allergens
                                .filter((it) => it.selected)
                                .map((it) => it.title)
                                .some(
                                    (allergen) =>
                                        allergen.match(new RegExp(ingridient, 'ig')) !== null,
                                ),
                        ),
            );
        }

        if (category) {
            recipes = recipes.filter((recepie) => recepie.category.includes(category!));
        } else if (filter.categories.filter((it) => it.selected).length > 0) {
            recipes = recipes.filter((recepie) =>
                recepie.category.some((it) =>
                    filter.categories
                        .filter((it) => it.selected)
                        .map((it) => it.title)
                        .includes(it),
                ),
            );
        }

        /* if (filter.meat.filter((it) => it.selected).length > 0) {
            recipes = recipes.filter((recepie) =>
                recepie.meat ? globalFilter.meat.includes(recepie.meat) : false,
            );
        }

        if (filter.side.filter((it) => it.selected).length > 0) {
            recipes = recipes.filter((recepie) =>
                recepie.side ? globalFilter.side_dish.includes(recepie.side) : false,
            );
        }  */

        if (query.length > 0) {
            recipes = filterRecipesByTitleOrIngridient(recipes, query);
            /*   if (recipes.length === 0) {
                  dispatcher(setAppError(ERR_RECEPIES_NOT_FOUND));
              } else {
                  dispatcher(setAppError(null));
              } */
        }

        dispatcher(setRecepies(recipes));
    }, [
        filter.allergens.filter((it) => it.selected).length,
        filter.categories.filter((it) => it.selected).length,
        filter.meat.filter((it) => it.selected).length,
        filter.side.filter((it) => it.selected).length,
        query.length,
    ]);

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
                <VStack align='stretch' spacing='32px'>
                    {children}
                </VStack>
                {/*  {error !== ERR_RECEPIES_NOT_FOUND ? (
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
                )} */}
                <Box mt={{ base: '32px', lg: '40px' }}>
                    <SectionRelevantKitchen />
                </Box>
            </GridItem>
        </>
    );
}
