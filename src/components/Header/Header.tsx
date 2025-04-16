import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Flex,
    Hide,
    IconButton,
    Show,
    Spacer,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router';

import { BurgerIcon } from '../Icons/BurgerIcon';
import ActivityIndicators from './ActivityIndicators';
import Logo from './Logo';
import ProfileInfo, { Profile } from './ProfileInfo';

export default function Header({ profile }: { profile: Profile }) {
    const location = useLocation();
    const { category } = useParams();

    const breadcrumbItems = useMemo(() => {
        const fullPath = [{ title: 'Главная', path: '/' }];
        const path: string | undefined = location.pathname
            .split('/')
            .filter((it) => it.trim().length > 0)[0];

        switch (path) {
            case 'most_popular':
                fullPath.push({ title: 'Самое сочное', path: '/most_popular' });
                break;
            case 'vegan-cuisine':
                fullPath.push({ title: 'Веганская кухня', path: '/vegan-cuisine' });
                if (typeof category !== 'undefined') {
                    fullPath.push({ title: category, path: `#` });
                }
                break;
        }

        const fullPathItems = fullPath.map((it, idx) => (
            <BreadcrumbItem key={idx}>
                <BreadcrumbLink
                    href={it.path}
                    color={idx != fullPath.length - 1 ? 'rgba(0, 0, 0, 0.64)' : 'black'}
                >
                    {it.title}
                </BreadcrumbLink>
            </BreadcrumbItem>
        ));

        return fullPathItems;
    }, [location, category]);

    return (
        <>
            <Flex
                position='fixed'
                bg='lime.50'
                h={{ base: '64px', md: '80px' }}
                w='100%'
                alignItems='center'
                px='16px'
                data-test-id='header'
                zIndex={1}
            >
                <Logo />

                <Hide above='lg'>
                    <Spacer alignSelf='center' />
                    <ActivityIndicators
                        bookmarks={profile.activity.bookmarks}
                        persons={profile.activity.persons}
                        likes={profile.activity.likes}
                    />
                    <IconButton
                        aria-label='Open burger menu'
                        icon={<BurgerIcon boxSize='24px' />}
                        variant='ghost'
                        boxSize='48px'
                    />
                </Hide>

                <Show above='lg'>
                    <Breadcrumb separator='>' flex={1} fontStyle='breadcrumb' ml='127px'>
                        {breadcrumbItems}
                    </Breadcrumb>
                    <Box mr='40px'>
                        <ProfileInfo profile={profile} />
                    </Box>
                </Show>
            </Flex>
        </>
    );
}
