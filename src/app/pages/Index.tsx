import { Grid, GridItem, Show } from '@chakra-ui/react';
import { Outlet } from 'react-router';

import { AsidePanel } from '~/components/AsidePanel/AsidePanel';
import { Header } from '~/components/Header/Header';
import { BottomMenu } from '~/components/Menu/BottomMenu';
import { SideMenu } from '~/components/Menu/SideMenu';

import { profile } from '../ConfigApp';

export default function Index() {
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
