import { Grid, GridItem, Show } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Outlet, useLocation, useParams } from 'react-router';

import profile from '~/app/mocks/profile.json';
import { AsidePanel } from '~/common/components/AsidePanel/AsidePanel';
import { Header } from '~/common/components/Header/Header';
import { BottomMenu } from '~/common/components/Menu/BottomMenu';
import { SideMenu } from '~/common/components/Menu/SideMenu';
import { useResource } from '~/common/components/ResourceContext/ResourceContext';
import { recipesSelector, setAppBreadcrumb } from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

export default function App() {
    const { category, subcategory, id } = useParams();
    const location = useLocation();
    const { getString } = useResource();
    const dispatcher = useAppDispatch();
    const recepie = useAppSelector(recipesSelector);

    useEffect(() => {
        const breadcrumbs = [{ title: 'Главная', path: '/' }];
        if (category) {
            breadcrumbs.push({ title: `${getString(category!)}`, path: `/${category}` });
            if (subcategory) {
                breadcrumbs.push({
                    title: `${getString(subcategory!)}`,
                    path: `/${category}/${subcategory}`,
                });
                if (id) {
                    const title = recepie.find((recepie) => recepie?.id === id)!.title;
                    breadcrumbs.push({ title: `${title}`, path: `#` });
                }
            }
        } else {
            if (location.pathname.startsWith('/the-juiciest')) {
                breadcrumbs.push({ title: 'Самое сочное', path: '#' });
            }
        }
        dispatcher(setAppBreadcrumb(breadcrumbs));
    }, [location]);

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
