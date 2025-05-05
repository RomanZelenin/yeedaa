import 'swiper/swiper-bundle.css';

import { Box, Center, Image, Link as ChakraLink, Text } from '@chakra-ui/react';
import { Keyboard, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { NewRecepieCard } from '~/common/components/Cards/NewRecepieCard';
import { useResource } from '~/common/components/ResourceContext/ResourceContext';
import { useGetNewestRecipesQuery } from '~/query/create-api';

export default function SectionNewRecipes() {
    const { getString } = useResource();
    const { data: recipes, isLoading, isError } = useGetNewestRecipesQuery({ limit: 10 });

    if (isLoading) {
        return <Text>Loading...</Text>;
    }
    if (isError) {
        return <Text>Error</Text>;
    }

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
                {getString('new-recepies')}
            </Text>
            <Box position='relative'>
                <Swiper
                    loopPreventsSliding={false}
                    data-test-id='carousel'
                    modules={[Navigation, Keyboard]}
                    loop={true}
                    navigation={{
                        nextEl: '.swiper-custom-button-next',
                        prevEl: '.swiper-custom-button-prev',
                    }}
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
                    {recipes?.data
                        .map((recipe) => ({ ...recipe, path: `/the-juiciest/${recipe._id}` }))
                        .map((recipe, i) => (
                            <SwiperSlide key={i} data-test-id={`carousel-card-${i}`}>
                                <ChakraLink
                                    _hover={{
                                        textDecoration: 'none',
                                    }}
                                    href={`${recipe.path}`}
                                >
                                    <NewRecepieCard key={i} recipe={recipe} />
                                </ChakraLink>
                            </SwiperSlide>
                        ))}
                </Swiper>
                <Center
                    visibility={{ base: 'hidden', lg: 'visible' }}
                    className='swiper-custom-button-prev'
                    data-test-id='carousel-back'
                >
                    <Image src='/src/assets/icons/left-arrow.svg' boxSize='24px' />
                </Center>
                <Center
                    visibility={{ base: 'hidden', lg: 'visible' }}
                    className='swiper-custom-button-next'
                    data-test-id='carousel-forward'
                >
                    <Image src='/src/assets/icons/right-arrow.svg' boxSize='24px' />
                </Center>
            </Box>
        </Box>
    );
}
