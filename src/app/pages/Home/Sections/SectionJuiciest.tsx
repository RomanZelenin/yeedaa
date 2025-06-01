import { Button, HStack, Image, Text, VStack } from '@chakra-ui/react';

import arrowRightIcon from '~/assets/icons/BsArrowRight.svg';
import { RecipeCollection } from '~/common/components/RecipeCollection/RecipeCollection';
import { useGetJuiciestRecipesQuery } from '~/query/create-recipe-api';
import { setJuiciestRecipesLoader } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

export default function SectionJuiciest() {
    const dispatch = useAppDispatch();
    const {
        data: recipes,
        isLoading,
        isError,
        isSuccess,
    } = useGetJuiciestRecipesQuery({ limit: 4, sortBy: 'likes', sortOrder: 'desc' });

    if (isLoading) {
        dispatch(setJuiciestRecipesLoader(true));
        return null;
    }
    if (isError) {
        dispatch(setJuiciestRecipesLoader(false));
        return null;
    }

    if (isSuccess) {
        dispatch(setJuiciestRecipesLoader(false));
        return (
            <VStack spacing='12px' align='stretch'>
                <HStack>
                    <Text
                        px={{ base: '16px', lg: '0px' }}
                        fontSize={{ base: '24px', lg: '48px' }}
                        fontWeight='500'
                        flex={1}
                    >
                        Самое сочное
                    </Text>
                    <Button
                        visibility={{ base: 'hidden', lg: 'visible' }}
                        as='a'
                        href='/the-juiciest'
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
                </HStack>
                <RecipeCollection
                    recipes={recipes!.data.map((recipe) => ({
                        ...recipe,
                        path: `/the-juiciest/${recipe._id}`,
                    }))}
                />
                <Button
                    visibility={{ base: 'visible', lg: 'hidden' }}
                    as='a'
                    href='/the-juiciest'
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
}
