import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';

import { RecipeCollection } from '~/common/components/RecipeCollection/RecipeCollection';
import { filterRecipesByTitleOrIngridient } from '~/common/utils/filterRecipesByTitle';
import { useGetCategoriesQuery, useGetRecipeByCategoryQuery } from '~/query/create-api';
import { querySelector } from '~/store/app-slice';
import { useAppSelector } from '~/store/hooks';

import ContentContainer from '../common/Containers/ContentContainer';

export default function CategoryPage() {
    const navigate = useNavigate();
    const { data: categories, isSuccess, isError } = useGetCategoriesQuery();
    const { category: categoryName, subcategory: subcategoryName } = useParams();
    const category = useMemo(
        () => categories?.find((it) => it.category === categoryName),
        [categories, categoryName],
    );

    const [tabIndex, setTabIndex] = useState(0);
    useEffect(
        () =>
            setTabIndex(
                category?.subCategories?.findIndex((it) => it.category === subcategoryName) ?? 0,
            ),
        [category, subcategoryName],
    );

    if (isSuccess || isError) {
        if (!category || !category.subCategories?.find((it) => it.category === subcategoryName)) {
            return <Navigate to='/not-found' replace />;
        }
    }

    return (
        <>
            <ContentContainer title={category?.title ?? ''} subtitle={category?.description ?? ''}>
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
                            {category?.subCategories?.map((subcategory) => (
                                <CategoryTabPanel
                                    key={subcategory._id}
                                    subcategoryId={subcategory._id}
                                    isActive={subcategory.category === subcategoryName}
                                />
                            ))}
                        </TabPanels>
                    </Tabs>
                </>
            </ContentContainer>
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
    const { category, subcategory } = useParams();
    const { data, isLoading, isError, isSuccess } = useGetRecipeByCategoryQuery(
        { limit: 10, id: subcategoryId },
        { skip: !isActive },
    );
    const query = useAppSelector(querySelector);
    if (isLoading) {
        return <TabPanel p={0}>Loading...</TabPanel>;
    }
    if (isError) {
        return <TabPanel p={0}>Error loading</TabPanel>;
    }
    if (isSuccess) {
        let recipes = data.data;

        if (query.length > 0) recipes = filterRecipesByTitleOrIngridient(recipes, query);

        return (
            <TabPanel p={0}>
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
            </TabPanel>
        );
    }
}
