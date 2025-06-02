import { useEffect, useState } from 'react';

import { MeasureUnit } from '~/app/pages/CreateRecipe/IngredientsEditor';
import { useGetMeasureUnitsQuery } from '~/query/create-measureUnits-api';

export const useGetMeasureUnits = () => {
    const measureUnitsQuery = useGetMeasureUnitsQuery();
    const [measureUnits, setMeasureUnits] = useState<MeasureUnit[]>([]);

    useEffect(() => {
        if (measureUnitsQuery.isSuccess) {
            setMeasureUnits(measureUnitsQuery.data);
        }
    }, [measureUnitsQuery]);

    return { measureUnits };
};
