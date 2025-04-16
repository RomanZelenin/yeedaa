import { Box, HStack, Text } from '@chakra-ui/react';

import NewRecepieCard from '~/components/Cards/NewRecepieCard';

export default function SectionNewRecipes() {
    const recepies = [
        {
            category: 'Первые блюда',
            cover: '/src/assets/images/soup-with-onions.png',
            badgeIcon: '/src/assets/icons/лавровый-лист-96 1.svg',
            title: 'Солянка с грибами',
            description:
                'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
            bookmarksCount: 15,
            likesCount: 5,
            personsCount: 1,
        },
        {
            category: 'Веганские блюда',
            cover: '/src/assets/images/cutlets-mini.png',
            badgeIcon: '/src/assets/icons/лавровый-лист-96 1.svg',
            title: 'Капустные котлеты',
            description:
                'Капустные котлеты по этому рецепту получаются необычайно пышными и  невероятно вкусными. Мягкий вкус и лёгкая пряная нотка наверняка помогут сделать эти чудесные котлеты из капусты одним из ваших любимых овощных  блюд.',
            bookmarksCount: 15,
        },
        {
            category: 'Десерты, выпечка',
            cover: '/src/assets/images/оладьи.png',
            badgeIcon: '/src/assets/icons/хлеб-и-скалка-96 1.svg',
            title: 'Оладьи на кефире "Пышные"',
            description:
                'Очень вкусные и нежные оладьи на кефире. Настоятельно рекомендую пышные кефирные оладьи на завтрак.',
            bookmarksCount: 15,
        },
        {
            category: 'Десерты, выпечка',
            cover: '/src/assets/images/оладьи.png',
            badgeIcon: '/src/assets/icons/хлеб-и-скалка-96 1.svg',
            title: 'Оладьи на кефире "Пышные"',
            description:
                'Очень вкусные и нежные оладьи на кефире. Настоятельно рекомендую пышные кефирные оладьи на завтрак.',
            bookmarksCount: 15,
        },
        {
            category: 'Десерты, выпечка',
            cover: '/src/assets/images/оладьи.png',
            badgeIcon: '/src/assets/icons/хлеб-и-скалка-96 1.svg',
            title: 'Оладьи на кефире "Пышные"',
            description:
                'Очень вкусные и нежные оладьи на кефире. Настоятельно рекомендую пышные кефирные оладьи на завтрак.',
            bookmarksCount: 1,
        },
    ];

    return (
        <Box>
            <Text
                fontSize={{ base: '24px', lg: '48px' }}
                fontWeight='500'
                mb='12px'
                ml={{ base: '16px', lg: '0px' }}
            >
                Новые рецепты
            </Text>
            <HStack
                spacing={{ base: '12px', xl: '24px' }}
                align='stretch'
                overflowX='auto'
                sx={{
                    '&::-webkit-scrollbar': {
                        width: '0px',
                        height: '0px',
                    },
                }}
                padding='1pt'
            >
                {recepies.map((it, idx) => (
                    <>
                        {idx == 0 ? <Box></Box> : <></>}
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
                    </>
                ))}
            </HStack>
        </Box>
    );
}
