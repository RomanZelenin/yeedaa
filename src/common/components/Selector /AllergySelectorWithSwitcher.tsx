import { HStack, Switch, Text } from '@chakra-ui/react';
import { useEffect } from 'react';

import {
    allergensFilterAdded,
    filterSelector,
    statusExcludeAllergensChanged,
} from '~/app/features/filters/filtersSlice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

import { Selector } from './Selector';

export const AllergySelectorWithSwitcher = () => {
    const filter = useAppSelector(filterSelector);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!filter.isExcludeAllergens)
            dispatch(
                allergensFilterAdded(
                    filter.allergens.map((allergen) => ({ ...allergen, selected: false })),
                ),
            );
    }, [filter.isExcludeAllergens]);

    return (
        <>
            <HStack flex={1} columnGap='12px' align='baseline'>
                <HStack columnGap='12px'>
                    <Text fontSize='16px' fontWeight='500' flex={1} whiteSpace='nowrap'>
                        Исключить аллергены
                    </Text>
                    <Switch
                        data-test-id='allergens-switcher'
                        isChecked={filter.isExcludeAllergens}
                        onChange={() => {
                            dispatch(statusExcludeAllergensChanged(!filter.isExcludeAllergens));
                        }}
                    />
                </HStack>
                <Selector
                    items={filter.allergens}
                    isDisabled={!filter.isExcludeAllergens}
                    isShowAddItemInput={true}
                    placeholder='Выберите из списка...'
                    addItemPlaceholder='Другой аллерген'
                    onClickClearAll={() => {
                        dispatch(
                            allergensFilterAdded(
                                filter.allergens.map((allergen) => ({
                                    ...allergen,
                                    selected: false,
                                })),
                            ),
                        );
                    }}
                    onAddCustomItem={(customAllergen) => {
                        let formattedItem = customAllergen.trim().toLocaleLowerCase();
                        if (!formattedItem) return;
                        formattedItem =
                            formattedItem[0].toLocaleUpperCase() + formattedItem.substring(1);
                        const i = filter.allergens.findIndex(
                            (allergen) => allergen.title === formattedItem,
                        );

                        if (i == -1) {
                            dispatch(
                                allergensFilterAdded([
                                    ...filter.allergens,
                                    { title: formattedItem, selected: true },
                                ]),
                            );
                        } else {
                            dispatch(
                                allergensFilterAdded([
                                    ...filter.allergens.slice(0, i),
                                    { title: formattedItem, selected: true },
                                    ...filter.allergens.slice(i + 1),
                                ]),
                            );
                        }
                    }}
                    onSelect={(item) => {
                        const i = filter.allergens.findIndex((it) => it.title === item.title);
                        dispatch(
                            allergensFilterAdded([
                                ...filter.allergens.slice(0, i),
                                { ...item, selected: !item.selected },
                                ...filter.allergens.slice(i + 1),
                            ]),
                        );
                    }}
                />
            </HStack>
        </>
    );
};
