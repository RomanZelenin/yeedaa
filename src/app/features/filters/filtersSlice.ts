import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ApplicationState } from '~/store/configure-store';

export type SelectItem = {
    _id?: string;
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

const DEFAULT_AUTHORS: SelectItem[] = [];

const DEFAULT_CATEGORIES: SelectItem[] = [];

const DEFAULT_MEAT = [
    { title: 'Курица', selected: false },
    { title: 'Свинина', selected: false },
    { title: 'Говядина', selected: false },
    { title: 'Индейка', selected: false },
    { title: 'Утка', selected: false },
];

const DEFAULT_SIDE = [
    { title: 'Картошка', selected: false },
    { title: 'buckwheat', selected: false },
    { title: 'Паста', selected: false },
    { title: 'Спагетти', selected: false },
    { title: 'Рис', selected: false },
    { title: 'cabbage', selected: false },
    { title: 'Бобы', selected: false },
    { title: 'Другие овощи', selected: false },
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

export const { statusExcludeAllergensChanged, setFilter, allergensFilterAdded } =
    filtersSlice.actions;
