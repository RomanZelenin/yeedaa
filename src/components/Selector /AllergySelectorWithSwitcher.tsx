import { HStack, Switch, Text } from '@chakra-ui/react';
import { useEffect } from 'react';

import {
    allergensSelector,
    isExcludeAllergensSelector,
    setAppAllergens,
    setAppExcludeAllergens,
} from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

import { Selector } from './Selector';

export const AllergySelectorWithSwitcher = () => {
    const isExcludeAllergens = useAppSelector(isExcludeAllergensSelector);
    const allergens = useAppSelector(allergensSelector);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isExcludeAllergens)
            dispatch(
                setAppAllergens(allergens.map((allergen) => ({ ...allergen, selected: false }))),
            );
    }, [isExcludeAllergens]);

    return (
        <>
            <HStack flex={1} columnGap='12px' align='baseline'>
                <HStack columnGap='12px'>
                    <Text fontSize='16px' fontWeight='500' flex={1} whiteSpace='nowrap'>
                        Исключить аллергены
                    </Text>
                    <Switch
                        data-test-id='allergens-switcher'
                        isChecked={isExcludeAllergens}
                        onChange={() => {
                            dispatch(setAppExcludeAllergens(!isExcludeAllergens));
                        }}
                    />
                </HStack>
                <Selector
                    items={allergens}
                    isDisabled={!isExcludeAllergens}
                    isShowAddItemInput={true}
                    placeholder='Выберите из списка...'
                    addItemPlaceholder='Другой аллерген'
                    onClickClearAll={() => {
                        dispatch(
                            setAppAllergens(
                                allergens.map((allergen) => ({ ...allergen, selected: false })),
                            ),
                        );
                    }}
                    onAddCustomItem={(customAllergen) => {
                        let formattedItem = customAllergen.trim().toLocaleLowerCase();
                        if (!formattedItem) return;
                        formattedItem =
                            formattedItem[0].toLocaleUpperCase() + formattedItem.substring(1);

                        const i = allergens.findIndex(
                            (allergen) => allergen.title === formattedItem,
                        );

                        if (i == -1) {
                            dispatch(
                                setAppAllergens([
                                    ...allergens,
                                    { title: formattedItem, selected: true },
                                ]),
                            );
                        } else {
                            dispatch(
                                setAppAllergens([
                                    ...allergens.slice(0, i),
                                    { title: formattedItem, selected: true },
                                    ...allergens.slice(i + 1),
                                ]),
                            );
                        }
                    }}
                    onSelect={(item) => {
                        const i = allergens.findIndex((it) => it.title === item.title);
                        dispatch(
                            setAppAllergens([
                                ...allergens.slice(0, i),
                                { ...item, selected: !item.selected },
                                ...allergens.slice(i + 1),
                            ]),
                        );
                    }}
                />
            </HStack>
        </>
    );
};

/* export const AllergySelectorFilterWithSwitcher = ({
    onChange,
    selectedItems,
}: {
    selectedItems: string[];
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    const [isExcludeAllergens, setIsExcludeAllergens] = useState(false);
    const [allergens, setAllergens] = useState(useAppSelector(allergensSelector));

    useEffect(() => {
        if (!isExcludeAllergens)
            setAllergens(allergens.map((allergen) => ({ ...allergen, selected: false })));
    }, [isExcludeAllergens]);

    const [customAllergen, setCustomAllergen] = useState('');

    const onAddCustomItem = (customAllergen: string) => {
        let formattedItem = customAllergen.trim().toLocaleLowerCase();
        if (!formattedItem) return;
        formattedItem = formattedItem[0].toLocaleUpperCase() + formattedItem.substring(1);

        const i = allergens.findIndex((allergen) => allergen.title === formattedItem);

        if (i == -1) {
            setAllergens([...allergens, { title: formattedItem, selected: true }]);
        } else {
            setAllergens([
                ...allergens.slice(0, i),
                { title: formattedItem, selected: true },
                ...allergens.slice(i + 1),
            ]);
        }
        onChange({ target: { checked: true, value: formattedItem } });
    };

    const refInput = useRef(null);
    return (
        <>
            <Stack flex={1} columnGap='12px' align='baseline'>
                <HStack columnGap='12px'>
                    <Text fontSize='16px' fontWeight='500' flex={1}>
                        Исключить аллергены
                    </Text>
                    <Switch
                        data-test-id='allergens-switcher-filter'
                        isChecked={isExcludeAllergens}
                        onChange={() => setIsExcludeAllergens(!isExcludeAllergens)}
                    />
                </HStack>

                <Menu closeOnSelect={false}>
                    {({ isOpen }) => (
                        <>
                            <MenuButton
                                onClick={() => console.log('click')}
                                data-test-id='allergens-menu-button-filter'
                                as={Button}
                                variant='lime'
                                rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                                w='100%'
                                alignItems='start'
                                h='fit-content'
                                py='8px'
                                px='12px'
                                textAlign='start'
                                isDisabled={!isExcludeAllergens}
                            >
                                Выберите из списка аллергенов...
                            </MenuButton>

                            <MenuList
                                overflowY='auto'
                                zIndex='popover'
                                py='4px'
                                data-test-id='allergens-menu'
                            >
                                <CheckboxGroup value={selectedItems}>
                                    {allergens.map((item, i) => (
                                        <MenuItem
                                            h='32px'
                                            py='6px'
                                            px='16px'
                                            key={i}
                                            value={item.title}
                                            bgColor={i % 2 == 0 ? 'blackAlpha.100' : 'white'}
                                        >
                                            <Checkbox
                                                value={item.title}
                                                data-test-id={`allergen-${i}`}
                                                variant='lime'
                                                isChecked={item.selected}
                                                onChange={onChange}
                                                mr={2}
                                            >
                                                <Text textStyle='textSmLh5'>{item.title}</Text>
                                            </Checkbox>
                                        </MenuItem>
                                    ))}
                                </CheckboxGroup>
                                <HStack spacing='8px' py='8px'>
                                    <Input
                                        ref={refInput}
                                        onBlur={() => {
                                            refInput.current?.focus();
                                        }}
                                        data-test-id={isOpen ? 'add-other-allergen' : ''}
                                        placeholder='Другой аллерге'
                                        minH={0}
                                        ml='24px'
                                        h='32px'
                                        py='6px'
                                        px='12px'
                                        fontSize='14px'
                                        lineHeight='20px'
                                        fontWeight={400}
                                        borderColor='blackAlpha.200'
                                        value={customAllergen}
                                        onChange={(e) => setCustomAllergen(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                onAddCustomItem(customAllergen);
                                                setCustomAllergen('');
                                            }
                                        }}
                                    />
                                    <IconButton
                                        data-test-id={isOpen ? 'add-allergen-button' : ''}
                                        bgColor='transparent'
                                        minW={0}
                                        flex='1 0 auto'
                                        boxSize='24px'
                                        aria-label='Add allergen'
                                        icon={<PlusIcon boxSize='12px' />}
                                        onClick={() => {
                                            onAddCustomItem(customAllergen);
                                            setCustomAllergen('');
                                        }}
                                        isDisabled={!customAllergen.trim()}
                                    />
                                </HStack>
                            </MenuList>
                        </>
                    )}
                </Menu>
            </Stack>
        </>
    );
}; */
