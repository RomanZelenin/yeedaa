import { Grid, GridItem, Show } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Outlet, useLocation, useParams } from 'react-router';

import profile from '~/app/mocks/profile.json';
import { AsidePanel } from '~/common/components/AsidePanel/AsidePanel';
import { Header } from '~/common/components/Header/Header';
import { BottomMenu } from '~/common/components/Menu/BottomMenu';
import { SideMenu } from '~/common/components/Menu/SideMenu';
import { useResource } from '~/common/components/ResourceContext/ResourceContext';
import { useGetCategoriesQuery, useGetRecipeByIdQuery } from '~/query/create-api';
import { setAppBreadcrumb } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

export default function App() {
    const { category: categoryId, subcategory: subcategoryId, id: recipeId } = useParams();
    const { getString } = useResource();
    const location = useLocation();
    const dispatcher = useAppDispatch();
    const { data: recipe } = useGetRecipeByIdQuery(recipeId!, { skip: !recipeId });

    const { data: categories } = useGetCategoriesQuery();
    const category = categories?.find((it) => it.category === categoryId);
    const subcategory = category?.subCategories?.find(
        (subcategory) => subcategory.category == subcategoryId,
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
        <Grid
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
        </Grid>
    );
}
