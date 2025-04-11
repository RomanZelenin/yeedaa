import './App.css';

import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Avatar,
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button,
    Flex,
    Grid,
    GridItem,
    Hide,
    HStack,
    Image,
    Link as ChakraLink,
    LinkBox,
    LinkOverlay,
    ListItem,
    Show,
    Spacer,
    Stack,
    Text,
    UnorderedList,
    useBreakpoint,
    VStack,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router';

import { logos, menuItems, person } from './ConfigApp';
import MainPageContent from './MainPageContent';

export default function StartPage() {
    const breakpoint = useBreakpoint();
    const logo = breakpoint == 'base' || breakpoint == 'sm' ? logos.compact : logos.normal;

    const location = useLocation();
    return (
        <>
            <Hide above='lg'>
                <Grid
                    templateAreas={[
                        `"header"
                         "main"
                         "footer"`,
                    ]}
                    gridTemplateRows={['64px 1fr 84px', null, '80px 1fr 96px']}
                    gridTemplateColumns={['1fr']}
                    gap='0'
                >
                    <GridItem area='header'>
                        <Header logo={logo} person={person} />
                    </GridItem>
                    <GridItem px={['16px', null, '20px']} py='16px' area='main'>
                        <Grid
                            templateColumns={['repeat(4, 1fr)', null, 'repeat(12, 1fr)']}
                            gap={['12px', null, '16px']}
                        >
                            {location.pathname == '/' ? <MainPageContent /> : <Outlet />}
                        </Grid>
                    </GridItem>
                    <GridItem area='footer'>
                        <FooterMenu avatar={person.avatar} />
                    </GridItem>
                </Grid>
            </Hide>

            <Show above='lg'>
                <Grid
                    templateAreas={[
                        `"header header header"
                         "nav main aside"`,
                    ]}
                    gridTemplateRows={['80px 1fr']}
                    gridTemplateColumns={['256px 1fr 208px']}
                >
                    <GridItem area='header'>
                        <Header logo={logo} person={person} />
                    </GridItem>
                    <GridItem area='nav'>
                        <MenuPanel menuItems={menuItems} />
                    </GridItem>
                    <GridItem p={0} area='main' mr='73px' ml='24px' py='32px'>
                        <Grid templateColumns={['repeat(12, 1fr)']} gap={['24px']}>
                            {location.pathname == '/' ? <MainPageContent /> : <Outlet />}
                        </Grid>
                    </GridItem>
                    <GridItem area='aside'>
                        <AsidePanel bookmarksCount={185} personsCount={589} likesCount={587} />
                    </GridItem>
                </Grid>
            </Show>
        </>
    );
}

function Header({
    logo,
    person,
}: {
    logo: string;
    person: { avatar?: string; firstName: string; lastName: string; nickname: string };
}) {
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
    }, [location]);

    return (
        <>
            <Flex
                position='fixed'
                bg='#ffffd3'
                h={['64px', null, '80px']}
                w='100%'
                alignItems='center'
                px='16px'
                data-test-id='header'
                zIndex={1}
            >
                <Image src={logo} h='32px' />

                <Hide above='lg'>
                    <Spacer h='24px' alignSelf='center' />
                    <ActivityIndicators bookmarksCount={185} personsCount={589} likesCount={587} />
                    <Image src='./src/assets/icons/burger-menu.svg' boxSize='24px' m='12px' />
                </Hide>

                <Show above='lg'>
                    <Breadcrumb
                        separator='>'
                        ml='128px'
                        flex={1}
                        fontSize='16px'
                        lineHeight='150%'
                        fontWeight='400'
                    >
                        {breadcrumbItems}
                    </Breadcrumb>
                    <Box mr='46px'>
                        <CardAvatar person={person} />
                    </Box>
                </Show>
            </Flex>
        </>
    );
}

function ProfileNotification({
    bookmarksCount,
    personsCount,
    likesCount,
}: {
    bookmarksCount: number;
    personsCount: number;
    likesCount: number;
}) {
    const menuItems = [
        { icon: './src/assets/icons/bookmark.svg', count: bookmarksCount },
        { icon: './src/assets/icons/persons.svg', count: personsCount },
        { icon: './src/assets/icons/like.svg', count: likesCount },
    ];
    return (
        <VStack spacing='32px' px='8px' pt='16px'>
            {menuItems.map((it, idx) => (
                <Box key={idx}>
                    <ProfileNotificationButton src={it.icon} count={it.count} />
                </Box>
            ))}
        </VStack>
    );
}

function ProfileNotificationButton({ src, count }: { src: string; count: number }) {
    return (
        <Flex alignItems='center' columnGap={['8px']}>
            <Image src={src} boxSize={['16px']} />
            <Box
                as='span'
                fontSize={['16px']}
                lineHeight={['24px']}
                fontWeight='600'
                color='#2db100'
            >
                {count}
            </Box>
        </Flex>
    );
}

function ActivityIndicators({
    bookmarksCount,
    personsCount,
    likesCount,
}: {
    bookmarksCount: number;
    personsCount: number;
    likesCount: number;
}) {
    const menuItems = [
        { icon: './src/assets/icons/bookmark.svg', count: bookmarksCount },
        { icon: './src/assets/icons/persons.svg', count: personsCount },
        { icon: './src/assets/icons/like.svg', count: likesCount },
    ];
    return (
        <HStack spacing='0px' px='8px'>
            {menuItems.map((it, idx) => (
                <Box key={idx}>
                    <ActivityIndicatorButton src={it.icon} count={it.count} />
                </Box>
            ))}
        </HStack>
    );
}

function ActivityIndicatorButton({ src, count }: { src: string; count: number }) {
    return (
        <Flex px='8px' alignItems='center' columnGap={['6px']}>
            <Image src={src} boxSize={['12px']} />
            <Text fontSize={['12px']} lineHeight={['16px']} fontWeight='600' color='#2db100'>
                {count}
            </Text>
        </Flex>
    );
}

function MenuPanel({
    menuItems,
}: {
    menuItems: {
        title: string;
        path?: string;
        icon: string;
        submenu?: { title: string; path?: string }[];
    }[];
}) {
    const location = useLocation();
    const [selectedItem, setSelectedItem] = useState(() =>
        menuItems.findIndex((it) => it.path === location.pathname),
    );
    const [selectedSubmenuIdx, setSelectedSubmenuIdx] = useState(-1);
    const navigate = useNavigate();

    return (
        <Flex
            direction='column'
            pos='fixed'
            paddingTop='24px'
            width='256px'
            bottom={0}
            top={['64px', null, '80px']}
            boxShadow='0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.2)'
        >
            <Accordion
                index={selectedItem}
                flex={1}
                variant='custom'
                paddingStart='10px'
                paddingEnd='16px'
                overflowY='auto'
                mb='12px'
                sx={{
                    '&::-webkit-scrollbar': {
                        width: '8px',
                        borderRadius: '8px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#cecece',
                        borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: 'darkgray',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#f5f5f5',
                    },
                }}
            >
                {menuItems.map((menu, idx) => (
                    <AccordionItem key={idx} style={{ borderWidth: 0 }}>
                        {({ isExpanded }) => (
                            <>
                                <h2>
                                    <AccordionButton
                                        px='8px'
                                        py='12px'
                                        gap='8px'
                                        _expanded={{
                                            bg: '#EAFFC7',
                                            fontWeight: 700,
                                            lineHeight: '24px',
                                        }}
                                        data-test-id={
                                            menu.title === 'Веганская кухня' ? 'vegan-cuisine' : ''
                                        }
                                        onClick={() => {
                                            setSelectedItem(idx);
                                            setSelectedSubmenuIdx(
                                                selectedItem != idx ? -1 : selectedSubmenuIdx,
                                            );
                                            if (selectedItem != idx) navigate(menu.path ?? '/');
                                        }}
                                    >
                                        <Image src={menu.icon} boxSize='24px' />
                                        <Text flex='1' textAlign='left' fontSize='16px'>
                                            {menu.title}
                                        </Text>

                                        <Image
                                            src={
                                                !isExpanded
                                                    ? './src/assets/icons/down.svg'
                                                    : './src/assets/icons/up.svg'
                                            }
                                        />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel>
                                    <UnorderedList styleType='none' m={0}>
                                        {menu.submenu?.map((subItem, idx) => (
                                            <ListItem mb='12px'>
                                                <ChakraLink
                                                    my='6px'
                                                    display='flex'
                                                    onClick={() => {
                                                        setSelectedSubmenuIdx(idx);
                                                    }}
                                                    as={Link}
                                                    to={subItem?.path ?? `/`}
                                                    borderLeft={
                                                        typeof selectedSubmenuIdx === 'number' &&
                                                        selectedSubmenuIdx === idx
                                                            ? '8px solid #C4FF61'
                                                            : '1px solid #C4FF61'
                                                    }
                                                    marginLeft={
                                                        typeof selectedSubmenuIdx === 'number' &&
                                                        selectedSubmenuIdx === idx
                                                            ? '-8px'
                                                            : '-1px'
                                                    }
                                                >
                                                    <Text
                                                        ml='11px'
                                                        fontSize='16px'
                                                        lineHeight='24px'
                                                        fontWeight={
                                                            typeof selectedSubmenuIdx ===
                                                                'number' &&
                                                            selectedSubmenuIdx === idx
                                                                ? 700
                                                                : 400
                                                        }
                                                    >
                                                        {subItem.title}
                                                    </Text>
                                                </ChakraLink>
                                            </ListItem>
                                        ))}
                                    </UnorderedList>
                                </AccordionPanel>
                            </>
                        )}
                    </AccordionItem>
                ))}
            </Accordion>

            <Stack direction='column' fontSize='12px' px='24px' spacing='16px' mb='32px'>
                <Text color='rgba(0, 0, 0, 0.24)'>Версия программы 03.25</Text>
                <Text whiteSpace='pre-wrap' color='rgba(0, 0, 0, 0.64)'>{`Все права защищены,
ученический файл,
©Клевер Технолоджи, ${new Date().toLocaleDateString('ru-RU', { year: 'numeric' })}`}</Text>
                <Button
                    px={0}
                    variant='ghost'
                    justifyContent='start'
                    leftIcon={<Image src='./src/assets/icons/left.svg' />}
                >
                    Выйти
                </Button>
            </Stack>
        </Flex>
    );
}

function AsidePanel({
    bookmarksCount,
    personsCount,
    likesCount,
}: {
    bookmarksCount: number;
    personsCount: number;
    likesCount: number;
}) {
    return (
        <VStack pos='fixed' bottom={0} top={['64px', null, '80px']} justify='space-between'>
            <ProfileNotification
                bookmarksCount={bookmarksCount}
                personsCount={personsCount}
                likesCount={likesCount}
            />
            <LinkBox zIndex={1}>
                <LinkOverlay href='#'>
                    <Image src='./src/assets/icons/write-recepie.svg' />
                </LinkOverlay>
            </LinkBox>
        </VStack>
    );
}

function FooterMenu({ avatar }: { avatar: string }) {
    const menuItems = [
        { icon: './src/assets/icons/home.svg', title: 'Главная', selected: true },
        { icon: './src/assets/icons/search.svg', title: 'Поиск', selected: false },
        { icon: './src/assets/icons/write.svg', title: 'Записать', selected: false },
        { icon: avatar, title: 'Мой профиль', selected: false },
    ];

    return (
        <Flex
            zIndex={1}
            position='fixed'
            bg='#ffffd3'
            h={['84px', null, '96px']}
            bottom={0}
            w='100%'
            data-test-id='footer'
        >
            {menuItems.map((it, idx) => (
                <Box
                    key={idx}
                    as='button'
                    py='10px'
                    flex={1}
                    fontSize='12px'
                    fontWeight={it.selected ? '500' : '400'}
                    lineHeight='133%'
                    color={it.selected ? 'black' : 'rgba(0, 0, 0, 0.64)'}
                    background={
                        it.selected
                            ? 'radial-gradient(62.5% 62.5% at 48.89% 37.5%, rgba(196, 255, 97, 0.7) 0%, rgba(255, 255, 255, 0) 100%) #FFFFD3'
                            : 'none'
                    }
                >
                    <VStack spacing={0}>
                        <Box bgColor={it.selected ? 'black' : 'none'} borderRadius='100%'>
                            <Image
                                src={it.icon}
                                filter={it.selected ? 'invert(100%)' : 'none'}
                                boxSize='40px'
                            />
                        </Box>
                        <Box>{it.title}</Box>
                    </VStack>
                </Box>
            ))}
        </Flex>
    );
}

function CardAvatar({
    person,
}: {
    person: { avatar?: string; firstName: string; lastName: string; nickname: string };
}) {
    return (
        <Flex alignItems='center' px='24px'>
            <Avatar src={person.avatar} mr='12px' />
            <VStack spacing={0} alignItems='start'>
                <Box fontSize='18px' lineHeight='156%' fontWeight='500'>
                    {`${person.firstName} ${person.lastName}`}
                </Box>
                <Box fontSize='14px' lineHeight='143%' fontWeight='400' color='rgba(0, 0, 0, 0.64)'>
                    {person.nickname}
                </Box>
            </VStack>
        </Flex>
    );
}
