import { Box, Button, Divider, VStack } from '@chakra-ui/react';
import { Link } from 'react-router';

import { menuItems } from '../ConfigApp';
import PageWithTabs from './common/PageWithTabs';
import { LastSection } from './common/Sections';
import { MostPopularContent } from './MostPopular';

export default function VegetarianKitchen() {
    const mostPopularCards = [
        {
            bookmarksCount: 258,
            likesCount: 342,
            title: 'Лапша с курицей и шафраном',
            description:
                'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
            badgeText: 'Вторые блюда',
            coverBig: './src/assets/chiken_pasta.png',
            coverMini: './src/assets/chiken_pasta_mini.png',
            badgeIcon: './src/assets/icons/pan.svg',
        },
        {
            bookmarksCount: 124,
            likesCount: 324,
            title: 'Том-ям с капустой кимчи',
            description:
                'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
            badgeText: 'Национальные',
            coverBig: './src/assets/tom-yam-kimchi.png',
            coverMini: './src/assets/tom-yam-kimchi-mini.png',
            badgeIcon: './src/assets/icons/international-food-96 1.svg',
        },
        {
            bookmarksCount: 1,
            likesCount: 2,
            title: 'Пряная ветчина по итальянски',
            description:
                'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
            badgeText: 'Вторые блюда',
            coverBig: './src/assets/italian_ham.png',
            coverMini: './src/assets/italian_ham_mini.png',
            badgeIcon: './src/assets/icons/pan.svg',
        },
        {
            bookmarksCount: 85,
            likesCount: 152,
            title: 'Кнелли со спагетти',
            description:
                'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
            badgeText: 'Вторые блюда',
            coverBig: './src/assets/spagetti-big.png',
            coverMini: './src/assets/spagetti.png',
            badgeIcon: './src/assets/icons/pan.svg',
        },
        {
            bookmarksCount: 120,
            likesCount: 180,
            title: 'Картошка, тушенная с болгарским перцем и фасолью в томатном соусе',
            description:
                'Картошка, тушенная с болгарским перцем, фасолью, морковью и луком, -  вариант сытного блюда на каждый день. Фасоль в данном случае заменяет  мясо, делая рагу сытным и питательным. Чтобы сократить время  приготовления, возьмём консервированную фасоль. Блюдо хоть и простое, но в полной мере наполнено ароматами и имеет выразительный вкус за счёт  добавления томатной пасты.',
            badgeText: 'Вторые блюда',
            coverBig: './src/assets/potatoes-with-bell-pepper.png',
            coverMini: './src/assets/potatoes-with-bell-pepper-mini.png',
            badgeIcon: './src/assets/icons/pan.svg',
        },
        {
            bookmarksCount: 85,
            likesCount: 180,
            title: 'Картофельные рулетики с грибами',
            description:
                'Картошка, тушенная с болгарским перцем, фасолью, морковью и луком, -  вариант сытного блюда на каждый день. Фасоль в данном случае заменяет  мясо, делая рагу сытным и питательным. Чтобы сократить время  приготовления, возьмём консервированную фасоль. Блюдо хоть и простое, но в полной мере наполнено ароматами и имеет выразительный вкус за счёт  добавления томатной пасты.',
            badgeText: 'Детские блюда',
            coverBig: './src/assets/potatoes-with-mushrooms.png',
            coverMini: './src/assets/potatoes-with-mushrooms-mini.png',
            badgeIcon: './src/assets/icons/child-tasty-96 1.svg',
        },
        {
            bookmarksCount: 85,
            likesCount: 152,
            title: 'Овощная лазанья из лаваша',
            description:
                'Большое, сытное блюдо для ценителей блюд без мяса! Такая лазанья  готовится с овощным соусом и соусом бешамель, а вместо листов для  лазаньи используется тонкий лаваш.',
            badgeText: 'Блюда на гриле',
            coverBig: './src/assets/vegetable-lasagna.png',
            coverMini: './src/assets/vegetable-lasagna-mini.png',
            badgeIcon: './src/assets/icons/посудомоечная-машина-96 1.svg',
        },
        {
            bookmarksCount: 85,
            likesCount: 150,
            title: 'Тефтели из булгура и чечевицы, запечённые в томатном соусе',
            description:
                'Тефтели из булгура и чечевицы – яркие и питательные, отлично подходят  для постного и вегетарианского меню. Тефтели получаются нежными, а также сочными и ароматными благодаря использованию томатного соуса и душистых пряностей.',
            badgeText: 'Вторые блюда',
            coverBig: './src/assets/meatballs.png',
            coverMini: './src/assets/meatballs-mini.png',
            badgeIcon: './src/assets/icons/pan.svg',
        },
    ];

    const compactCards = [
        { icon: './src/assets/icons/pan.svg', title: 'Стейк для вегетарианцев' },
        { icon: './src/assets/icons/pan.svg', title: 'Котлеты из гречки и фасоли' },
        { icon: './src/assets/icons/pot.svg', title: 'Сырный суп с лапшой и брокколи' },
    ];

    const cards = [
        {
            badgeText: 'Вторые блюда',
            badgeIcon: './src/assets/icons/pan.svg',
            title: 'Хачапури по-аджарски',
            description:
                'Давно ходил вокруг рецепта хачапури по-аджарски, не решался. Сегодня  попробовал - я в полном восторге! Тесто замечательное, интересный  процесс приготовления, а вкус - не передать, просто сказка!',
            likesCount: 1,
            bookmarksCount: 1,
        },
        {
            badgeText: 'Вторые блюда',
            badgeIcon: './src/assets/icons/pan.svg',
            title: 'Жареные сосиски в тесте',
            description:
                'Сосиски, жареные в тесте, - звучит уже аппетитно! Тончайшая румяная  корочка, воздушное дрожжевое тесто, сочная сосиска... Мало кто может  устоять перед такими вот пирожочками, особенно домашнего приготовления.  Да, жареные в тесте сосиски',
            likesCount: 1,
            bookmarksCount: 2,
        },
    ];

    const tabData = menuItems
        .find((it) => it.title === 'Веганская кухня')
        ?.submenu?.map((it) => {
            if (it.title === 'Вторые блюда') {
                return {
                    label: it.title,
                    content: (
                        <>
                            <VStack spacing='12px'>
                                <MostPopularContent cards={mostPopularCards} />
                                <Button
                                    display={['inline-flex']}
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
                            <Box>
                                <Divider mb={[0, null, null, '24px']} />
                                <LastSection
                                    title='Десерты, выпечка'
                                    description='Без них невозможно представить себе ни современную, ни традиционную кулинарию. Пироги и печенья, блины, пончики, вареники и, конечно, хлеб — рецепты изделий из теста многообразны и невероятно популярны.'
                                    cards={cards}
                                    compactCards={compactCards}
                                />
                            </Box>
                        </>
                    ),
                };
            }
            return { label: it.title };
        });

    return (
        <PageWithTabs
            title='Веганская кухня'
            subtitle='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
            tabData={tabData!}
        />
    );
}
