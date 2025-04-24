import { Switch, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { createContext, useContext, useState } from 'react';

import { Selector } from './Selector';

const DEFAULT_ALLERGENS = [
    'Молочные продукты',
    'Яйцо',
    'Рыба',
    'Моллюски',
    'Орехи',
    'Томат (помидор)',
    'Цитрусовые',
    'Клубника (ягоды)',
    'Шоколад',
];

export const AllergySelectorWithSwitcher = () => {
    const [isExcludeAllergens, setIsExcludeAllergens] = useState(false);
    const { setAllergens } = useContext(AllergySelectorContext);

    return (
        <>
            <Wrap flex={1} columnGap='12px' align='baseline'>
                <WrapItem columnGap='12px'>
                    <Text fontSize='16px' fontWeight='500' flex={1} whiteSpace='nowrap'>
                        Исключить аллергены
                    </Text>
                    <Switch
                        isChecked={isExcludeAllergens}
                        onChange={() => setIsExcludeAllergens(!isExcludeAllergens)}
                    />
                </WrapItem>
                <WrapItem flex={1}>
                    <Selector
                        isShowAddItemInput={true}
                        isEnabled={isExcludeAllergens}
                        placeholder='Выберите из списка...'
                        defaultItems={DEFAULT_ALLERGENS}
                        addItemPlaceholder='Другой аллерген'
                        onChange={(selected) => {
                            setAllergens(selected);
                        }}
                    />
                </WrapItem>
            </Wrap>
        </>
    );
};

export const AllergySelectorContext = createContext({});
