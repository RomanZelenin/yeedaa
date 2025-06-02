import 'swiper/swiper-bundle.css';

import { Box, Center, Image, Link as ChakraLink, Text } from '@chakra-ui/react';
import { Link } from 'react-router';
import { Keyboard, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import leftArrowIcon from '~/assets/icons/left-arrow.svg';
import rightArrowIcon from '~/assets/icons/right-arrow.svg';
import { NewRecepieCard } from '~/common/components/Cards/NewRecepieCard';
import { useResource } from '~/common/components/ResourceContext/ResourceContext';
import { useGetCategoriesQuery } from '~/query/create-category-api';
import { useGetNewestRecipesQuery } from '~/query/create-recipe-api';
import { Subcategory } from '~/query/types';
import { setNewestRecipesLoader } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

export default function SectionNewRecipes() {
    const { getString } = useResource();
    const dispatcher = useAppDispatch();
    const {
        data: recipes,
        isLoading: isLoadingGetNewestRecipesQuery,
        isError: isErrorGetNewestRecipesQuery,
        isSuccess: isSuccessGetNewestRecipesQuery,
    } = useGetNewestRecipesQuery({ limit: 10 });

    const {
        data: categories,
        isSuccess: isSuccessGetCategories,
        isLoading: isLoadingGetCategories,
        isError: isErrorGetCategories,
    } = useGetCategoriesQuery();

    if (isLoadingGetNewestRecipesQuery || isLoadingGetCategories) {
        dispatcher(setNewestRecipesLoader(true));
        return null;
    }
    if (isErrorGetNewestRecipesQuery || isErrorGetCategories) {
        dispatcher(setNewestRecipesLoader(false));
        return null;
    }

    if (isSuccessGetCategories && isSuccessGetNewestRecipesQuery) {
        dispatcher(setNewestRecipesLoader(false));
        const subcategories = recipes!.data.map(
            (recipe) =>
                categories!.find(
                    (category) => category._id === recipe.categoriesIds![0],
                )! as unknown as Subcategory,
        );
        const rootCategories = subcategories.map((subcategory) =>
            categories.find((category) => category._id === subcategory?.rootCategoryId),
        );

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
                        {recipes!.data
                            ?.map((recipe, i) => ({
                                ...recipe,
                                path: `/${rootCategories.at(i)?.category}/${subcategories.at(i)?.category}/${recipe._id}`,
                            }))
                            .map((recipe, i) => (
                                <SwiperSlide key={i} data-test-id={`carousel-card-${i}`}>
                                    <ChakraLink
                                        as={Link}
                                        to={recipe.path}
                                        _hover={{
                                            textDecoration: 'none',
                                        }}
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
                        <Image src={leftArrowIcon} boxSize='24px' />
                    </Center>
                    <Center
                        visibility={{ base: 'hidden', lg: 'visible' }}
                        className='swiper-custom-button-next'
                        data-test-id='carousel-forward'
                    >
                        <Image src={rightArrowIcon} boxSize='24px' />
                    </Center>
                </Box>
            </Box>
        );
    }
}
