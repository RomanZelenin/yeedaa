import { Box, Button, Image, Stack, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Link } from 'react-router';

import arrowRightIcon from '~/assets/icons/BsArrowRight.svg';
import { RecipeCollection } from '~/common/components/RecipeCollection/RecipeCollection';
import { useGetJuiciestRecipesQuery } from '~/query/create-recipe-api';
import { setJuiciestRecipesLoader } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

export default function SectionJuiciest() {
    const dispatch = useAppDispatch();
    const { data: recipes, isLoading, isError } = useGetJuiciestRecipesQuery({ limit: 4 });

    useEffect(() => {
        dispatch(setJuiciestRecipesLoader(isLoading));
    }, [isLoading, dispatch]);

    if (isLoading || isError) {
        return null;
    }

    return (
        <VStack spacing='12px' align='stretch'>
            <Stack flexDir='row'>
                <Text
                    px={{ base: '16px', lg: '0px' }}
                    fontSize={{ base: '24px', lg: '48px' }}
                    fontWeight='500'
                    flex={1}
                >
                    Самое сочное
                </Text>
                <Button
                    alignSelf='center'
                    display={{ base: 'none', lg: 'inline-flex' }}
                    visibility={{ base: 'hidden', lg: 'visible' }}
                    as={Link}
                    to='/the-juiciest'
                    bgColor='lime.300'
                    fontSize='16px'
                    color='black'
                    variant='ghost'
                    px='16px'
                    py='8px'
                    rightIcon={<Image src={arrowRightIcon} />}
                    data-test-id='juiciest-link'
                >
                    Вся подборка
                </Button>
            </Stack>
            <Box px={{ base: '16px', lg: '0px' }}>
                <RecipeCollection
                    recipes={recipes!.data.map((recipe) => ({
                        ...recipe,
                        path: `/the-juiciest/${recipe._id}`,
                    }))}
                />
            </Box>
            <Button
                visibility={{ base: 'visible', lg: 'hidden' }}
                as={Link}
                to='/the-juiciest'
                bgColor='lime.300'
                alignSelf='center'
                fontSize='16px'
                color='black'
                variant='ghost'
                flex={1}
                px='16px'
                py='8px'
                rightIcon={<Image src={arrowRightIcon} />}
                data-test-id='juiciest-link-mobile'
            >
                Вся подборка
            </Button>
        </VStack>
    );
}
