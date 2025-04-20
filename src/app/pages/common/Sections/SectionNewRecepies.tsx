import 'swiper/swiper-bundle.css';

import { Box, Text } from '@chakra-ui/react';
import { useLayoutEffect } from 'react';
import { Keyboard, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { NewRecepieCard } from '~/components/Cards/NewRecepieCard';

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

export default function SectionNewRecipes() {
    useLayoutEffect(() => {
        document
            .querySelector('.swiper-button-next')
            ?.setAttribute('data-test-id', 'carousel-forward');
        document
            .querySelector('.swiper-button-prev')
            ?.setAttribute('data-test-id', 'carousel-back');
    }, []);

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

            <Swiper
                data-test-id='carousel'
                loop={true}
                modules={[Navigation, Keyboard]}
                spaceBetween='12px'
                slidesPerView={2.1}
                navigation={true}
                keyboard={{
                    enabled: true,
                    onlyInViewport: true,
                }}
                breakpoints={{
                    360: {
                        slidesPerView: 2.1,
                        spaceBetween: '12px',
                        navigation: {
                            enabled: false,
                        },
                    },
                    768: {
                        slidesPerView: 4.3,
                        spaceBetween: '12px',
                        navigation: {
                            enabled: false,
                        },
                    },
                    1440: {
                        slidesPerView: 3.1,
                        spaceBetween: '12px',
                        navigation: {
                            enabled: true,
                        },
                    },
                    1920: {
                        slidesPerView: 4,
                        spaceBetween: '24px',
                        navigation: {
                            enabled: true,
                        },
                    },
                }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {recepies.map((it, idx) => (
                    <SwiperSlide data-test-id={`carousel-card-${idx}`}>
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
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
}
