import { HStack, Switch, Text } from '@chakra-ui/react';
import { useEffect } from 'react';

import {
    allergensFilterAdded,
    filterSelector,
    SelectItem,
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

    function handleOnChangeSwitch() {
        dispatch(statusExcludeAllergensChanged(!filter.isExcludeAllergens));
    }

    function handleOnClickClearAll() {
        dispatch(
            allergensFilterAdded(
                filter.allergens.map((allergen) => ({
                    ...allergen,
                    selected: false,
                })),
            ),
        );
    }

    function handleOnAddCustomItem(customAllergen: string) {
        let formattedItem = customAllergen.trim().toLocaleLowerCase();
        if (!formattedItem) return;
        formattedItem = formattedItem[0].toLocaleUpperCase() + formattedItem.substring(1);
        const i = filter.allergens.findIndex((allergen) => allergen.title === formattedItem);

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
    }

    function handleOnSelectItem(item: SelectItem) {
        const i = filter.allergens.findIndex((it) => it.title === item.title);
        dispatch(
            allergensFilterAdded([
                ...filter.allergens.slice(0, i),
                { ...item, selected: !item.selected },
                ...filter.allergens.slice(i + 1),
            ]),
        );
    }

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
                        onChange={handleOnChangeSwitch}
                    />
                </HStack>
                <Selector
                    items={filter.allergens}
                    isDisabled={!filter.isExcludeAllergens}
                    isShowAddItemInput={true}
                    placeholder='Выберите из списка...'
                    addItemPlaceholder='Другой аллерген'
                    onClickClearAll={handleOnClickClearAll}
                    onAddCustomItem={handleOnAddCustomItem}
                    onSelect={handleOnSelectItem}
                />
            </HStack>
        </>
    );
};
