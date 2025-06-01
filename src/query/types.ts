import { CookingStep, Ingredient, Recipe } from '~/app/mocks/types/type_defenitions';
import { MeasureUnit } from '~/app/pages/CreateRecipe/IngredientsEditor';

export type StatusResponse = {
    status: number;
    data: {
        statusCode: number;
        message: string;
        error: string;
    };
};
export type FileUploadResponse = {
    name: string;
    url: string;
    _id: string;
};
export type MeasureUnitsResponse = Array<MeasureUnit>;
export type PartialRecipeQuery = Partial<RecipeQuery>;
export type RecipeQuery = {
    id: string;
    page: number;
    limit: number;
    allergens: string;
    searchString: string;
    meat: string;
    garnish: string;
    subcategoriesIds: string;
    sortBy: 'createdAt' | 'likes';
    sortOrder: 'asc' | 'desc';
};
export type CategoryResponse = {
    _id: string;
    title: string;
    category: string;
    icon: string;
    description: string;
    subCategories?: Subcategory[];
};
export type Subcategory = {
    _id: string;
    title: string;
    category: string;
    rootCategoryId: string;
};
export type RecipesResponse = {
    data: Recipe[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
};
export type RecipeDraft = {
    _id: string;
    title: string;
    description?: string;
    image: string;
    time: string;
    portions?: number;
    ingredients?: Ingredient[];
    steps?: CookingStep[];
    categoriesIds?: string[];
};
