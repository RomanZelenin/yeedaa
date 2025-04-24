import {
    Box,
    Flex,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { createContext, useContext, useState } from 'react';

import { FilterDrawer } from '~/components/Drawer/FilterDrawer';
import { FilterIcon } from '~/components/Icons/FilterIcon';
import { SearchIcon } from '~/components/Icons/SearchIcon';
import { AllergySelectorWithSwitcher } from '~/components/Selector /AllergySelectorWithSwitcher';

export default function HeaderContainer({ title, subtitle }: { title: string; subtitle?: string }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isActive] = useState(true);
    const { setQuery } = useContext(SearchContext);
    const [inputQuery, setInputQuery] = useState('');

    return (
        <VStack
            spacing={0}
            pb={{ base: '16px', lg: '32px' }}
            borderRadius={isActive ? '0px 0px 8px 8px' : 'unset'}
            boxShadow={
                isActive
                    ? '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)'
                    : 'none'
            }
        >
            <Box>
                <Text textStyle='headerContainerTitle'>{title}</Text>
                <Text
                    display={typeof subtitle === 'string' ? 'box' : 'none'}
                    textStyle='headerContainerSubtitle'
                    marginTop={{ base: '16px', lg: '20px' }}
                >
                    {subtitle}
                </Text>
            </Box>
            <Flex
                columnGap='8px'
                width={{ base: '100%', lg: '31em' }}
                mt={{ base: '16px', lg: '32px' }}
                justify='center'
            >
                <IconButton
                    data-test-id='filter-button'
                    minW={0}
                    borderRadius='6px'
                    boxSize={{ base: '32px', lg: '48px' }}
                    border=' 1px solid rgba(0, 0, 0, 0.48)'
                    icon={<FilterIcon boxSize={{ base: '14px', lg: '24px' }} />}
                    aria-label='Filter'
                    bgColor='transparent'
                    onClick={onOpen}
                />

                <InputGroup flex={{ base: 1, md: 0.7, lg: 1 }}>
                    <Input
                        data-test-id='search-input'
                        borderRadius='4px'
                        border='1px solid rgba(0, 0, 0, 0.48)'
                        textStyle='searchInput'
                        placeholder='Название или ингредиент...'
                        /* onFocus={() => setIsActive(true)}
                        onBlur={() => setIsActive(false)} */
                        onInput={(e) => {
                            setInputQuery(e.target.value);
                        }}
                        h='100%'
                    />
                    <InputRightElement
                        alignSelf='anchor-center'
                        boxSize={{ base: '32px', lg: '48px' }}
                    >
                        <IconButton
                            data-test-id='search-button'
                            backgroundColor='transparent'
                            _hover={{
                                backgroundColor: 'transparent',
                            }}
                            pointerEvents={inputQuery.length < 3 ? 'none' : 'auto'}
                            icon={<SearchIcon boxSize={{ base: '32px', lg: '48px' }} />}
                            aria-label='Search'
                            isDisabled={inputQuery.length < 3}
                            onClick={() => setQuery(inputQuery)}
                        />
                    </InputRightElement>
                </InputGroup>
            </Flex>
            <HStack display={{ base: 'none', lg: 'flex' }} spacing='16px' mt='16px' w='31em'>
                <AllergySelectorWithSwitcher />
            </HStack>
            <FilterDrawer isOpen={isOpen} onClose={onClose} />
        </VStack>
    );
}

export const SearchContext = createContext({});
