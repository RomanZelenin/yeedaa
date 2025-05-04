import { CloseIcon, SearchIcon } from '@chakra-ui/icons';
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
import { useEffect, useState } from 'react';

import { filterSelector } from '~/app/features/filters/filtersSlice';
import { FilterDrawer } from '~/common/components/Drawer/FilterDrawer';
import { FilterIcon } from '~/common/components/Icons/FilterIcon';
import { useResource } from '~/common/components/ResourceContext/ResourceContext';
import { AllergySelectorWithSwitcher } from '~/common/components/Selector /AllergySelectorWithSwitcher';
import {
    ERR_RECEPIES_NOT_FOUND,
    errorSelector,
    querySelector,
    setAppError,
    setAppQuery,
} from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

export default function HeaderContainer({ title, subtitle }: { title: string; subtitle?: string }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isSearchInputInFocus, setIsSearchInputActive] = useState(false);
    const { getString } = useResource();
    const dispatch = useAppDispatch();
    const [query, setQuery] = useState(useAppSelector(querySelector));
    const error = useAppSelector(errorSelector);

    const [searchIsActive, setSearchIsActive] = useState(false);
    const filter = useAppSelector(filterSelector);
    const countSelectedAllergens = filter.allergens.filter((it) => it.selected).length;

    useEffect(() => {
        if (query.length >= 3 || countSelectedAllergens > 0) {
            setSearchIsActive(true);
        } else {
            setSearchIsActive(false);
        }
    }, [query, countSelectedAllergens]);

    return (
        <VStack
            spacing={0}
            pb={{ base: '16px', lg: '32px' }}
            px={{ base: '16px', md: '0px' }}
            borderRadius={{ base: '0px 0px 8px 8px', xl: '0px 0px 24px 24px' }}
            boxShadow={
                isSearchInputInFocus
                    ? '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)'
                    : 'none'
            }
        >
            <Box>
                <Text textStyle='headerContainerTitle'>{title}</Text>
                <Text
                    display={subtitle ? 'box' : 'none'}
                    textStyle='headerContainerSubtitle'
                    marginTop={{ base: '16px', lg: '20px' }}
                >
                    {subtitle}
                </Text>
            </Box>
            <Flex
                columnGap='8px'
                width={{ base: '100%', lg: '33em' }}
                mt={{ base: '16px', lg: '32px' }}
                justify='center'
            >
                <IconButton
                    data-test-id='filter-button'
                    minW={0}
                    boxSize={{ base: '32px', lg: '48px' }}
                    border=' 1px solid'
                    borderColor='blackAlpha.600'
                    borderRadius='6px'
                    icon={<FilterIcon boxSize={{ base: '14px', lg: '24px' }} />}
                    aria-label='Filter'
                    bgColor='transparent'
                    onClick={onOpen}
                />

                <InputGroup flex={{ base: 1, md: 0.7, lg: 1 }}>
                    <Input
                        data-test-id='search-input'
                        borderRadius='4px'
                        border='1px solid'
                        borderColor={error === ERR_RECEPIES_NOT_FOUND ? 'red' : 'blackAlpha.600'}
                        _hover={{
                            borderColor:
                                error === ERR_RECEPIES_NOT_FOUND ? 'red' : 'blackAlpha.600',
                        }}
                        _focusVisible={{
                            borderColor:
                                error === ERR_RECEPIES_NOT_FOUND ? 'red' : 'blackAlpha.600',
                        }}
                        textStyle='searchInput'
                        placeholder={`${getString('name_or_ingredient')}...`}
                        value={query}
                        onFocus={() => setIsSearchInputActive(true)}
                        onBlur={() => setIsSearchInputActive(false)}
                        onInput={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && query.length >= 3) {
                                dispatch(setAppQuery(query));
                            }
                        }}
                        h='100%'
                        pr={{ base: '50px', lg: '60px' }}
                    />
                    <InputRightElement
                        alignItems='center'
                        columnGap={{ base: '8px', lg: '26px' }}
                        h='100%'
                    >
                        <IconButton
                            visibility={query.length > 0 ? 'visible' : 'hidden'}
                            minW={0}
                            onClick={() => {
                                setQuery('');
                                dispatch(setAppQuery(''));
                                dispatch(setAppError(null));
                            }}
                            flex={1}
                            icon={<CloseIcon boxSize={{ base: '8px', lg: '10px' }} />}
                            aria-label='Clear query'
                            bgColor='transparent'
                        />
                        <IconButton
                            minW={0}
                            pr={{ base: '10px', lg: '28px' }}
                            data-test-id='search-button'
                            backgroundColor='transparent'
                            _hover={{
                                backgroundColor: 'transparent',
                            }}
                            pointerEvents={!searchIsActive ? 'none' : 'auto'}
                            icon={<SearchIcon minW={0} boxSize={{ base: '16px', lg: '20px' }} />}
                            aria-label='Search'
                            isDisabled={!searchIsActive}
                            onClick={() => dispatch(setAppQuery(query))}
                        />
                    </InputRightElement>
                </InputGroup>
            </Flex>
            <HStack display={{ base: 'none', lg: 'flex' }} spacing='16px' mt='16px' w='33em'>
                <AllergySelectorWithSwitcher />
            </HStack>
            <FilterDrawer isOpen={isOpen} onClose={onClose} />
        </VStack>
    );
}
