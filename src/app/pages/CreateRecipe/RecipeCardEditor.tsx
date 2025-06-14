import {
    Box,
    Flex,
    HStack,
    Image,
    Input,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Stack,
    Text,
    Textarea,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FieldError, FieldErrors, Merge, UseFormRegister } from 'react-hook-form';

import { SelectItem } from '~/app/features/filters/filtersSlice';
import { MultiSelectDropdown } from '~/common/components/Drawer/MultiSelectDropdown';
import { Fallback } from '~/common/components/Fallback/Fallback';
import { useResource } from '~/common/components/ResourceContext/ResourceContext';
import { useGetSubcategories } from '~/common/hooks/useGetSubcategories';

import { RecipieFormData } from './CreateRecipePage';

export const RecipeCardEditor = ({
    onClickImage,
    formErrors,
    register,
    image,
    selectedCategoriesIds,
    onChangeSelectedSubcategories,
}: {
    onClickImage: () => void;
    formErrors: FieldErrors<RecipieFormData>;
    register: UseFormRegister<RecipieFormData>;
    onChangeSelectedSubcategories: (categoriesIds: string[]) => void;
    selectedCategoriesIds: string[];
    image: string;
}) => {
    const { getString } = useResource();
    const getBorderColor = (field?: Merge<FieldError, (FieldError | undefined)[]>) =>
        field !== undefined ? { borderColor: 'rgb(229,62,62)' } : { borderColor: 'blackAlpha.200' };

    const subcategories = useGetSubcategories();
    const [selectItemSubcategories, setSelectItemSubcategories] = useState<SelectItem[]>(() => []);

    useEffect(() => {
        setSelectItemSubcategories(
            subcategories.map((it) => ({
                _id: it._id,
                title: it.title,
                selected: selectedCategoriesIds.includes(it._id),
            })),
        );
    }, [subcategories]);

    useEffect(() => {
        onChangeSelectedSubcategories(
            selectItemSubcategories.filter((it) => it.selected).map((it) => it._id!),
        );
    }, [selectItemSubcategories]);

    const toggleSelectedSubcategory = (idx: number) => {
        setSelectItemSubcategories([
            ...selectItemSubcategories.slice(0, idx),
            {
                ...selectItemSubcategories[idx],
                selected: !selectItemSubcategories[idx].selected,
            },
            ...selectItemSubcategories.slice(idx + 1),
        ]);
    };
    return (
        <Flex
            direction={{ base: 'column', md: 'row' }}
            alignItems={{ md: 'start' }}
            rowGap={{ base: '16px' }}
            columnGap={{ md: '16px' }}
        >
            {image ? (
                <Image
                    data-test-id='recipe-image-block-preview-image'
                    {...register(`image`)}
                    src={image}
                    borderWidth='2px'
                    borderColor='red'
                    /*     onLoad={() => setValue('image', URL.parse(image!)?.pathname)} */
                    onClick={onClickImage}
                    objectFit='cover'
                    borderRadius='8px'
                    w={{ base: '328px', md: '232px', lg: '353px', xl: '553px' }}
                    h={{ base: '224px', xl: '410px' }}
                />
            ) : (
                <Fallback
                    data-test-id='recipe-image-block'
                    borderRadius='8px'
                    onClick={onClickImage}
                    border={formErrors.image && '2px solid red'}
                    width='100%'
                    height={{ base: '224px', xl: '410px' }}
                />
            )}

            <Stack w='100%' alignSelf={{ md: 'stretch' }} spacing={{ base: '16px' }}>
                <HStack>
                    <Text flex={1} textStyle='textMdLh6Semibold'>
                        Выберите не менее 3-х тегов
                    </Text>
                    <Box
                        flex={1}
                        borderRadius='8px'
                        data-test-id='recipe-categories'
                        {...register('categoriesIds')}
                        borderWidth='2px'
                        {...getBorderColor(formErrors.categoriesIds)}
                        _focus={getBorderColor(formErrors.categoriesIds)}
                        _active={getBorderColor(formErrors.categoriesIds)}
                    >
                        <MultiSelectDropdown
                            placeholder={`${getString('select-from-list')}...`}
                            items={selectItemSubcategories}
                            onChange={(_e, i) => toggleSelectedSubcategory(i!)}
                        />
                    </Box>
                </HStack>
                <Input
                    data-test-id='recipe-title'
                    {...register(`title`)}
                    borderWidth='2px'
                    {...getBorderColor(formErrors.title)}
                    _focus={getBorderColor(formErrors.title)}
                    _active={getBorderColor(formErrors.title)}
                    color='blackAlpha.700'
                    placeholder={getString('recipe-name')}
                />
                <Textarea
                    data-test-id='recipe-description'
                    {...register(`description`)}
                    borderWidth='2px'
                    {...getBorderColor(formErrors.description)}
                    _focus={getBorderColor(formErrors.description)}
                    _active={getBorderColor(formErrors.description)}
                    placeholder={getString('brief-description-recipe')}
                />
                <HStack>
                    <Text textStyle='textMdLh6Semibold'>На сколько человек ваш рецепт?</Text>
                    <NumberInput min={1} step={1} w='90px' h='40px'>
                        <NumberInputField
                            data-test-id='recipe-portions'
                            {...register(`portions`)}
                            borderRadius='8px'
                            borderWidth='2px'
                            {...getBorderColor(formErrors.portions)}
                            _focus={getBorderColor(formErrors.portions)}
                            _active={getBorderColor(formErrors.portions)}
                        />
                        <NumberInputStepper>
                            <NumberIncrementStepper data-test-id='increment-stepper' />
                            <NumberDecrementStepper data-test-id='decrement-stepper' />
                        </NumberInputStepper>
                    </NumberInput>
                </HStack>
                <HStack>
                    <Text textStyle='textMdLh6Semibold'>Сколько времени готовить в минутах?</Text>
                    <NumberInput step={1} min={1} w='90px' h='40px'>
                        <NumberInputField
                            data-test-id='recipe-time'
                            {...register(`time`)}
                            borderWidth='2px'
                            {...getBorderColor(formErrors.time)}
                            _focus={getBorderColor(formErrors.time)}
                            _active={getBorderColor(formErrors.time)}
                        />
                        <NumberInputStepper>
                            <NumberIncrementStepper data-test-id='increment-stepper' />
                            <NumberDecrementStepper data-test-id='decrement-stepper' />
                        </NumberInputStepper>
                    </NumberInput>
                </HStack>
            </Stack>
        </Flex>
    );
};
