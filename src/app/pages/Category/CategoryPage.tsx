import { Box, Button, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { Recipe } from '~/app/mocks/types/type_defenitions';
import { RecipeCollection } from '~/common/components/RecipeCollection/RecipeCollection';
import { useResource } from '~/common/components/ResourceContext/ResourceContext';
import { useGetCategoryAndSubcategoryByName } from '~/common/hooks/useGetCategoryAndSubcategoryByName';
import { useGetRecipeByCategoryQuery } from '~/query/create-recipe-api';
import { setAppLoader } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

import ContentContainer from '../common/Containers/ContentContainer';
import { CategoryGuard } from './CategoryGuard';

export default function CategoryPage() {
    const navigate = useNavigate();
    const { category: categoryName, subcategory: subcategoryName } = useParams();
    const { category } = useGetCategoryAndSubcategoryByName({ categoryName, subcategoryName });
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
    const { getString } = useResource();
    const dispatch = useAppDispatch();
    const { category, subcategory } = useParams();
    const [page, setPage] = useState(1);
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [isLoadingNextPage, setNextLoading] = useState(false);
    const nextPage = () => {
        setNextLoading(true);
        setPage(page + 1);
    };
    const { data, isLoading, isError, isSuccess } = useGetRecipeByCategoryQuery(
        {
            page: 1,
            limit: 8 * page,
            id: subcategoryId,
        },
        { skip: !isActive },
    );

    useEffect(() => {
        if (isSuccess) {
            dispatch(setAppLoader(false));
            setRecipes(
                data.data.map((recipe) => ({
                    ...recipe,
                    path: `/${category}/${subcategory}/${recipe._id}`,
                })),
            );
            setNextLoading(false);
        }
        if (isLoading) {
            dispatch(setAppLoader(true));
        }
        if (isError) {
            dispatch(setAppLoader(false));
        }
    }, [data, isLoading, isError, isSuccess]);

    if (isSuccess) {
        return (
            <VStack spacing='12px' px='0px'>
                <Box px='0px' textAlign='start'>
                    <RecipeCollection recipes={recipes} />
                </Box>
                {1 < data!.meta.totalPages && (
                    <Button
                        data-test-id='load-more-button'
                        textAlign='center'
                        display='inline-flex'
                        onClick={() => nextPage()}
                        bgColor='lime.300'
                        alignSelf='center'
                        fontSize='16px'
                        color='black'
                        variant='ghost'
                        flex={1}
                        px='16px'
                        py='8px'
                    >
                        {isLoadingNextPage ? getString('load') : getString('load-more')}
                    </Button>
                )}
            </VStack>
        );
    }
}
