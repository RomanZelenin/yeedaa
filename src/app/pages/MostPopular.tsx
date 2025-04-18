import { Box, Button, SimpleGrid, VStack } from '@chakra-ui/react';
import { Link } from 'react-router';

import { MostPopularCard, MostPopularCardCompact } from '~/components/Cards/MostPopularCard';

import ContentContainer from './common/Containers/ContentContainer';
import LastSection from './common/Sections/LastSection';

export default function MostPopular() {
    const cards = [
        {
            subcategory: 'Вторые блюда',
            badgeIcon: '/src/assets/icons/pan.svg',
            title: 'Хачапури по-аджарски',
            description:
                'Давно ходил вокруг рецепта хачапури по-аджарски, не решался. Сегодня  попробовал - я в полном восторге! Тесто замечательное, интересный  процесс приготовления, а вкус - не передать, просто сказка!',
            likes: 1,
            bookmarks: 1,
        },
        {
            subcategory: 'Вторые блюда',
            badgeIcon: '/src/assets/icons/pan.svg',
            title: 'Жареные сосиски в тесте',
            description:
                'Сосиски, жареные в тесте, - звучит уже аппетитно! Тончайшая румяная  корочка, воздушное дрожжевое тесто, сочная сосиска... Мало кто может  устоять перед такими вот пирожочками, особенно домашнего приготовления.  Да, жареные в тесте сосиски',
            likes: 1,
            bookmarks: 2,
        },
    ];

    const compactCards = [
        { icon: '/src/assets/icons/pan.svg', title: 'Стейк для вегетарианцев' },
        { icon: '/src/assets/icons/pan.svg', title: 'Котлеты из гречки и фасоли' },
        { icon: '/src/assets/icons/pot.svg', title: 'Сырный суп с лапшой и брокколи' },
    ];

    const mostPopularCards = [
        {
            bookmarks: 258,
            likes: 342,
            title: 'Лапша с курицей и шафраном',
            description:
                'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
            subcategory: 'Вторые блюда',
            coverBig: '/src/assets/images/chiken_pasta.png',
            coverMini: '/src/assets/images/chiken_pasta_mini.png',
            badgeIcon: '/src/assets/icons/pan.svg',
        },
        {
            bookmarks: 124,
            likes: 324,
            title: 'Том-ям с капустой кимчи',
            description:
                'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
            subcategory: 'Национальные',
            coverBig: '/src/assets/images/tom-yam-kimchi.png',
            coverMini: '/src/assets/images/tom-yam-kimchi-mini.png',
            badgeIcon: '/src/assets/icons/international-food-96 1.svg',
        },
        {
            bookmarks: 1,
            likes: 2,
            title: 'Пряная ветчина по итальянски',
            description:
                'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
            subcategory: 'Вторые блюда',
            coverBig: '/src/assets/images/italian_ham.png',
            coverMini: '/src/assets/images/italian_ham_mini.png',
            badgeIcon: '/src/assets/icons/pan.svg',
        },
        {
            bookmarks: 85,
            likes: 152,
            title: 'Кнелли со спагетти',
            description:
                'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
            subcategory: 'Вторые блюда',
            coverBig: '/src/assets/images/spagetti-big.png',
            coverMini: '/src/assets/images/spagetti.png',
            badgeIcon: '/src/assets/icons/pan.svg',
        },
        {
            bookmarks: 120,
            likes: 180,
            title: 'Картошка, тушенная с болгарским перцем и фасолью в томатном соусе',
            description:
                'Картошка, тушенная с болгарским перцем, фасолью, морковью и луком, -  вариант сытного блюда на каждый день. Фасоль в данном случае заменяет  мясо, делая рагу сытным и питательным. Чтобы сократить время  приготовления, возьмём консервированную фасоль. Блюдо хоть и простое, но в полной мере наполнено ароматами и имеет выразительный вкус за счёт  добавления томатной пасты.',
            subcategory: 'Вторые блюда',
            coverBig: '/src/assets/images/potatoes-with-bell-pepper.png',
            coverMini: '/src/assets/images/potatoes-with-bell-pepper-mini.png',
            badgeIcon: '/src/assets/icons/pan.svg',
        },
        {
            bookmarks: 85,
            likes: 180,
            title: 'Картофельные рулетики с грибами',
            description:
                'Картошка, тушенная с болгарским перцем, фасолью, морковью и луком, -  вариант сытного блюда на каждый день. Фасоль в данном случае заменяет  мясо, делая рагу сытным и питательным. Чтобы сократить время  приготовления, возьмём консервированную фасоль. Блюдо хоть и простое, но в полной мере наполнено ароматами и имеет выразительный вкус за счёт  добавления томатной пасты.',
            subcategory: 'Детские блюда',
            coverBig: '/src/assets/images/potatoes-with-mushrooms.png',
            coverMini: '/src/assets/images/potatoes-with-mushrooms-mini.png',
            badgeIcon: '/src/assets/icons/child-tasty-96 1.svg',
        },
        {
            bookmarks: 85,
            likes: 152,
            title: 'Овощная лазанья из лаваша',
            description:
                'Большое, сытное блюдо для ценителей блюд без мяса! Такая лазанья  готовится с овощным соусом и соусом бешамель, а вместо листов для  лазаньи используется тонкий лаваш.',
            subcategory: 'Блюда на гриле',
            coverBig: '/src/assets/images/vegetable-lasagna.png',
            coverMini: '/src/assets/images/vegetable-lasagna-mini.png',
            badgeIcon: '/src/assets/icons/посудомоечная-машина-96 1.svg',
        },
        {
            bookmarks: 85,
            likes: 150,
            title: 'Тефтели из булгура и чечевицы, запечённые в томатном соусе',
            description:
                'Тефтели из булгура и чечевицы – яркие и питательные, отлично подходят  для постного и вегетарианского меню. Тефтели получаются нежными, а также сочными и ароматными благодаря использованию томатного соуса и душистых пряностей.',
            subcategory: 'Вторые блюда',
            coverBig: '/src/assets/images/meatballs.png',
            coverMini: '/src/assets/images/meatballs-mini.png',
            badgeIcon: '/src/assets/icons/pan.svg',
        },
    ];

    return (
        <ContentContainer title='Самое сочное'>
            <VStack spacing='32px'>
                <VStack spacing='12px'>
                    <MostPopularContent cards={mostPopularCards} />
                    <Button
                        display='inline-flex'
                        as={Link}
                        to='/#'
                        bgColor='lime.300'
                        alignSelf='center'
                        fontSize='16px'
                        color='black'
                        variant='ghost'
                        flex={1}
                        px='16px'
                        py='8px'
                    >
                        Загрузить ещё
                    </Button>
                </VStack>
                <LastSection
                    title='Десерты, выпечка'
                    description='Без них невозможно представить себе ни современную, ни традиционную кулинарию. Пироги и печенья, блины, пончики, вареники и, конечно, хлеб — рецепты изделий из теста многообразны и невероятно популярны.'
                    cards={cards}
                    compactCards={compactCards}
                />
            </VStack>
        </ContentContainer>
    );
}

function MostPopularContent({
    cards,
}: {
    cards: {
        avatar?: string;
        recommendation?: string;
        bookmarks?: number;
        likes?: number;
        persons?: number;
        title: string;
        description: string;
        subcategory: string;
        coverBig: string;
        coverMini: string;
        badgeIcon: string;
    }[];
}) {
    return (
        <>
            <VStack display={{ base: 'none', lg: 'flex' }} align='stretch'>
                <SimpleGrid
                    columns={{ base: 1, xl: 2 }}
                    columnGap={{ xl: '24px' }}
                    rowGap={{ lg: '16px', xl: '24px' }}
                >
                    {cards.map((it, idx) => (
                        <Box key={idx}>
                            <MostPopularCard
                                avatar={it.avatar}
                                recommendation={it.recommendation}
                                bookmarks={it.bookmarks}
                                likes={it.likes}
                                persons={it.persons}
                                title={it.title}
                                description={it.description}
                                subcategory={it.subcategory}
                                cover={it.coverBig}
                                badgeIcon={it.badgeIcon}
                            />
                        </Box>
                    ))}
                </SimpleGrid>
            </VStack>
            <VStack display={{ base: 'flex', lg: 'none' }} alignItems='stretch' px='16px'>
                <SimpleGrid
                    columns={{ base: 1, md: 2 }}
                    columnGap={{ base: '0px', md: '12px' }}
                    rowGap='12px'
                >
                    {cards.map((it, idx) => (
                        <Box key={idx}>
                            <MostPopularCardCompact
                                bookmarks={it.bookmarks}
                                likes={it.likes}
                                persons={it.persons}
                                title={it.title}
                                cover={it.coverMini}
                                subcategory={it.subcategory}
                                badgeIcon={it.badgeIcon}
                            />
                        </Box>
                    ))}
                </SimpleGrid>
            </VStack>
        </>
    );
}

export { MostPopularContent };
