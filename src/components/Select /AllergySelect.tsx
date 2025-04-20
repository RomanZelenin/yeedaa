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

const allergens = [
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

export const AllergySelect = ({ isEnabled }: { isEnabled: boolean }) => {
    const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);

    const inputAllergen = useRef(null);

    const handleToggleAllergen = (allergen: string) => {
        setSelectedAllergens((prev) =>
            prev.includes(allergen) ? prev.filter((a) => a !== allergen) : [...prev, allergen],
        );
    };

    const addToAllergens = (allergen: string) => {
        let tmp = allergen.trim().toLocaleLowerCase();
        tmp = tmp[0].toLocaleUpperCase() + tmp.substring(1);
        if (!selectedAllergens.includes(tmp)) {
            setSelectedAllergens([...selectedAllergens, tmp]);
        }
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
                                    onClick={(e) => {
                                        setSelectedAllergens([]);
                                        e.stopPropagation();
                                    }}
                                    display={selectedAllergens.length > 0 ? 'inline-flex' : 'none'}
                                    backgroundColor='transparent'
                                    minW={0}
                                    boxSize='8px'
                                    icon={<CloseIcon boxSize='8px' />}
                                    aria-label='clear allergens'
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
                    >
                        {selectedAllergens.length === 0 ? (
                            'Выберите из списка...'
                        ) : (
                            <>
                                {selectedAllergens.length > 0 && (
                                    <Wrap>
                                        {selectedAllergens.map((allergen) => (
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

                    <MenuList overflowY='auto' zIndex={9999} py='4px'>
                        {allergens.map((allergen, idx) => (
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
                                    isChecked={selectedAllergens.includes(allergen)}
                                    onChange={() => handleToggleAllergen(allergen)}
                                    mr={2}
                                >
                                    <Text textStyle='textSmLh5'>{allergen}</Text>
                                </Checkbox>
                            </MenuItem>
                        ))}
                        <HStack p='8px' spacing='8px'>
                            <Input
                                ref={inputAllergen}
                                minH={0}
                                ml='24px'
                                h='32px'
                                py='6px'
                                px='12px'
                                fontSize='14px'
                                lineHeight='20px'
                                fontWeight={400}
                                borderRadius='4px'
                                borderColor='blackAlpha.200'
                                color='lime.800'
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        addToAllergens(inputAllergen.current.value);
                                    }
                                }}
                            />
                            <IconButton
                                bgColor='transparent'
                                minW={0}
                                flex='1 0 auto'
                                boxSize='24px'
                                aria-label='Add allergen'
                                icon={<PlusIcon boxSize='12px' />}
                                onClick={() => {
                                    addToAllergens(inputAllergen.current.value);
                                }}
                            />
                        </HStack>
                    </MenuList>
                </>
            )}
        </Menu>
    );
};
