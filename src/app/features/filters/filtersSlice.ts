import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ApplicationState } from '~/store/configure-store';

export type SelectItem = {
    title: string;
    selected: boolean;
};

export type Filter = {
    categories: SelectItem[];
    authors: SelectItem[];
    meat: SelectItem[];
    side: SelectItem[];
    allergens: SelectItem[];
    isExcludeAllergens: boolean;
};

const DEFAULT_ALLERGENS: SelectItem[] = [
    { title: 'Молочные продукты', selected: false },
    { title: 'Яйцо', selected: false },
    { title: 'Рыба', selected: false },
    { title: 'Моллюски', selected: false },
    { title: 'Орехи', selected: false },
    { title: 'Томат', selected: false },
    { title: 'Цитрусовые', selected: false },
    { title: 'Клубника', selected: false },
    { title: 'Шоколад', selected: false },
];

const DEFAULT_AUTHORS = [
    { title: 'Елена Мин', selected: false },
    { title: 'Мирием Чонишвили', selected: false },
    { title: 'Елена Прекрасная', selected: false },
];

const DEFAULT_CATEGORIES = [
    { title: 'salads', selected: false },
    { title: 'snacks', selected: false },
    { title: 'first-dish', selected: false },
    { title: 'vegan', selected: false },
    { title: 'children-dishes', selected: false },
    { title: 'therapeutic-nutrition', selected: false },
    { title: 'national', selected: false },
    { title: 'sauces', selected: false },
    { title: 'drinks', selected: false },
    { title: 'food-preparations', selected: false },
];

const DEFAULT_MEAT = [
    { title: 'chiken', selected: false },
    { title: 'pork', selected: false },
    { title: 'beef', selected: false },
    { title: 'turkey', selected: false },
    { title: 'duck', selected: false },
];

const DEFAULT_SIDE = [
    { title: 'potatoes', selected: false },
    { title: 'buckwheat', selected: false },
    { title: 'paste', selected: false },
    { title: 'spaghetti', selected: false },
    { title: 'rice', selected: false },
    { title: 'cabbage', selected: false },
    { title: 'beans', selected: false },
    { title: 'other vegetables', selected: false },
];

export const DEFAULT_FILTER: Filter = {
    categories: DEFAULT_CATEGORIES,
    authors: DEFAULT_AUTHORS,
    meat: DEFAULT_MEAT,
    side: DEFAULT_SIDE,
    allergens: DEFAULT_ALLERGENS,
    isExcludeAllergens: false,
};

const initialState = {
    ...DEFAULT_FILTER,
};

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        statusExcludeAllergensChanged(
            state,
            { payload: isExcludeAllergens }: PayloadAction<boolean>,
        ) {
            state.isExcludeAllergens = isExcludeAllergens;
        },

        allergensFilterAdded(state, { payload: allergens }: PayloadAction<SelectItem[]>) {
            state.allergens = allergens;
        },

        sideFilterAdded(state, { payload: side }: PayloadAction<SelectItem[]>) {
            state.side = side;
        },

        meatFilterAdded(state, { payload: meat }: PayloadAction<SelectItem[]>) {
            state.meat = meat;
        },

        authorsFilterAdded(state, { payload: authors }: PayloadAction<SelectItem[]>) {
            state.authors = authors;
        },

        categoriesFilterAdded(state, { payload: categories }: PayloadAction<SelectItem[]>) {
            state.categories = categories;
        },

        setFilter(state, { payload: filter }: PayloadAction<Filter>) {
            state.allergens = filter.allergens;
            state.authors = filter.authors;
            state.categories = filter.categories;
            state.isExcludeAllergens = filter.isExcludeAllergens;
            state.meat = filter.meat;
            state.side = filter.side;
        },
    },
});

export const filterSelector = (state: ApplicationState) => state.filters;

export const {
    statusExcludeAllergensChanged,
    setFilter,
    allergensFilterAdded,
    sideFilterAdded,
    meatFilterAdded,
    authorsFilterAdded,
    categoriesFilterAdded,
} = filtersSlice.actions;
