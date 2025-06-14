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

import { Filter, filterSelector, setFilter } from '~/app/features/filters/filtersSlice';
import { FilterDrawer } from '~/common/components/Drawer/FilterDrawer';
import { FilterIcon } from '~/common/components/Icons/FilterIcon';
import { useResource } from '~/common/components/ResourceContext/ResourceContext';
import { AllergySelectorWithSwitcher } from '~/common/components/Selector /AllergySelectorWithSwitcher';
import { useLazyGetRecipeQuery } from '~/query/create-recipe-api';
import { RecipeQuery } from '~/query/types';
import {
    Error,
    recipesSelector,
    setAppQuery,
    setNotification,
    setRecepies,
} from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

export default function HeaderContainer({ title, subtitle }: { title: string; subtitle?: string }) {
    const dispatch = useAppDispatch();
    const { getString } = useResource();
    const {
        isOpen: filterDrawerIsOpen,
        onOpen: filterDrawerOnOpen,
        onClose: filterDrawerOnClose,
    } = useDisclosure();

    //const { category: categoryName, subcategory: subcategoryName } = useParams();
    const [isSearchInputInFocus, setIsSearchInputActive] = useState(false);
    const countRecipes = useAppSelector(recipesSelector).length;
    const [searchIsActive, setSearchIsActive] = useState(false);
    const [isRecipesNotFound, setIsRecipesNotFound] = useState(false);
    const [inputQuery, setInputQuery] = useState('');
    const [isLoadingRecipes, setIsLoadingRecipes] = useState(false);

    const filter = useAppSelector(filterSelector);
    const query = parseFilterToQuery(filter, inputQuery);

    useEffect(() => {
        setSearchIsActive(
            inputQuery.length >= 3 ||
                (query.allergens !== undefined && query.allergens!.length > 0),
        );
        if (inputQuery.length === 0) {
            dispatch(setRecepies([]));
        }
        /*  if (filter.allergens.length > 0) {
            handleSearchRecipes(query)
        }  */
    }, [inputQuery.length, query.allergens]);

    const [fetchRecipes] = useLazyGetRecipeQuery();
    const handleSearchRecipes = async (query: Partial<RecipeQuery>) => {
        try {
            setIsRecipesNotFound(false);
            setIsLoadingRecipes(true);
            dispatch(setAppQuery(query.searchString ?? ''));
            const result = await fetchRecipes(query).unwrap();
            if (result.data.length === 0) {
                setIsRecipesNotFound(true);
            }
            dispatch(setRecepies(result.data));
        } catch (_error) {
            dispatch(
                setNotification({
                    _id: crypto.randomUUID(),
                    title: Error.SERVER,
                    message: 'Попробуйте поискать снова попозже',
                    type: 'error',
                }),
            );
            setInputQuery('');
            dispatch(setRecepies([]));
        } finally {
            setIsLoadingRecipes(false);
        }
    };
    return (
        <VStack
            spacing={0}
            pb={{ base: '16px', lg: '32px' }}
            px={{ base: '16px', md: '0px' }}
            borderRadius={{ base: '0px 0px 8px 8px', xl: '0px 0px 24px 24px' }}
            boxShadow={
                isSearchInputInFocus || isLoadingRecipes
                    ? '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)'
                    : 'none'
            }
        >
            <Box textAlign='center'>
                {isRecipesNotFound ? (
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
                display={isLoadingRecipes ? 'none' : 'flex'}
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
                                setInputQuery((e.target as HTMLInputElement).value);
                            }}
                            onKeyDown={async (e) => {
                                if (e.key === 'Enter' && inputQuery.length >= 3) {
                                    await handleSearchRecipes(query);
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
                                    setIsRecipesNotFound(false);
                                    dispatch(setRecepies([]));
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
                                onClick={async () => {
                                    await handleSearchRecipes(query);
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
                display={isLoadingRecipes ? 'flex' : 'none'}
                bgGradient='radial(30% 30% at 50% 50%, rgba(196, 255, 97, 0.7) 0%, rgba(255, 255, 255, 0) 100%) lime.50'
            >
                <Spinner size='lg' boxSize='24px' minW={0} />
            </Center>
            <FilterDrawer
                isOpen={filterDrawerIsOpen}
                onClose={filterDrawerOnClose}
                onClickClearFilter={async (_filter) => {}}
                onClickFindRecipe={async (filter) => {
                    dispatch(setFilter(filter));
                    const query = parseFilterToQuery(filter, inputQuery);
                    handleSearchRecipes(query);
                    filterDrawerOnClose();
                }}
            />
        </VStack>
    );
}

const parseFilterToQuery = (filter: Filter, searchString: string) => {
    const { subcategoriesIds, allergens, garnish, meat } = {
        subcategoriesIds: filter.categories
            .filter((it) => it.selected)
            .map((it) => it._id)
            .join(','),
        allergens: filter.allergens
            .filter((it) => it.selected)
            .map((it) => it.title)
            .join(','),
        garnish: filter.side
            .filter((it) => it.selected)
            .map((it) => it.title)
            .join(','),
        meat: filter.meat
            .filter((it) => it.selected)
            .map((it) => it.title)
            .join(','),
    };

    const query = {
        searchString: searchString.length > 0 ? searchString : undefined,
        allergens: allergens.length > 0 ? allergens : undefined,
        subcategoriesIds: subcategoriesIds.length > 0 ? subcategoriesIds : undefined,
        garnish: garnish.length > 0 ? garnish : undefined,
        meat: meat.length > 0 ? meat : undefined,
    };

    return query;
};
