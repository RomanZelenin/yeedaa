import { useCallback, useEffect, useState } from 'react';

import { fetchRecepies } from '~/app/mocks/api';
import { filterRecipesByAllergens } from '~/app/Utils/filterRecipesByAllergens';
import { filterRecipesByTitle } from '~/app/Utils/filterRecipesByTitle';

export function useRecipeFilter() {
    const [filteredRecipes, setFilteredRecipes] = useState<Record<string, string>[]>([]);
    const [allergens, setAllergens] = useState<string[]>([]);
    const [query, setQuery] = useState<string>('');

    const applyFilters = useCallback(async () => {
        /* if (allergens.length > 0 || query.length > 0) { */
        let recepies = await fetchRecepies();

        if (allergens.length > 0) {
            recepies = filterRecipesByAllergens(recepies, allergens);
        }
        if (query.length > 0) {
            recepies = filterRecipesByTitle(recepies, query);
        }
        setFilteredRecipes(recepies);
        /*    } else {
            setFilteredRecipes([]);
        } */
    }, [allergens, query]);

    useEffect(() => {
        applyFilters();
    }, [applyFilters]);

    return { filteredRecipes, allergens, setAllergens, query, setQuery, setFilteredRecipes };
}
