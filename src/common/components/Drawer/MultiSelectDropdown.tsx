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
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    const { getString } = useResource();

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
                        {items.filter((it) => it.selected).length === 0 ? (
                            placeholder
                        ) : (
                            <>
                                <Wrap>
                                    {items
                                        .filter((it) => it.selected)
                                        .map((item, i) => (
                                            <Tag
                                                key={i}
                                                color='lime.600'
                                                border='1px solid var(--chakra-colors-lime-400)'
                                                bgColor='transparent'
                                                borderRadius='6px'
                                            >
                                                <TagLabel>{getString(item.title)}</TagLabel>
                                            </Tag>
                                        ))}
                                </Wrap>
                            </>
                        )}
                    </MenuButton>

                    <MenuList flex={1} zIndex='popover' py='4px'>
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
                                    onChange={onChange}
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
