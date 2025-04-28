import { Profile } from '~/components/Header/ProfileInfo';

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
    portions?: number;
    nutritionValue: NutritionValue;
    ingredients: Ingredient[];
    steps: CookingStep[];
    meat?: string;
    side?: string;
    recommendation?: Profile[];
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
