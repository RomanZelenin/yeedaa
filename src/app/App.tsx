import { Grid, GridItem, Show } from '@chakra-ui/react';
import { Outlet } from 'react-router';

import profile from '~/app/mocks/profile.json';
import { ErrorAlert } from '~/common/components/Alert/ErrorAlert';
import { AsidePanel } from '~/common/components/AsidePanel/AsidePanel';
import { Header } from '~/common/components/Header/Header';
import { AppLoader } from '~/common/components/Loader/AppLoader';
import { BottomMenu } from '~/common/components/Menu/BottomMenu';
import { SideMenu } from '~/common/components/Menu/SideMenu';
import { Error, errorSelector, loadingSelector } from '~/store/app-slice';
import { useAppSelector } from '~/store/hooks';

export default function App() {
    const isLoading = useAppSelector(loadingSelector);
    const error = useAppSelector(errorSelector);

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
                {error.value === Error.SERVER && <ErrorAlert message={error.message ?? ''} />}
            </Grid>
            <AppLoader isLoading={isLoading} />
        </>
    );
}
