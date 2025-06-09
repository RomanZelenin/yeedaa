import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
    Button,
    Checkbox,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Tag,
    TagLabel,
    Text,
    Wrap,
} from '@chakra-ui/react';
import { useMemo } from 'react';

import { SelectItem } from '~/app/features/filters/filtersSlice';

import { useResource } from '../ResourceContext/ResourceContext';

export const MultiSelectDropdown = ({
    id,
    onChange,
    items,
    placeholder,
}: {
    id?: string;
    placeholder: string;
    items: SelectItem[];
    onChange: (e: React.ChangeEvent<HTMLInputElement>, id?: string) => void;
}) => {
    const { getString } = useResource();
    const selectedItems = useMemo(() => items.filter((it) => it.selected), [items]);

    return (
        <Menu closeOnSelect={false}>
            {({ isOpen }) => (
                <>
                    <MenuButton
                        data-test-id={`filter-menu-button-${id}`}
                        as={Button}
                        variant='lime'
                        rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                        w='100%'
                        alignItems='start'
                        h='fit-content'
                        py='8px'
                        px='12px'
                        textAlign='start'
                    >
                        {selectedItems.length === 0 ? (
                            placeholder
                        ) : (
                            <>
                                <Wrap>
                                    {selectedItems.slice(0, 3).map((item, i) => (
                                        <Tag
                                            key={i}
                                            color='lime.600'
                                            border='1px solid var(--chakra-colors-lime-400)'
                                            bgColor='transparent'
                                            borderRadius='6px'
                                        >
                                            <TagLabel>
                                                {i < 2
                                                    ? getString(item.title)
                                                    : `+${selectedItems.length - 2}`}
                                            </TagLabel>
                                        </Tag>
                                    ))}
                                </Wrap>
                            </>
                        )}
                    </MenuButton>
                    <MenuList zIndex='popover' py='4px' maxH='350px' overflowY='auto'>
                        {items.map((it, i) => (
                            <MenuItem
                                h='32px'
                                py='6px'
                                px='16px'
                                key={i}
                                value={it.title}
                                bgColor={i % 2 == 0 ? 'blackAlpha.100' : 'white'}
                            >
                                <Checkbox
                                    data-test-id={`checkbox-${getString(it.title).toLocaleLowerCase()}`}
                                    variant='lime'
                                    value={it.title}
                                    isChecked={it.selected}
                                    onChange={(e) => onChange(e, it._id)}
                                    mr={2}
                                >
                                    <Text textStyle='textSmLh5'>{getString(it.title)}</Text>
                                </Checkbox>
                            </MenuItem>
                        ))}
                    </MenuList>
                </>
            )}
        </Menu>
    );
};
