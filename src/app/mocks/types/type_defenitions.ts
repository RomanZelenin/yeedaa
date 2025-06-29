export type Recipe = {
    _id: string;
    title: string;
    description: string;
    category: string[];
    subcategory: string[];
    image: string;
    bookmarks: number;
    likes: number;
    views: number;
    date: string;
    time: string;
    portions?: number;
    nutritionValue: NutritionValue;
    ingredients: Ingredient[];
    steps: CookingStep[];
    meat?: string;
    side?: string;
    recommendedByUserId?: string[];
    categoriesIds?: string[];
    createdAt: string;
    authorId: string;
    path?: string;
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
    image?: string | null;
};
