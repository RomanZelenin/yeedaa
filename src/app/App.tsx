import { Box, Center, Grid, GridItem, Show, Spinner } from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';
import { Outlet, useLocation, useParams } from 'react-router';

import profile from '~/app/mocks/profile.json';
import { ErrorAlert } from '~/common/components/Alert/ErrorAlert';
import { AsidePanel } from '~/common/components/AsidePanel/AsidePanel';
import { Header } from '~/common/components/Header/Header';
import { BottomMenu } from '~/common/components/Menu/BottomMenu';
import { SideMenu } from '~/common/components/Menu/SideMenu';
import { useResource } from '~/common/components/ResourceContext/ResourceContext';
import { useGetCategoriesQuery, useGetRecipeByIdQuery } from '~/query/create-api';
import { ERR_SERVER, errorSelector, loadingSelector, setAppBreadcrumb } from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

export default function App() {
    const { category: categoryName, subcategory: subcategoryName, id: recipeId } = useParams();
    const { data: recipe } = useGetRecipeByIdQuery(recipeId!, { skip: !recipeId });
    const isLoading = useAppSelector(loadingSelector);
    const error = useAppSelector(errorSelector);
    const { getString } = useResource();
    const dispatcher = useAppDispatch();
    const location = useLocation();

    const { data: categories } = useGetCategoriesQuery();
    const category = useMemo(
        () => categories?.find((it) => it.category === categoryName),
        [categories, categoryName],
    );
    const subcategory = useMemo(
        () =>
            category?.subCategories?.find((subcategory) => subcategory.category == subcategoryName),
        [category, subcategoryName],
    );

    useEffect(() => {
        const breadcrumbs = [{ title: getString('home'), path: '/' }];
        if (category) {
            breadcrumbs.push({
                title: `${category.title}`,
                path: `/${category.category}/${category.subCategories?.[0].category}`,
            });
            if (subcategory) {
                breadcrumbs.push({
                    title: `${subcategory.title}`,
                    path: `/${category.category}/${subcategory.category}`,
                });
                if (recipeId && recipe) {
                    breadcrumbs.push({
                        title: `${recipe.title}`,
                        path: `/${category.category}/${subcategory.category}/${recipeId}#`,
                    });
                }
            }
        } else {
            if (location.pathname.startsWith('/the-juiciest')) {
                breadcrumbs.push({ title: getString('juiciest'), path: '/the-juiciest' });
                if (recipeId && recipe) {
                    breadcrumbs.push({
                        title: `${recipe.title}`,
                        path: `/the-juiciest/${recipeId}#`,
                    });
                }
            }
        }
        dispatcher(setAppBreadcrumb(breadcrumbs));
    }, [category, subcategory, recipe, recipeId]);

    return (
        <>
            <Grid
                filter={isLoading ? 'blur(2px)' : 'none'}
                templateAreas={{
                    base: `"header"
                            "main"
                            "footer"`,
                    lg: `"header header header"
                         "nav main aside"`,
                }}
                gridTemplateRows={{ base: '64px 1fr 84px', md: '80px 1fr 96px', lg: '80px 1fr' }}
                gridTemplateColumns={{ base: '1fr', lg: '256px 1fr 208px' }}
            >
                <GridItem area='header'>
                    <Header profile={profile} />
                </GridItem>
                <Show above='lg'>
                    <GridItem area='nav' data-test-id='nav'>
                        <SideMenu />
                    </GridItem>
                </Show>
                <GridItem
                    area='main'
                    px='0px'
                    py={{ base: '16px', lg: '32px' }}
                    mr={{ lg: '73px' }}
                    ml={{ lg: '24px' }}
                >
                    <Grid templateColumns={{ base: 'repeat(4, 1fr)', md: 'repeat(12, 1fr)' }}>
                        <Outlet />
                    </Grid>
                </GridItem>
                <GridItem area='aside' hideBelow='lg'>
                    <AsidePanel
                        bookmarks={profile.activity.bookmarks}
                        persons={profile.activity.persons}
                        likes={profile.activity.likes}
                    />
                </GridItem>
                <GridItem area='footer' hideFrom='lg'>
                    <BottomMenu avatar={profile.avatar} />
                </GridItem>
                {error === ERR_SERVER ? (
                    <ErrorAlert message='Попробуйте поискать снова попозже' />
                ) : (
                    <></>
                )}
            </Grid>
            <Box
                display={isLoading ? 'flex' : 'none'}
                position='fixed'
                top={0}
                left={0}
                width='100%'
                height='100%'
                zIndex={100}
            >
                <Center
                    position='fixed'
                    width='206px'
                    top='50%'
                    left='50%'
                    transform='translate(-50%, -50%)'
                    data-test-id=''
                    boxSize='206px'
                    bgGradient='radial(30% 30% at 50% 50%, rgba(196, 255, 97, 0.7) 0%, rgba(255, 255, 255, 0) 100%) lime.50'
                >
                    <Spinner
                        data-test-id={isLoading ? 'app-loader' : ''}
                        size='lg'
                        boxSize='37px'
                        minW={0}
                    />
                </Center>
            </Box>
        </>
    );
}
