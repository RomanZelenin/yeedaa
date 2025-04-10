import { Box, Button, GridItem, HStack, Image, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router';

import {
    BlogCard,
    NewRecepieCard,
    VegeterianKitchenCard,
    VegeterianKitchenCompactCard,
} from './Cards';
import { MostPopularContent } from './MostPopularPageContent';

function SectionNewRecipes() {
    const recepies = [
        {
            category: 'Первые блюда',
            cover: './src/assets/soup-with-onions.png',
            badgeIcon: './src/assets/icons/лавровый-лист-96 1.svg',
            title: 'Солянка с грибами',
            description:
                'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
            bookmarksCount: 15,
            likesCount: 5,
            personsCount: 1,
        },
        {
            category: 'Веганские блюда',
            cover: 'src/assets/cutlets-mini.png',
            badgeIcon: './src/assets/icons/лавровый-лист-96 1.svg',
            title: 'Капустные котлеты',
            description:
                'Капустные котлеты по этому рецепту получаются необычайно пышными и  невероятно вкусными. Мягкий вкус и лёгкая пряная нотка наверняка помогут сделать эти чудесные котлеты из капусты одним из ваших любимых овощных  блюд.',
            bookmarksCount: 15,
        },
        {
            category: 'Десерты, выпечка',
            cover: 'src/assets/оладьи.png',
            badgeIcon: 'src/assets/icons/хлеб-и-скалка-96 1.svg',
            title: 'Оладьи на кефире "Пышные"',
            description:
                'Очень вкусные и нежные оладьи на кефире. Настоятельно рекомендую пышные кефирные оладьи на завтрак.',
            bookmarksCount: 15,
        },
        {
            category: 'Десерты, выпечка',
            cover: 'src/assets/оладьи.png',
            badgeIcon: 'src/assets/icons/хлеб-и-скалка-96 1.svg',
            title: 'Оладьи на кефире "Пышные"',
            description:
                'Очень вкусные и нежные оладьи на кефире. Настоятельно рекомендую пышные кефирные оладьи на завтрак.',
            bookmarksCount: 15,
        },
    ];

    return (
        <Box>
            <Text fontSize={['24px', null, null, '48px']} fontWeight='500' mb='12px'>
                Новые рецепты
            </Text>
            <HStack
                spacing={['12px', null, null, null, '24px']}
                align='stretch'
                overflowX='auto'
                padding='1pt'
            >
                {recepies.map((it, idx) => (
                    <Box key={idx}>
                        <NewRecepieCard
                            badgeText={it.category}
                            cover={it.cover}
                            badgeIcon={it.badgeIcon}
                            title={it.title}
                            description={it.description}
                            bookmarksCount={it.bookmarksCount}
                            likesCount={it.likesCount}
                            personsCount={it.personsCount}
                        />
                    </Box>
                ))}
            </HStack>
        </Box>
    );
}

function SectionMostPopular() {
    const mostPopularCards = [
        {
            avatar: './src/assets/kate-avatar.png',
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
            avatar: './src/assets/kate-avatar.png',
            recommendation: 'Елена Высоцкая рекомендует',
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
            avatar: './src/assets/kate-avatar.png',
            recommendation: 'Alex Cook рекомендует',
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
            avatar: './src/assets/kate-avatar.png',
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
    ];

    return (
        <VStack spacing='12px' align='stretch'>
            <HStack>
                <Text fontSize={['24px', null, null, '48px']} fontWeight='500' flex={1}>
                    Самое сочное
                </Text>
                <Button
                    as={Link}
                    to='/most_popular'
                    display={['none', null, null, 'inline-flex']}
                    bgColor='#C4FF61'
                    fontSize='16px'
                    color='black'
                    variant='ghost'
                    px='16px'
                    py='8px'
                    rightIcon={<Image src='./src/assets/icons/BsArrowRight.svg' />}
                    data-test-id='juiciest-link'
                >
                    Вся подборка
                </Button>
            </HStack>
            <MostPopularContent cards={mostPopularCards} />
            <Button
                display={['flex', null, null, 'none']}
                as={Link}
                to='/most_popular'
                bgColor='#C4FF61'
                alignSelf='center'
                fontSize='16px'
                color='black'
                variant='ghost'
                flex={1}
                px='16px'
                py='8px'
                rightIcon={<Image src='./src/assets/icons/BsArrowRight.svg' />}
                data-test-id='juiciest-link-mobile'
            >
                Вся подборка
            </Button>
        </VStack>
    );
}

function SectionCookingBlogs() {
    const blogs = [
        {
            person: {
                firstName: 'Елена',
                lastName: 'Высоцкая',
                nickname: '@elenapovar',
                avatar: 'src/assets/kate-avatar.png',
            },
            comment:
                'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        },
        {
            person: {
                firstName: 'Alex',
                lastName: 'Cook',
                nickname: '@funtasticooking',
                avatar: 'src/assets/kate-avatar.png',
            },
            comment:
                'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        },
        {
            person: {
                firstName: 'Екатерина',
                lastName: 'Константинопольская',
                nickname: '@bake_and_pie',
                avatar: 'src/assets/kate-avatar.png',
            },
            comment:
                'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        },
    ];

    return (
        <VStack bgColor='#C4FF61' borderRadius='16px' p='12px' spacing='12px' align='stretch'>
            <HStack>
                <Text
                    alignSelf='start'
                    fontSize={['24px', null, null, '30px', '36px']}
                    fontWeight='500'
                    flex={1}
                >
                    Кулинарные блоги
                </Text>
                <Button
                    display={['none', null, null, 'inline-flex']}
                    fontSize='16px'
                    color='black'
                    variant='ghost'
                    px='16px'
                    py='8px'
                    rightIcon={<Image src='./src/assets/icons/BsArrowRight.svg' />}
                >
                    Все авторы
                </Button>
            </HStack>
            <VStack>
                <SimpleGrid
                    columns={[1, null, 3]}
                    columnGap={['0px', null, '12px']}
                    rowGap={['12px']}
                >
                    {blogs.map((it, idx) => (
                        <Box key={idx}>
                            <BlogCard person={it.person} comment={it.comment} />
                        </Box>
                    ))}
                </SimpleGrid>
                <Button
                    display={['inline-flex', null, null, 'none']}
                    fontSize='16px'
                    color='black'
                    variant='ghost'
                    flex={1}
                    px='16px'
                    py='8px'
                    rightIcon={<Image src='./src/assets/icons/BsArrowRight.svg' />}
                >
                    Все авторы
                </Button>
            </VStack>
        </VStack>
    );
}

function LastSection({
    title,
    description,
    cards,
    compactCards,
}: {
    title: string;
    description: string;
    cards: {
        badgeText: string;
        badgeIcon: string;
        title: string;
        description: string;
        bookmarksCount?: number;
        likesCount?: number;
        personsCount?: number;
    }[];
    compactCards: { icon: string; title: string }[];
}) {
    return (
        <Box>
            <SimpleGrid
                columns={[1, null, null, 4, 4]}
                mb={['16px', null, null, '24px']}
                rowGap={['12px']}
            >
                <GridItem colSpan={[1, null, null, 1, 2]}>
                    <Text fontSize={['24px', null, null, '36px', '48px']} fontWeight='500'>
                        {title}
                    </Text>
                </GridItem>
                <GridItem colSpan={[1, null, null, 3, 2]}>
                    <Text
                        fontSize={['14px', null, null, '16px']}
                        color='rgba(0, 0, 0, 0.64)'
                        lineHeight={['20px', null, null, '24px']}
                        fontWeight='500'
                    >
                        {description}
                    </Text>
                </GridItem>
            </SimpleGrid>
            <SimpleGrid
                columns={[1, null, 3]}
                columnGap={['12px', null, null, '16px', '24px']}
                rowGap={['12px', null, null, '16px', '24px']}
            >
                {cards.map((it) => (
                    <VegeterianKitchenCard
                        badgeText={it.badgeText}
                        badgeIcon={it.badgeIcon}
                        title={it.title}
                        description={it.description}
                        likesCount={it.likesCount}
                        bookmarksCount={it.bookmarksCount}
                        personsCount={it.personsCount}
                    />
                ))}
                <VStack spacing={['12px']} align='stretch'>
                    {compactCards.map((it, idx) => (
                        <Box key={idx}>
                            <VegeterianKitchenCompactCard icon={it.icon} title={it.title} />
                        </Box>
                    ))}
                </VStack>
            </SimpleGrid>
        </Box>
    );
}

export { LastSection, SectionCookingBlogs, SectionMostPopular, SectionNewRecipes };
