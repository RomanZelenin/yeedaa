import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { filterSelector } from '~/app/features/filters/filtersSlice';
import { RecipeCollection } from '~/common/components/RecipeCollection/RecipeCollection';
import { useCurrentCategory } from '~/common/hooks/useCurrentCategory';
import { useGetRecipeByCategoryQuery } from '~/query/create-api';
import { querySelector, setAppLoader } from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

import ContentContainer from '../common/Containers/ContentContainer';
import { CategoryGuard } from './CategoryGuard';

export default function CategoryPage() {
    const navigate = useNavigate();
    const { category: categoryName, subcategory: subcategoryName } = useParams();

    const { category } = useCurrentCategory({ categoryName, subcategoryName });

    const [tabIndex, setTabIndex] = useState(0);
    useEffect(
        () =>
            setTabIndex(
                category?.subCategories?.findIndex((it) => it.category === subcategoryName) ?? 0,
            ),
        [category, subcategoryName],
    );
    return (
        <>
            <CategoryGuard category={category} subcategoryName={subcategoryName}>
                <ContentContainer
                    title={category?.title ?? ''}
                    subtitle={category?.description ?? ''}
                >
                    <>
                        <Tabs
                            lazyBehavior='keepMounted'
                            align='center'
                            isLazy
                            index={tabIndex}
                            onChange={(i) =>
                                navigate(
                                    `/${category?.category}/${category?.subCategories![i].category}`,
                                )
                            }
                        >
                            <TabList
                                overflowX={{ base: 'scroll', lg: 'unset' }}
                                flexWrap={{ base: 'wrap' }}
                            >
                                {category?.subCategories?.map((it, i) => (
                                    <Tab
                                        key={i}
                                        color='lime.800'
                                        data-test-id={`tab-${it.category}-${i}`}
                                    >
                                        {it.title}
                                    </Tab>
                                ))}
                            </TabList>

                            <TabPanels mt='12px'>
                                {category?.subCategories?.map((subcategory, i) => (
                                    <TabPanel p={0} key={i}>
                                        <CategoryTabPanel
                                            key={subcategory._id}
                                            subcategoryId={subcategory._id}
                                            isActive={subcategory.category === subcategoryName}
                                        />
                                    </TabPanel>
                                ))}
                            </TabPanels>
                        </Tabs>
                    </>
                </ContentContainer>
            </CategoryGuard>
        </>
    );
}

function CategoryTabPanel({
    subcategoryId,
    isActive,
}: {
    subcategoryId: string;
    isActive: boolean;
}) {
    const dispatch = useAppDispatch();
    const { category, subcategory } = useParams();
    const filter = useAppSelector(filterSelector);
    const countSelectedAllergens = useMemo(
        () => filter.allergens.filter((it) => it.selected).length,
        [filter],
    );
    const query = useAppSelector(querySelector);
    const { data, isLoading, isError, isSuccess } = useGetRecipeByCategoryQuery(
        {
            limit: 10,
            id: subcategoryId,
            allergens:
                countSelectedAllergens > 0
                    ? filter.allergens
                          .filter((allergen) => allergen.selected)
                          .map((allergen) => allergen.title)
                          .join(',')
                    : undefined,
            searchString: query.length > 0 ? query : undefined,
        },
        { skip: !isActive },
    );

    useEffect(() => {
        if (isLoading) {
            dispatch(setAppLoader(true));
        }
        if (isError) {
            dispatch(setAppLoader(false));
        }
        if (isSuccess) {
            dispatch(setAppLoader(false));
        }
    }, [isLoading, isError, isSuccess]);

    if (isLoading || isError) {
        return null;
    }

    if (isSuccess) {
        const recipes = data.data;
        return (
            <VStack spacing='12px' px='0px'>
                <Box px='0px' textAlign='start'>
                    <RecipeCollection
                        recipes={recipes.map((recipe) => ({
                            ...recipe,
                            path: `/${category}/${subcategory}/${recipe._id}`,
                        }))}
                    />
                </Box>
            </VStack>
        );
    }
}
