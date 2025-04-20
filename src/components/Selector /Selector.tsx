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
import { useState } from 'react';

import { PlusIcon } from '../Icons/PlusIcon';

type SelectProps = {
    isEnabled?: boolean;
    initialSelected?: string[];
    onChange?: (selected: string[]) => void;
    placeholder?: string;
    defaultItems?: string[];
    addItemPlaceholder?: string;
    isShowAddItemInput?: boolean;
};

export const Selector = ({
    isEnabled = true,
    initialSelected = [],
    onChange,
    placeholder,
    defaultItems = [],
    addItemPlaceholder = '',
    isShowAddItemInput = false,
}: SelectProps) => {
    const [selectedItems, setSelectedItems] = useState<string[]>(initialSelected);
    const [customItem, setCustomItem] = useState('');

    const handleToggleItem = (item: string) => {
        const newSelected = selectedItems.includes(item)
            ? selectedItems.filter((a) => a !== item)
            : [...selectedItems, item];

        setSelectedItems(newSelected);
        onChange?.(newSelected);
    };

    const addCustomItem = () => {
        if (!customItem.trim()) return;

        let formattedItem = customItem.trim().toLocaleLowerCase();
        formattedItem = formattedItem[0].toLocaleUpperCase() + formattedItem.substring(1);

        if (!selectedItems.includes(formattedItem)) {
            const newSelected = [...selectedItems, formattedItem];
            setSelectedItems(newSelected);
            onChange?.(newSelected);
            setCustomItem('');
        }
    };

    const clearAll = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedItems([]);
        onChange?.([]);
    };

    return (
        <Menu closeOnSelect={false}>
            {({ isOpen }) => (
                <>
                    <MenuButton
                        as={Button}
                        variant='lime'
                        rightIcon={
                            <HStack spacing={0}>
                                <IconButton
                                    as='span'
                                    onClick={clearAll}
                                    display={selectedItems.length > 0 ? 'inline-flex' : 'none'}
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
                        isDisabled={!isEnabled}
                        textAlign='start'
                    >
                        {selectedItems.length === 0 ? (
                            placeholder
                        ) : (
                            <>
                                {selectedItems.length > 0 && (
                                    <Wrap>
                                        {selectedItems.map((allergen) => (
                                            <Tag
                                                key={allergen}
                                                color='lime.600'
                                                border='1px solid var(--chakra-colors-lime-400)'
                                                bgColor='transparent'
                                                borderRadius='6px'
                                            >
                                                <TagLabel>{allergen}</TagLabel>
                                            </Tag>
                                        ))}
                                    </Wrap>
                                )}
                            </>
                        )}
                    </MenuButton>

                    <MenuList overflowY='auto' zIndex='popover' py='4px'>
                        {defaultItems.map((allergen, idx) => (
                            <MenuItem
                                h='32px'
                                py='6px'
                                px='16px'
                                key={allergen}
                                value={allergen}
                                bgColor={idx % 2 == 0 ? 'blackAlpha.100' : 'white'}
                            >
                                <Checkbox
                                    variant='lime'
                                    isChecked={selectedItems.includes(allergen)}
                                    onChange={() => handleToggleItem(allergen)}
                                    mr={2}
                                >
                                    <Text textStyle='textSmLh5'>{allergen}</Text>
                                </Checkbox>
                            </MenuItem>
                        ))}
                        <HStack
                            p='8px'
                            spacing='8px'
                            display={isShowAddItemInput ? 'flex' : 'none'}
                        >
                            <Input
                                placeholder={addItemPlaceholder}
                                minH={0}
                                ml='24px'
                                h='32px'
                                py='6px'
                                px='12px'
                                fontSize='14px'
                                lineHeight='20px'
                                fontWeight={400}
                                borderColor='blackAlpha.200'
                                value={customItem}
                                onChange={(e) => setCustomItem(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        addCustomItem();
                                    }
                                }}
                            />
                            <IconButton
                                bgColor='transparent'
                                minW={0}
                                flex='1 0 auto'
                                boxSize='24px'
                                aria-label='Add item'
                                icon={<PlusIcon boxSize='12px' />}
                                onClick={addCustomItem}
                                isDisabled={!customItem.trim()}
                            />
                        </HStack>
                    </MenuList>
                </>
            )}
        </Menu>
    );
};
