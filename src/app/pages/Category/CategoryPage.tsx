import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';

import { RecipeCollection } from '~/common/components/RecipeCollection/RecipeCollection';
import { useGetCategoriesQuery, useGetRecipeByCategoryQuery } from '~/query/create-api';

import ContentContainer from '../common/Containers/ContentContainer';

export default function CategoryPage() {
    const { category: categoryId, subcategory: subcategoryId } = useParams();
    const navigate = useNavigate();

    const [tabIndex, setTabIndex] = useState(0);
    /*  const query = useAppSelector(querySelector);
    const allergens = useAppSelector(allergensSelector).filter((item) => item.selected === true); */

    const { data: categories, isSuccess, isError } = useGetCategoriesQuery();
    const category = categories?.find((it) => it.category === categoryId);

    useEffect(() => {
        setTabIndex(category?.subCategories?.findIndex((it) => it.category === subcategoryId) ?? 0);
    }, [category, subcategoryId]);

    if (isSuccess || isError) {
        if (!category || !category!.subCategories?.find((it) => it.category === subcategoryId)) {
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
                                    isActive={subcategory.category === subcategoryId}
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
    const {
        data: recipes,
        isLoading,
        isError,
        isSuccess,
    } = useGetRecipeByCategoryQuery({ limit: 10, id: subcategoryId }, { skip: !isActive });
    if (isLoading) {
        return <TabPanel p={0}>Loading...</TabPanel>;
    }
    if (isError) {
        return <TabPanel p={0}>Error loading</TabPanel>;
    }
    if (isSuccess) {
        return (
            <TabPanel p={0}>
                <VStack spacing='12px' px='0px'>
                    <Box px='0px' textAlign='start'>
                        <RecipeCollection
                            recipes={recipes!.data.map((recipe) => ({
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
