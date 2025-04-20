import { Box, Flex, GridItem } from '@chakra-ui/react';

import { AuthorRecipeCard } from '~/components/Cards/AuthorRecipeCard';
import { RecipeCard } from '~/components/Cards/RecipeCard';
import { Profile } from '~/components/Header/ProfileInfo';

import SectionNewRecipes from '../common/Sections/SectionNewRecepies';
import { CookingSteps } from './CookingSteps';
import { IngredientsList } from './IngredientsList';
import { NutritionFacts } from './NutritionFacts';

export type Recipe = {
    id: string;
    title: string;
    description: string;
    category: string[];
    subcategory: string[];
    image: string;
    bookmarks: number;
    likes: number;
    date: string;
    time: string;
    portions: number;
    nutritionValue: NutritionValue;
    ingredients: Ingredient[];
    steps: CookingStep[];
    meat: string;
    side: string;
};

export type NutritionValue = {
    calories: number;
    proteins: number;
    fats: number;
    carbohydrates: number;
};

export type Ingredient = {
    title: string;
    count: string;
    measureUnit: string;
};

export type CookingStep = {
    stepNumber: number;
    description: string;
    image?: string;
};

const mockRecepie: Recipe = {
    id: '0',
    title: 'Картошка, тушенная с болгарским перцем и фасолью в томатном соусе',
    description:
        'Картошка, тушенная с болгарским перцем, фасолью, морковью и луком, - вариант сытного блюда на каждый день. Фасоль в данном случае заменяет мясо, делая рагу сытным и питательным. Чтобы сократить время приготовления, возьмём консервированную фасоль. Блюдо хоть и простое, но в полной мере наполнено ароматами и имеет выразительный вкус за счёт добавления томатной пасты.',
    category: ['Веганские блюда', 'Вторые блюда'],
    subcategory: ['snacks', 'vegetables'],
    image: '/src/assets/images/chiken_pasta.png',
    bookmarks: 85,
    likes: 152,
    date: '2025-02-28T00:00:00Z',
    time: '40 минут',
    portions: 2,
    nutritionValue: { calories: 250, proteins: 5, fats: 8, carbohydrates: 40 },
    ingredients: [
        { title: 'картошка', count: '4', measureUnit: 'шт.' },
        { title: 'болгарский перец', count: '2', measureUnit: 'шт.' },
        { title: 'фасоль', count: '200', measureUnit: 'г' },
        { title: 'томатный соус', count: '200', measureUnit: 'мл' },
        { title: 'лук', count: '1', measureUnit: 'шт.' },
        { title: 'специи', count: '0', measureUnit: 'по вкусу' },
    ],
    steps: [
        {
            stepNumber: 1,
            description: 'Нарезать картошку и перец.',
            image: '/src/assets/images/chiken_pasta.png',
        },
        {
            stepNumber: 2,
            description: 'Обжарить лук до золотистого цвета.',
            image: '/src/assets/images/chiken_pasta.png',
        },
        {
            stepNumber: 3,
            description: 'Добавить картошку, перец и фасоль, залить соусом.',
            image: '/src/assets/images/chiken_pasta.png',
        },
        {
            stepNumber: 4,
            description: 'Тушить на медленном огне 30 минут.',
        },
    ],
    meat: '',
    side: 'potatoes',
};

const mockAuthor: Profile = {
    firstName: 'Сергей',
    lastName: 'Разумов',
    nickname: 'serge25',
    avatar: '/src/assets/images/kate-avatar.png',
    activity: {
        bookmarks: 1,
        persons: 1,
        likes: 1,
    },
};

export const Recipe = () => (
    <>
        <GridItem
            colSpan={{ base: 4, md: 8 }}
            display='block'
            colStart={{ base: 1, md: 1 }}
            colEnd={{ base: 5, md: 13 }}
        >
            <Flex
                direction={{ base: 'column' }}
                px={{ base: '16px', md: '20px', lg: '0px' }}
                rowGap={{ base: '24px' }}
            >
                <RecipeCard recepie={mockRecepie} />
                <Flex
                    w='100%'
                    px={{ md: '64px' }}
                    direction='column'
                    maxW='768px'
                    alignSelf='center'
                    rowGap={{ base: '24px' }}
                >
                    <NutritionFacts nutrition={mockRecepie.nutritionValue} />
                    <IngredientsList ingredients={mockRecepie.ingredients} />
                    <CookingSteps steps={mockRecepie.steps} />
                    <AuthorRecipeCard person={mockAuthor} />
                </Flex>
            </Flex>
            <Box mt='24px'>
                <SectionNewRecipes />
            </Box>
        </GridItem>
    </>
);
