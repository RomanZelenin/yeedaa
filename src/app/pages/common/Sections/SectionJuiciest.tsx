import { Button, HStack, Image, Text, VStack } from '@chakra-ui/react';

import { RecipeCollection } from '~/components/RecipeCollection/RecipeCollection';
import { recipesSelector } from '~/store/app-slice';
import { useAppSelector } from '~/store/hooks';

export default function SectionJuiciest() {
    const recipes = [...useAppSelector(recipesSelector)]
        .sort((a, b) => b.likes - a.likes)
        .slice(0, 4);

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
            </HStack>
            <RecipeCollection recipes={recipes} />
            <Button
                display={{ base: 'flex', lg: 'none' }}
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
        </VStack>
    );
}
