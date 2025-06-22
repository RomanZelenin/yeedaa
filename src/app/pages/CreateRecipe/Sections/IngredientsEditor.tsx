import { AddIcon } from '@chakra-ui/icons';
import {
    Flex,
    Hide,
    HStack,
    IconButton,
    Input,
    Select,
    Show,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    VStack,
} from '@chakra-ui/react';
import { Fragment } from 'react/jsx-runtime';
import { FieldError, FieldErrors, UseFieldArrayReturn, UseFormRegister } from 'react-hook-form';

import { BasketIcon } from '~/common/components/Icons/BasketIcon';
import { CloseInCircleIcon } from '~/common/components/Icons/CloseInCircleIcon';
import { useResource } from '~/common/components/ResourceContext/ResourceContext';

import { RecipieFormData } from '../CreateRecipePage';

export type MeasureUnit = { _id: string; name: string };
export type IngredientFormData = {
    title: string;
    count: number | null;
    measureUnit: string;
};

export const IngredientsEditor = ({
    ingredients,
    register,
    formErrors,
    measureUnits,
}: {
    ingredients: UseFieldArrayReturn<RecipieFormData, 'ingredients', 'id'>;
    register: UseFormRegister<RecipieFormData>;
    formErrors: FieldErrors<RecipieFormData>;
    measureUnits: MeasureUnit[];
}) => {
    const { getString } = useResource();

    return (
        <>
            <Flex
                w='100%'
                px={{ md: '64px' }}
                direction='column'
                maxW='768px'
                alignSelf='center'
                rowGap={{ base: '24px' }}
            >
                <Text textStyle='textMdLh6Semibold'>
                    {`Добавьте ингредиенты рецепта, нажав на `}
                    <CloseInCircleIcon transform='rotate(45deg)' />
                </Text>

                {/* Desktop */}
                <Show above='md'>
                    <TableContainer whiteSpace='none' overflowX='clip'>
                        <Table variant='unstyled'>
                            <Thead>
                                <Tr>
                                    <Th px='8px'>
                                        <Text
                                            textTransform='none'
                                            textStyle='textXsLh4BoldLsw'
                                            color='lime.600'
                                            textAlign='start'
                                        >
                                            {getString('ingredient')}
                                        </Text>
                                    </Th>
                                    <Th px='0px' isNumeric>
                                        <HStack justify='right'>
                                            <Text
                                                textTransform='none'
                                                textStyle='textXsLh4BoldLsw'
                                                color='lime.600'
                                                textAlign='end'
                                            >
                                                {getString('amount')}
                                            </Text>
                                        </HStack>
                                    </Th>
                                    <Th px='0px'>
                                        <HStack justify='right'>
                                            <Text
                                                textTransform='none'
                                                textStyle='textXsLh4BoldLsw'
                                                color='lime.600'
                                                textAlign='end'
                                            >
                                                {getString('measure-unit')}
                                            </Text>
                                        </HStack>
                                    </Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {ingredients.fields.map((ingridient, i) => (
                                    <Tr key={ingridient.id} p={0}>
                                        <Td p='8px' textStyle='textSmLh5Medium'>
                                            <Input
                                                data-test-id={`recipe-ingredients-title-${i}`}
                                                placeholder='Ингредиент'
                                                {...register(`ingredients.${i}.title`)}
                                                {...getInputStyles(
                                                    formErrors.ingredients?.[i]?.title,
                                                )}
                                            />
                                        </Td>
                                        <Td p='8px'>
                                            <Input
                                                data-test-id={`recipe-ingredients-count-${i}`}
                                                width='80px'
                                                placeholder='100'
                                                {...register(`ingredients.${i}.count`)}
                                                {...getInputStyles(
                                                    formErrors.ingredients?.[i]?.count,
                                                )}
                                                type='number'
                                            />
                                        </Td>
                                        <Td p='8px'>
                                            <Select
                                                {...register(`ingredients.${i}.measureUnit`)}
                                                {...getInputStyles(
                                                    formErrors.ingredients?.[i]?.measureUnit,
                                                )}
                                                data-test-id={`recipe-ingredients-measureUnit-${i}`}
                                                placeholder={getString('measure-unit')}
                                            >
                                                {(Array.isArray(measureUnits)
                                                    ? measureUnits
                                                    : []
                                                ).map(
                                                    (
                                                        measureUnit, //Добавлена проверка Array.isArray(measureUnits) для прохождения теста
                                                    ) => (
                                                        <option
                                                            key={measureUnit._id}
                                                            value={measureUnit.name}
                                                        >
                                                            {measureUnit.name}
                                                        </option>
                                                    ),
                                                )}
                                            </Select>
                                        </Td>
                                        <Td p='8px'>
                                            <IngredientActions
                                                index={i}
                                                totalIngredients={ingredients.fields.length}
                                                onRemove={(i) => ingredients.remove(i)}
                                                onAdd={() =>
                                                    ingredients.append({
                                                        title: '',
                                                        count: null,
                                                        measureUnit: '',
                                                    })
                                                }
                                            />
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Show>

                {/* Mobile */}
                <Hide above='md'>
                    <VStack spacing='12px'>
                        {ingredients.fields.map((ingredient, i) => (
                            <Fragment key={ingredient.id}>
                                <Input
                                    data-test-id={`recipe-ingredients-title-${i}`}
                                    placeholder='Ингредиент'
                                    {...register(`ingredients.${i}.title`)}
                                    {...getInputStyles(formErrors.ingredients?.[i]?.title)}
                                />
                                <HStack spacing='16px' width='100%'>
                                    <Input
                                        data-test-id={`recipe-ingredients-count-${i}`}
                                        width='80px'
                                        placeholder='100'
                                        {...register(`ingredients.${i}.count`)}
                                        {...getInputStyles(formErrors.ingredients?.[i]?.count)}
                                        type='number'
                                    />
                                    <Select
                                        data-test-id={`recipe-ingredients-measureUnit-${i}`}
                                        {...register(`ingredients.${i}.measureUnit`)}
                                        {...getInputStyles(
                                            formErrors.ingredients?.[i]?.measureUnit,
                                        )}
                                        placeholder='Единица измерения'
                                    >
                                        {(Array.isArray(measureUnits) ? measureUnits : []).map(
                                            (
                                                measureUnit, //Добавлена проверка Array.isArray(measureUnits) для прохождения теста
                                            ) => (
                                                <option
                                                    key={measureUnit._id}
                                                    value={measureUnit.name}
                                                >
                                                    {measureUnit.name}
                                                </option>
                                            ),
                                        )}
                                    </Select>
                                    <IngredientActions
                                        index={i}
                                        totalIngredients={ingredients.fields.length}
                                        onRemove={(i) => ingredients.remove(i)}
                                        onAdd={() =>
                                            ingredients.append({
                                                title: '',
                                                count: null,
                                                measureUnit: '',
                                            })
                                        }
                                    />
                                </HStack>
                            </Fragment>
                        ))}
                    </VStack>
                </Hide>
            </Flex>
        </>
    );
};

const getBorderColor = (field?: FieldError) =>
    field !== undefined ? { borderColor: 'rgb(229,62,62)' } : { borderColor: 'blackAlpha.200' };
const getInputStyles = (error?: FieldError) => ({
    borderWidth: '2px',
    ...getBorderColor(error),
    _focus: getBorderColor(error),
    _active: getBorderColor(error),
});

type IngredientActionsProps = {
    index: number;
    totalIngredients: number;
    onRemove: (index: number) => void;
    onAdd: () => void;
};

const IngredientActions = ({ index, totalIngredients, onRemove, onAdd }: IngredientActionsProps) =>
    index < totalIngredients - 1 ? (
        <IconButton
            data-test-id={`recipe-ingredients-remove-ingredients-${index}`}
            borderRadius='100%'
            backgroundColor='transparent'
            aria-label='remove'
            icon={<BasketIcon color='lime.600' />}
            onClick={() => onRemove(index)}
        />
    ) : (
        <IconButton
            data-test-id='recipe-ingredients-add-ingredients'
            onClick={onAdd}
            borderRadius='100%'
            bgColor='black'
            aria-label='add'
            icon={<AddIcon color='white' />}
        />
    );
