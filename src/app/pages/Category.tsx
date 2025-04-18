import { Box, Button, VStack } from '@chakra-ui/react';
import { Link, useParams } from 'react-router';

import { menuItems } from '../ConfigApp';
import ContainerWithTabs from './common/Containers/ContainerWithTabs';
import LastSection from './common/Sections/LastSection';
import { ErrorView } from './ErrorView';
import { MostPopularContent } from './MostPopular';

export default function Category() {
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

    const compactCards = [
        { icon: '/src/assets/icons/pan.svg', title: 'Стейк для вегетарианцев' },
        { icon: '/src/assets/icons/pan.svg', title: 'Котлеты из гречки и фасоли' },
        { icon: '/src/assets/icons/pot.svg', title: 'Сырный суп с лапшой и брокколи' },
    ];

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

    const { category } = useParams();

    const tabData = menuItems
        .find((it) => it.path?.substring(1) === category)
        ?.submenu?.map((it) => ({
            label: it.title,
            content: (
                <>
                    <VStack spacing='12px' px='0px'>
                        <Box px='0px'>
                            <MostPopularContent
                                cards={mostPopularCards.filter(
                                    (card) => card.subcategory == it.title,
                                )}
                            />
                        </Box>
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
                    <LastSection
                        title='Десерты, выпечка'
                        description='Без них невозможно представить себе ни современную, ни традиционную кулинарию. Пироги и печенья, блины, пончики, вареники и, конечно, хлеб — рецепты изделий из теста многообразны и невероятно популярны.'
                        cards={cards}
                        compactCards={compactCards}
                    />
                </>
            ),
        }));

    return (
        <>
            {tabData ? (
                <ContainerWithTabs
                    title='Веганская кухня'
                    subtitle='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
                    tabData={tabData!}
                />
            ) : (
                <ErrorView />
            )}
        </>
    );
}
