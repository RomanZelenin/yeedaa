import { CloseIcon, SearchIcon } from '@chakra-ui/icons';
import {
    Box,
    Center,
    Flex,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Show,
    Spinner,
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
    Error,
    isSearchSelector,
    notificationSelector,
    querySelector,
    recipesSelector,
    removeNotification,
    setAppQuery,
    setIsSearch,
    setRecepies,
} from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

export default function HeaderContainer({ title, subtitle }: { title: string; subtitle?: string }) {
    const dispatcher = useAppDispatch();
    const { getString } = useResource();
    const {
        isOpen: filterDrawerIsOpen,
        onOpen: filterDrawerOnOpen,
        onClose: filterDrawerOnClose,
    } = useDisclosure();

    const [isSearchInputInFocus, setIsSearchInputActive] = useState(false);
    const countRecipes = useAppSelector(recipesSelector).length;
    const isSearch = useAppSelector(isSearchSelector);
    const [searchIsActive, setSearchIsActive] = useState(false);

    const query = useAppSelector(querySelector);
    const [inputQuery, setInputQuery] = useState(query);
    useEffect(() => {
        setInputQuery(query);
    }, [query]);

    //const error = useAppSelector(errorSelector);
    const notification = useAppSelector(notificationSelector);
    const filter = useAppSelector(filterSelector);
    const allergens = filter.allergens
        .filter((allergen) => allergen.selected)
        .map((allergen) => allergen.title);

    useEffect(() => {
        if (inputQuery.length >= 3 || allergens.length > 0) {
            setSearchIsActive(true);
        } else {
            setSearchIsActive(false);
        }
    }, [inputQuery, allergens]);

    return (
        <VStack
            spacing={0}
            pb={{ base: '16px', lg: '32px' }}
            px={{ base: '16px', md: '0px' }}
            borderRadius={{ base: '0px 0px 8px 8px', xl: '0px 0px 24px 24px' }}
            boxShadow={
                isSearchInputInFocus || isSearch
                    ? '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)'
                    : 'none'
            }
        >
            <Box textAlign='center'>
                {notification?.title === Error.RECEPIES_NOT_FOUND ? (
                    <>
                        <Text textStyle='textMdLh6Semibold'>
                            По вашему запросу ничего не найдено.
                        </Text>
                        <Text textStyle='textMdLh6Semibold'>Попробуйте другой запрос</Text>
                    </>
                ) : (
                    <>
                        <Text textStyle='headerContainerTitle'>{title}</Text>
                        <Text
                            display={subtitle ? 'box' : 'none'}
                            textStyle='headerContainerSubtitle'
                            marginTop={{ base: '16px', lg: '20px' }}
                        >
                            {subtitle}
                        </Text>
                    </>
                )}
            </Box>

            <VStack
                display={isSearch ? 'none' : 'flex'}
                width={{ base: '100%', lg: '33em' }}
                mt={{ base: '16px', lg: '32px' }}
            >
                <Flex columnGap='8px' width={{ base: '100%', lg: '33em' }} justify='center'>
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
                        onClick={filterDrawerOnOpen}
                    />

                    <InputGroup flex={{ base: 1, md: 0.7, lg: 1 }}>
                        <Input
                            autoFocus
                            data-test-id='search-input'
                            borderRadius='4px'
                            border='1px solid'
                            borderColor={countRecipes > 0 ? 'lime.600' : 'blackAlpha.600'}
                            _hover={{
                                borderColor: countRecipes > 0 ? 'lime.600' : 'blackAlpha.600',
                            }}
                            _focusVisible={{
                                borderColor: countRecipes > 0 ? 'lime.600' : 'blackAlpha.600',
                            }}
                            textStyle='searchInput'
                            placeholder={`${getString('name_or_ingredient')}...`}
                            value={inputQuery}
                            onFocus={() => setIsSearchInputActive(true)}
                            onBlur={() => setIsSearchInputActive(false)}
                            onInput={(e) => {
                                dispatcher(removeNotification());
                                dispatcher(setRecepies([]));
                                setInputQuery((e.target as HTMLInputElement).value);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && inputQuery.length >= 3) {
                                    dispatcher(setIsSearch(true));
                                    dispatcher(setAppQuery(inputQuery));
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
                                visibility={inputQuery.length > 0 ? 'visible' : 'hidden'}
                                minW={0}
                                onClick={() => {
                                    setInputQuery('');
                                    dispatcher(setAppQuery(''));
                                    dispatcher(removeNotification());
                                    dispatcher(setRecepies([]));
                                }}
                                flex={1}
                                icon={<CloseIcon boxSize={{ base: '8px', lg: '10px' }} />}
                                aria-label='Clear query input'
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
                                icon={
                                    <SearchIcon minW={0} boxSize={{ base: '16px', lg: '20px' }} />
                                }
                                aria-label='Search'
                                isDisabled={!searchIsActive}
                                onClick={() => {
                                    dispatcher(setIsSearch(true));
                                    dispatcher(setAppQuery(inputQuery));
                                }}
                            />
                        </InputRightElement>
                    </InputGroup>
                </Flex>
                <Show above='lg'>
                    <HStack spacing='16px' mt='16px' w='33em'>
                        <AllergySelectorWithSwitcher />
                    </HStack>
                </Show>
            </VStack>
            <Center
                data-test-id='loader-search-block'
                boxSize='134px'
                display={isSearch ? 'flex' : 'none'}
                bgGradient='radial(30% 30% at 50% 50%, rgba(196, 255, 97, 0.7) 0%, rgba(255, 255, 255, 0) 100%) lime.50'
            >
                <Spinner size='lg' boxSize='24px' minW={0} />
            </Center>
            <FilterDrawer isOpen={filterDrawerIsOpen} onClose={filterDrawerOnClose} />
        </VStack>
    );
}
