import { ChevronDownIcon, ChevronUpIcon, CloseIcon } from '@chakra-ui/icons';
import {
    Button,
    Checkbox,
    HStack,
    IconButton,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Tag,
    TagLabel,
    Text,
    Wrap,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';

import { PlusIcon } from '../Icons/PlusIcon';

type SelectProps = {
    items: { title: string; selected: boolean }[];
    placeholder?: string;
    addItemPlaceholder?: string;
    isShowAddItemInput?: boolean;
    onClickClearAll: () => undefined;
    onAddCustomItem?: (item: string) => undefined;
    isDisabled: boolean;
    onSelect: (item: { title: string; selected: boolean }) => undefined;
};

export const Selector = ({
    items,
    placeholder,
    addItemPlaceholder = '',
    isShowAddItemInput = false,
    isDisabled,
    onClickClearAll = () => {},
    onAddCustomItem = () => {},
    onSelect,
}: SelectProps) => {
    const [customAllergen, setCustomAllergen] = useState('');
    const countSelectedAllergens = items.filter((item) => item.selected === true).length;

    const refInput = useRef(null);
    return (
        <Menu closeOnSelect={false}>
            {({ isOpen }) => (
                <>
                    <MenuButton
                        data-test-id='allergens-menu-button'
                        as={Button}
                        variant='lime'
                        rightIcon={
                            <HStack spacing={0}>
                                <IconButton
                                    as='span'
                                    onClick={(e) => {
                                        onClickClearAll();
                                        e.stopPropagation();
                                    }}
                                    display={countSelectedAllergens > 0 ? 'inline-flex' : 'none'}
                                    backgroundColor='transparent'
                                    minW={0}
                                    boxSize='8px'
                                    icon={<CloseIcon boxSize='8px' />}
                                    aria-label='Clear items'
                                />
                                {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                            </HStack>
                        }
                        w='100%'
                        alignItems='start'
                        h='fit-content'
                        py='8px'
                        px='12px'
                        isDisabled={isDisabled}
                        textAlign='start'
                    >
                        {countSelectedAllergens === 0 ? (
                            placeholder
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
                                    data-test-id={isOpen ? `allergen-${i}` : ''}
                                    variant='lime'
                                    isChecked={item.selected}
                                    onChange={() => onSelect(item)}
                                    mr={2}
                                >
                                    <Text textStyle='textSmLh5'>{item.title}</Text>
                                </Checkbox>
                            </MenuItem>
                        ))}
                        <HStack
                            display={isShowAddItemInput ? 'flex' : 'none'}
                            spacing='8px'
                            p='8px'
                        >
                            <Input
                                ref={refInput}
                                onBlur={
                                    isOpen
                                        ? () => {
                                              refInput.current?.focus();
                                          }
                                        : () => {}
                                }
                                data-test-id={isOpen ? 'add-other-allergen' : ''}
                                placeholder={addItemPlaceholder}
                                minH={0}
                                ml='24px'
                                h='32px'
                                py='6px'
                                px='12px'
                                fontSize='14px'
                                lineHeight='20px'
                                fontWeight={400}
                                value={customAllergen}
                                border='1px solid'
                                borderColor='blackAlpha.200'
                                _hover={{
                                    borderColor: 'blackAlpha.200',
                                }}
                                _focusVisible={{
                                    borderColor: 'blackAlpha.200',
                                }}
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
    );
};
