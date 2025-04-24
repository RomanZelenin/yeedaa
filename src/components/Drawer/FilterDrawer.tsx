import { CloseIcon } from '@chakra-ui/icons';
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
    IconButton,
    Stack,
    Tag,
    TagCloseButton,
    TagLabel,
    Text,
    VStack,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';
import { useState } from 'react';

import { DrawerComponentProps } from '../Menu/HamburgerMenu';
import { AllergySelectorWithSwitcher } from '../Selector /AllergySelectorWithSwitcher';
import { Selector } from '../Selector /Selector';

const meat = ['Курица', 'Свинина', 'Говядина', 'Индейка', 'Утка'];
const garnish = [
    'Картошка',
    'Гречка',
    'Паста',
    'Спагетти',
    'Рис',
    'Капуста',
    'Фасоль',
    'Другие овощи',
];

export const FilterDrawer = ({ isOpen, onClose }: DrawerComponentProps) => {
    const [filter, setFilter] = useState<string[]>([]);

    const onChangeCheckboxGroup = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? setFilter([...filter, e.target.value])
            : setFilter(filter.filter((it) => it !== e.target.value));
    };

    return (
        <>
            <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent
                    h='100vh'
                    p={{ base: '16px' }}
                    w='500px'
                    data-test-id='filter-drawer'
                >
                    <DrawerHeader p={0}>
                        <Flex align='center'>
                            <Text textStyle='text2xlLh8Bold' flex={1}>
                                Фильтр
                            </Text>
                            <IconButton
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

                    <DrawerBody mt={{ base: '16px' }}>
                        <VStack spacing='24px'>
                            <CategorySelector />
                            <AuthorSelector />

                            <CustomCheckboxGroup
                                title='Тип мяса:'
                                items={meat}
                                selectedItems={filter}
                                onChange={onChangeCheckboxGroup}
                            />

                            <CustomCheckboxGroup
                                title='Тип гарнира:'
                                items={garnish}
                                selectedItems={filter}
                                onChange={onChangeCheckboxGroup}
                            />

                            <AllergySelectorWithSwitcher />

                            <Wrap flex={1} w='100%' spacing='8px'>
                                {filter.map((it) => (
                                    <WrapItem>
                                        <TagWithCloseButton
                                            label={it}
                                            onClose={() => {
                                                setFilter(
                                                    filter.filter(
                                                        (filterItem) => it !== filterItem,
                                                    ),
                                                );
                                            }}
                                        />
                                    </WrapItem>
                                ))}
                            </Wrap>
                        </VStack>
                    </DrawerBody>

                    <DrawerFooter p={0}>
                        <Button
                            flex={1}
                            h='32px'
                            px='12px'
                            py='6px'
                            variant='outline'
                            mr={3}
                            data-test-id='clear-filter-button'
                        >
                            <Text
                                textStyle={{ base: 'textSmLh5Semibold', lg: 'textLgLh7Semibold' }}
                            >
                                Очистить Фильтр
                            </Text>
                        </Button>
                        <Button
                            flex={1}
                            h='32px'
                            px='12px'
                            py='6px'
                            bgColor='black'
                            color='white'
                            data-test-id='find-recipe-button'
                        >
                            <Text
                                textStyle={{ base: 'textSmLh5Semibold', lg: 'textLgLh7Semibold' }}
                                onClick={onClose}
                            >
                                Найти рецепт
                            </Text>
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};

const CategorySelector = () => (
    <Selector
        data-test-id='filter-menu-button-категория'
        defaultItems={['Первые блюда', 'Вторые блюда', 'Веганская кухня']}
        placeholder='Категория'
    />
);

const AuthorSelector = () => (
    <Selector
        defaultItems={['Елена Мин', 'Мирием Чонишвили', 'Елена Прекрасная']}
        placeholder='Поиск по автору'
    />
);

interface CustomTagProps {
    label: string;
    onClose: () => void;
    bgColor?: string;
    textColor?: string;
    size?: 'sm' | 'md' | 'lg';
    borderRadius?: string;
}

const TagWithCloseButton = ({
    label,
    onClose,
    bgColor = 'lime.400',
    textColor = 'lime.700',
    size = 'md',
    borderRadius = '6px',
}: CustomTagProps) => (
    <Tag
        size={size}
        borderRadius={borderRadius}
        variant='subtle'
        bgColor={bgColor}
        fontWeight='medium'
    >
        <TagLabel>
            <Text color={textColor}>{label}</Text>
        </TagLabel>
        <TagCloseButton color={textColor} onClick={onClose} />
    </Tag>
);

const CustomCheckboxGroup = ({
    title,
    selectedItems,
    items,
    onChange,
}: {
    title: string;
    selectedItems: string[];
    items: string[];
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
    <>
        <CheckboxGroup value={selectedItems}>
            <Stack direction='column' spacing='12px' width='100%'>
                <Text textStyle='textMdLh6Medium'>{title}</Text>
                {items.map((it) => (
                    <Checkbox
                        onChange={onChange}
                        value={it}
                        variant='lime'
                        size='md'
                        colorScheme='green'
                    >
                        <Text textStyle='textSmLh5Normal'>{it}</Text>
                    </Checkbox>
                ))}
            </Stack>
        </CheckboxGroup>
    </>
);
