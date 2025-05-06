import { Button, HStack, Image, Show, Text, useBreakpoint, VStack } from '@chakra-ui/react';

import { RecipeCollection } from '~/common/components/RecipeCollection/RecipeCollection';
import { useGetJuiciestRecipesQuery } from '~/query/create-api';
import { setJuiciestRecipesLoader } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

export default function SectionJuiciest() {
    const breakpoint = useBreakpoint();
    const {
        data: recipes,
        isLoading,
        isError,
        isSuccess,
    } = useGetJuiciestRecipesQuery({ limit: 4, sortBy: 'likes', sortOrder: 'desc' });

    const dispatcher = useAppDispatch();

    if (isLoading) {
        dispatcher(setJuiciestRecipesLoader(true));
        return <Text>Loading...</Text>;
    }
    if (isError || isSuccess) {
        dispatcher(setJuiciestRecipesLoader(false));
        if (isError) return <Text>Error</Text>;
    }

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
                <Show above='lg'>
                    <Button
                        as='a'
                        href='/the-juiciest'
                        display={{ base: 'none', lg: 'inline-flex' }}
                        bgColor='lime.300'
                        fontSize='16px'
                        color='black'
                        variant='ghost'
                        px='16px'
                        py='8px'
                        rightIcon={<Image src='/src/assets/icons/BsArrowRight.svg' />}
                        data-test-id='juiciest-link'
                    >
                        Вся подборка
                    </Button>
                </Show>
            </HStack>
            <RecipeCollection
                recipes={recipes!.data.map((recipe) => ({
                    ...recipe,
                    path: `/the-juiciest/${recipe._id}`,
                }))}
            />
            <Button
                display={{ base: 'flex', md: 'none' }}
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
                rightIcon={<Image src='/src/assets/icons/BsArrowRight.svg' />}
                data-test-id='juiciest-link-mobile'
            >
                Вся подборка
            </Button>
            {breakpoint === 'md' ? (
                <Button
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
                    rightIcon={<Image src='/src/assets/icons/BsArrowRight.svg' />}
                    data-test-id='juiciest-link'
                >
                    Вся подборка
                </Button>
            ) : (
                <></>
            )}
        </VStack>
    );
}
