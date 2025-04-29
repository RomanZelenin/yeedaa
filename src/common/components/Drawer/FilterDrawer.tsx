import { ChevronDownIcon, ChevronUpIcon, CloseIcon } from '@chakra-ui/icons';
import {
    Button,
    Checkbox,
    CheckboxGroup,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    HStack,
    IconButton,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Stack,
    Switch,
    Tag,
    TagLabel,
    Text,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

import {
    allergensSelector,
    DEFAULT_AUTHORS,
    DEFAULT_CATEGORIES,
    DEFAULT_GLOBAL_FILTER,
    GlobalFilter,
    globalFilterSelector,
    setAppGlobalFilter,
    setAppIsFiltered,
} from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

import { PlusIcon } from '../Icons/PlusIcon';
import { DrawerComponentProps } from '../Menu/HamburgerMenu';
import { useResource } from '../ResourceContext/ResourceContext';
import { CustomCheckboxGroup } from './CustomCheckboxGroup';
import { FilterTag } from './FilterTag';
import { MultiSelectDropdown } from './MultiSelectDropdown';

const meat = ['chiken', 'pork', 'beef', 'turkey', 'duck'];
const garnish = [
    'potatoes',
    'buckwheat',
    'paste',
    'spaghetti',
    'rice',
    'cabbage',
    'beans',
    'other vegetables',
];

export const FilterDrawer = ({ isOpen, onClose }: DrawerComponentProps) => {
    const dispatcher = useAppDispatch();
    const globalFilter = useAppSelector(globalFilterSelector);
    const [filter, setFilter] = useState<GlobalFilter>(globalFilter);
    const { getString } = useResource();

    const onChangeCheckboxGroup = (
        e: React.ChangeEvent<HTMLInputElement>,
        groupName: 'allergens' | 'categories' | 'meat' | 'side_dish' | 'authors',
    ) => {
        e.target.checked
            ? setFilter({
                  ...filter,
                  [`${groupName}`]: [...filter[`${groupName}`], e.target.value],
              })
            : setFilter({
                  ...filter,
                  [`${groupName}`]: [
                      ...filter[`${groupName}`].filter((it) => it !== e.target.value),
                  ],
              });
    };

    const isSearchAcitve =
        filter.allergens.length !== 0 ||
        filter.categories.length !== 0 ||
        filter.meat.length !== 0 ||
        filter.side_dish.length !== 0;

    return (
        <>
            <Drawer isOpen={isOpen} placement='right' onClose={onClose} size='md'>
                <DrawerOverlay />
                <DrawerContent
                    maxW='450px'
                    h='100vh'
                    p={{ base: '32px' }}
                    data-test-id='filter-drawer'
                >
                    <DrawerHeader p={0}>
                        <Flex align='center'>
                            <Text textStyle='text2xlLh8Bold' flex={1}>
                                {getString('filter')}
                            </Text>
                            <IconButton
                                data-test-id='close-filter-drawer'
                                _hover={{ bgColor: 'black' }}
                                boxSize='24px'
                                borderRadius='50%'
                                bgColor='black'
                                minW={0}
                                onClick={onClose}
                                icon={<CloseIcon bgColor='black' color='white' boxSize='10px' />}
                                aria-label=''
                            />
                        </Flex>
                    </DrawerHeader>

                    <DrawerBody mt={{ base: '16px' }} h='100%' mb={{ base: '24px' }}>
                        <Stack spacing='24px' h='100%'>
                            <MultiSelectDropdown
                                id='категория'
                                placeholder={getString('categories')}
                                items={DEFAULT_CATEGORIES}
                                selectedItems={filter.categories}
                                onChange={(e) => onChangeCheckboxGroup(e, 'categories')}
                            />
                            <MultiSelectDropdown
                                placeholder={getString('search-by-author')}
                                items={DEFAULT_AUTHORS}
                                selectedItems={filter.authors}
                                onChange={(e) => onChangeCheckboxGroup(e, 'authors')}
                            />
                            <CustomCheckboxGroup
                                title={`${getString('type-of-meat')}:`}
                                items={meat}
                                selectedItems={filter.meat}
                                onChange={(e) => onChangeCheckboxGroup(e, 'meat')}
                            />
                            <CustomCheckboxGroup
                                title={`${getString('type-of-garnish')}:`}
                                items={garnish}
                                selectedItems={filter.side_dish}
                                onChange={(e) => onChangeCheckboxGroup(e, 'side_dish')}
                            />

                            <AllergySelectorFilterWithSwitcher
                                selectedItems={filter.allergens}
                                onChange={(e) => onChangeCheckboxGroup(e, 'allergens')}
                            />

                            <Wrap display='flex' spacing='8px' flex={1} alignItems='end'>
                                {Object.entries(filter).map((filterName) =>
                                    filterName[1].map((title) => (
                                        <WrapItem>
                                            <FilterTag
                                                label={getString(title)}
                                                onClose={() => {
                                                    setFilter({
                                                        ...filter,
                                                        [`${filterName[0]}`]: [
                                                            ...filterName[1].filter(
                                                                (it) => it !== title,
                                                            ),
                                                        ],
                                                    });
                                                }}
                                            />
                                        </WrapItem>
                                    )),
                                )}
                            </Wrap>
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter p={0}>
                        <Button
                            variant='outline'
                            mr={3}
                            data-test-id='clear-filter-button'
                            onClick={() => {
                                dispatcher(setAppIsFiltered(false));
                                setFilter(DEFAULT_GLOBAL_FILTER);
                            }}
                        >
                            <Text
                                textStyle={{ base: 'textSmLh5Semibold', lg: 'textLgLh7Semibold' }}
                            >
                                {getString('clear-filter')}
                            </Text>
                        </Button>
                        <Button
                            variant='solid'
                            pointerEvents={!isSearchAcitve ? 'none' : 'auto'}
                            bgColor={isSearchAcitve ? 'black' : '#c2c2c2'}
                            color='white'
                            data-test-id='find-recipe-button'
                            disabled={!isSearchAcitve}
                            onClick={() => {
                                dispatcher(setAppGlobalFilter(filter));
                                dispatcher(setAppIsFiltered(true));
                                setFilter(DEFAULT_GLOBAL_FILTER);
                                onClose();
                            }}
                        >
                            <Text
                                textStyle={{ base: 'textSmLh5Semibold', lg: 'textLgLh7Semibold' }}
                            >
                                {getString('find-recipe')}
                            </Text>
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};

const AllergySelectorFilterWithSwitcher = ({
    onChange,
    selectedItems,
}: {
    selectedItems: string[];
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    const { getString } = useResource();
    const [isExcludeAllergens, setIsExcludeAllergens] = useState(false);
    const [allergens, setAllergens] = useState(useAppSelector(allergensSelector));
    const countSelectedAllergens = allergens.filter((item) => item.selected === true).length;

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
                        {getString('eliminate-allergens')}
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
                                {countSelectedAllergens === 0 ? (
                                    getString('select-from-list-of-allergens') + '...'
                                ) : (
                                    <>
                                        {countSelectedAllergens > 0 && (
                                            <Wrap>
                                                {allergens
                                                    .filter((item) => item.selected === true)
                                                    .map((item, i) => (
                                                        <Tag
                                                            key={i}
                                                            color='lime.600'
                                                            border='1px solid var(--chakra-colors-lime-400)'
                                                            bgColor='transparent'
                                                            borderRadius='6px'
                                                        >
                                                            <TagLabel>{item.title}</TagLabel>
                                                        </Tag>
                                                    ))}
                                            </Wrap>
                                        )}
                                    </>
                                )}
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
                                                onChange={(e) => {
                                                    onChange(e);
                                                    setAllergens([
                                                        ...allergens.slice(0, i),
                                                        { ...item, selected: !item.selected },
                                                        ...allergens.slice(i + 1),
                                                    ]);
                                                }}
                                                mr={2}
                                            >
                                                <Text textStyle='textSmLh5'>{item.title}</Text>
                                            </Checkbox>
                                        </MenuItem>
                                    ))}
                                </CheckboxGroup>
                                <HStack spacing='8px' p='8px'>
                                    <Input
                                        ref={refInput}
                                        onBlur={() => {
                                            refInput.current?.focus();
                                        }}
                                        data-test-id={isOpen ? 'add-other-allergen' : ''}
                                        placeholder='Другой аллерген'
                                        minH={0}
                                        ml='24px'
                                        h='32px'
                                        py='6px'
                                        px='12px'
                                        fontSize='14px'
                                        lineHeight='20px'
                                        fontWeight={400}
                                        borderColor='blackAlpha.200'
                                        border='1px solid'
                                        _hover={{
                                            borderColor: 'blackAlpha.200',
                                        }}
                                        _focusVisible={{
                                            borderColor: 'blackAlpha.200',
                                        }}
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
};
