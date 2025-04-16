import { Grid, GridItem } from '@chakra-ui/react';
import { Outlet } from 'react-router';

import AsidePanel from '~/components/AsidePanel/AsidePanel';
import BottomMenu from '~/components/BottomMenu/BottomMenu';
import Header from '~/components/Header/Header';
import Menu from '~/components/Menu/Menu';

import { menuItems, profile } from './ConfigApp';

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
            <GridItem area='nav' hideBelow='lg'>
                <Menu menuItems={menuItems} />
            </GridItem>
            <GridItem
                area='main'
                px={{ base: '16px', md: '20px', lg: '0px' }}
                py={{ base: '16px', lg: '32px' }}
                mr={{ lg: '73px' }}
                ml={{ lg: '24px' }}
            >
                <Grid
                    templateColumns={{ base: 'repeat(4, 1fr)', md: 'repeat(12, 1fr)' }}
                    gap={{ base: '12px', md: '16px', lg: '24px' }}
                >
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
