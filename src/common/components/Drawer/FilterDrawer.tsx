import { ChevronDownIcon, ChevronUpIcon, CloseIcon } from '@chakra-ui/icons';
import {
    Button,
    Checkbox,
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
    DEFAULT_FILTER,
    filterSelector,
    SelectItem,
    setFilter,
} from '~/app/features/filters/filtersSlice';
import { setIsSearch } from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

import { PlusIcon } from '../Icons/PlusIcon';
import { DrawerComponentProps } from '../Menu/HamburgerMenu';
import { useResource } from '../ResourceContext/ResourceContext';
import { CustomCheckboxGroup } from './CustomCheckboxGroup';
import { FilterTag } from './FilterTag';
import { MultiSelectDropdown } from './MultiSelectDropdown';

export const FilterDrawer = ({ isOpen, onClose }: DrawerComponentProps) => {
    const dispatcher = useAppDispatch();

    const filter = useAppSelector(filterSelector);
    const [_filter, _setFilter] = useState(filter);

    const { getString } = useResource();
    const onChangeCheckboxGroup = (
        e: React.ChangeEvent<HTMLInputElement>,
        groupName: 'allergens' | 'categories' | 'meat' | 'side' | 'authors',
    ) => {
        _setFilter({
            ..._filter,
            [`${groupName}`]: _filter[`${groupName}`].map((it) => {
                if (it.title === e.target.value) {
                    return { ...it, selected: !it.selected };
                } else {
                    return it;
                }
            }),
        });
    };

    const isFilterAcitve =
        _filter.allergens.filter((it) => it.selected).length !== 0 ||
        _filter.categories.filter((it) => it.selected).length !== 0 ||
        _filter.meat.filter((it) => it.selected).length !== 0 ||
        _filter.side.filter((it) => it.selected).length !== 0;

    useEffect(() => {
        if (!isOpen)
            _setFilter({
                ..._filter,
                categories: [..._filter.categories.map((it) => ({ ...it, selected: false }))],
            });
    }, [isOpen]);

    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={() => {
                    onClose();
                }}
                size='md'
            >
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
                                onClick={() => onClose()}
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
                                items={_filter.categories}
                                onChange={(e) => onChangeCheckboxGroup(e, 'categories')}
                            />
                            <MultiSelectDropdown
                                placeholder={getString('search-by-author')}
                                items={_filter.authors}
                                onChange={(e) => onChangeCheckboxGroup(e, 'authors')}
                            />
                            <CustomCheckboxGroup
                                title={`${getString('type-of-meat')}:`}
                                items={_filter.meat}
                                onChange={(e) => onChangeCheckboxGroup(e, 'meat')}
                            />
                            <CustomCheckboxGroup
                                title={`${getString('type-of-garnish')}:`}
                                items={_filter.side}
                                onChange={(e) => onChangeCheckboxGroup(e, 'side')}
                            />

                            <AllergySelectorFilterWithSwitcher
                                isExcludeAllergens={_filter.isExcludeAllergens}
                                items={_filter.allergens}
                                onAddCustomAllergen={(customAllergen) => {
                                    const i = _filter.allergens.findIndex(
                                        (allergen) => allergen.title === customAllergen.title,
                                    );

                                    if (i == -1) {
                                        _setFilter({
                                            ..._filter,
                                            allergens: [..._filter.allergens, customAllergen],
                                        });
                                    } else {
                                        _setFilter({
                                            ..._filter,
                                            allergens: [
                                                ..._filter.allergens.slice(0, i),
                                                customAllergen,
                                                ..._filter.allergens.slice(i + 1),
                                            ],
                                        });
                                    }
                                }}
                                onChange={(e) => onChangeCheckboxGroup(e, 'allergens')}
                                onChangeExcludeAllergens={(isExclude) => {
                                    _setFilter({ ..._filter, isExcludeAllergens: isExclude });
                                }}
                            />

                            <Wrap display='flex' spacing='8px' flex={1} alignItems='end'>
                                {Object.entries(_filter)
                                    .filter((it) => it[0] !== 'isExcludeAllergens')
                                    .map(([key, value]) =>
                                        (value as SelectItem[])
                                            .filter((it) => it.selected)
                                            .map((it) => (
                                                <>
                                                    <WrapItem>
                                                        <FilterTag
                                                            label={getString(it.title)}
                                                            onClose={() => {
                                                                _setFilter({
                                                                    ..._filter,
                                                                    [`${key}`]: [
                                                                        ..._filter[`${key}`].map(
                                                                            (e) =>
                                                                                e.title === it.title
                                                                                    ? {
                                                                                          ...e,
                                                                                          selected:
                                                                                              false,
                                                                                      }
                                                                                    : e,
                                                                        ),
                                                                    ],
                                                                });
                                                            }}
                                                        />
                                                    </WrapItem>
                                                </>
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
                                dispatcher(setFilter(DEFAULT_FILTER));
                                _setFilter(DEFAULT_FILTER);
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
                            pointerEvents={!isFilterAcitve ? 'none' : 'auto'}
                            bgColor={isFilterAcitve ? 'black' : '#c2c2c2'}
                            color='white'
                            data-test-id='find-recipe-button'
                            disabled={!isFilterAcitve}
                            onClick={() => {
                                dispatcher(setFilter(_filter));
                                dispatcher(setIsSearch(true));
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
    items,
    isExcludeAllergens,
    onChangeExcludeAllergens,
    onAddCustomAllergen,
}: {
    items: SelectItem[];
    isExcludeAllergens: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeExcludeAllergens: (isExclude: boolean) => void;
    onAddCustomAllergen: (allergen: SelectItem) => void;
}) => {
    const { getString } = useResource();
    const countSelectedAllergens = items.filter((item) => item.selected === true).length;
    const [customAllergen, setCustomAllergen] = useState('');

    const onAddCustomItem = (customAllergen: string) => {
        let formattedItem = customAllergen.trim().toLocaleLowerCase();
        if (!formattedItem) return;
        formattedItem = formattedItem[0].toLocaleUpperCase() + formattedItem.substring(1);
        onAddCustomAllergen({ title: formattedItem, selected: true });
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
                        onChange={() => onChangeExcludeAllergens(!isExcludeAllergens)}
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
                                                {items
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
                                {items.map((item, i) => (
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
                                            }}
                                            mr={2}
                                        >
                                            <Text textStyle='textSmLh5'>{item.title}</Text>
                                        </Checkbox>
                                    </MenuItem>
                                ))}

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
