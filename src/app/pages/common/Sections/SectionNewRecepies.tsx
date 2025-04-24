import 'swiper/swiper-bundle.css';

import { Box, Link as ChakraLink, Text } from '@chakra-ui/react';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Keyboard, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { fetchRecepies } from '~/app/mocks/api';
import { Recipe } from '~/app/mocks/types/type_defenitions';
import { NewRecepieCard } from '~/components/Cards/NewRecepieCard';

export default function SectionNewRecipes() {
    useLayoutEffect(() => {
        document
            .querySelector('.swiper-button-next')
            ?.setAttribute('data-test-id', 'carousel-forward');
        document
            .querySelector('.swiper-button-prev')
            ?.setAttribute('data-test-id', 'carousel-back');
    }, []);

    const [recepies, setRecepies] = useState<Recipe[]>([]);

    useEffect(() => {
        fetchRecepies().then((recepies) => {
            setRecepies(
                recepies.sort((a, b) => Date.parse(b.date) - Date.parse(a.date)).slice(0, 10),
            );
        });
    }, []);

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
                    },
                    1920: {
                        slidesPerView: 4,
                        spaceBetween: '24px',
                        navigation: {
                            enabled: true,
                        },
                    },
                }}
            >
                {recepies.map((it, idx) => (
                    <SwiperSlide data-test-id={`carousel-card-${idx}`}>
                        <ChakraLink
                            _hover={{
                                textDecoration: 'none',
                            }}
                            href={`/${it.category[0]}/${it.subcategory[0]}/${it.id}`}
                        >
                            <NewRecepieCard
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
