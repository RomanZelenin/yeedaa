import 'swiper/swiper-bundle.css';

import { Box, Link as ChakraLink, Text } from '@chakra-ui/react';
import { useLayoutEffect } from 'react';
import { Keyboard, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { NewRecepieCard } from '~/common/components/Cards/NewRecepieCard';
import { recipesSelector } from '~/store/app-slice';
import { useAppSelector } from '~/store/hooks';

export default function SectionNewRecipes() {
    useLayoutEffect(() => {
        document
            .querySelector('.swiper-button-next')
            ?.setAttribute('data-test-id', 'carousel-forward');
        document
            .querySelector('.swiper-button-prev')
            ?.setAttribute('data-test-id', 'carousel-back');
    }, []);

    const recipes = [...useAppSelector(recipesSelector)]
        .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
        .slice(0, 10);

    return (
        <Box>
            <Text
                textStyle={{
                    base: 'text2xlLh8Medium',
                    lg: 'text4xlLh10Medium',
                    xl: 'text5xlLhNoneMedium',
                }}
                mb='12px'
                ml={{ base: '16px', lg: '0px' }}
            >
                Новые рецепты
            </Text>

            <Swiper
                loopPreventsSliding={false}
                data-test-id='carousel'
                modules={[Navigation, Keyboard]}
                loop={true}
                navigation={true}
                keyboard={{
                    enabled: true,
                    onlyInViewport: true,
                }}
                breakpoints={{
                    360: {
                        slidesPerView: 2.18,
                        spaceBetween: '12px',
                        navigation: {
                            enabled: false,
                        },
                    },
                    768: {
                        slidesPerView: 4.4,
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
                        slidesOffsetBefore: 16,
                    },
                    1920: {
                        slidesPerView: 4.1,
                        spaceBetween: '24px',
                        navigation: {
                            enabled: true,
                        },
                        slidesOffsetBefore: 16,
                    },
                }}
            >
                {recipes.map((it, i) => (
                    <SwiperSlide key={i} data-test-id={`carousel-card-${i}`}>
                        <ChakraLink
                            _hover={{
                                textDecoration: 'none',
                            }}
                            href={`/${it.category[0]}/${it.subcategory[0]}/${i}`}
                        >
                            <NewRecepieCard
                                key={i}
                                categories={it.category}
                                cover={it.image}
                                title={it.title}
                                description={it.description}
                                bookmarksCount={it.bookmarks}
                                likesCount={it.likes}
                            />
                        </ChakraLink>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
}
