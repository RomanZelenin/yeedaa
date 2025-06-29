import { CookingStep, Ingredient, Recipe } from '~/app/mocks/types/type_defenitions';
import { MeasureUnit } from '~/app/pages/CreateRecipe/Sections/IngredientsEditor';
import { Blogger, Note } from '~/app/pages/Home/Sections/SectionCookingBlogs';

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

export type BloggersQuery = {
    limit?: string;
    currentUserId: string;
};

export type BloggersResponse = {
    favorites: Blogger[];
    others: Blogger[];
};

export type ToggleSubscriptionQuery = {
    fromUserId: string;
    toUserId: string;
};

export type BloggerInfoQuery = {
    bloggerId: string;
    currentUserId: string;
};

export type BloggerRecipesResponse = {
    notes: Note[];
    recipes: Recipe[];
    totalBookmarks: number;
    totalSubscribers: number;
    userId: string;
    myBookmarks: Recipe[];
};

export type BloggerInfoResponse = {
    bloggerInfo: UserProfile;
    isFavorite: boolean;
    totalBookmarks: number;
    totalSubscribers: number;
};

export type BookmarkResponse = {
    message: string;
    count: number;
};

export type UserProfile = {
    _id: string;
    email: string;
    login: string;
    firstName: string;
    lastName: string;
    recipesIds: string[];
    drafts: Recipe[];
    subscriptions: string[];
    subscribers: string[];
    photoLink: string;
};

export type StatsItem = {
    date: string;
    count: number;
};

export type ActivityStats = {
    likes: StatsItem[];
    bookmarks: StatsItem[];
    recommendationsCount: number;
    recipesWithRecommendations: Recipe[];
};

export type UsersResponse = User[];
export type User = {
    firstName: string;
    lastName: string;
    id: string;
    photo: string;
    login: string;
};

export type LoadPhotoResponse = { photoLink: string };
