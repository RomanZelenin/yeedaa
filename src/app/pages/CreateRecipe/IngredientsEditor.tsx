import { AddIcon } from '@chakra-ui/icons';
import {
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
import { Fragment, useState } from 'react';
import { FieldArrayWithId, FieldError, FieldErrors, UseFormRegister } from 'react-hook-form';

import { BasketIcon } from '~/common/components/Icons/BasketIcon';
import { CloseInCircleIcon } from '~/common/components/Icons/CloseInCircleIcon';
import { useGetMeasureUnits } from '~/common/hooks/useGetMeasureUnits';

import { RecipieFormData } from './CreateRecipePage';

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
    onClickAddIngredient,
    onClickRemoveNthIngredient,
}: {
    ingredients: FieldArrayWithId<RecipieFormData, 'ingredients', 'id'>[];
    register: UseFormRegister<RecipieFormData>;
    formErrors: FieldErrors<RecipieFormData>;
    onClickAddIngredient: () => void;
    onClickRemoveNthIngredient: (i: number) => void;
}) => {
    const { measureUnits } = useGetMeasureUnits();
    return (
        <>
            <Text textStyle='textMdLh6Semibold'>
                {`Добавьте ингредиенты рецепта, нажав на `}
                <CloseInCircleIcon transform='rotate(45deg)' />
            </Text>
            <Show above='md'>
                <DesktopIngredientsTable
                    formErrors={formErrors}
                    ingredients={ingredients}
                    measureUnits={measureUnits}
                    register={register}
                    onClickAddIngredient={onClickAddIngredient}
                    onClickRemoveNthIngredient={onClickRemoveNthIngredient}
                />
            </Show>
            <Hide above='md'>
                <MobileIngredientsList
                    formErrors={formErrors}
                    ingredients={ingredients}
                    measureUnits={measureUnits}
                    register={register}
                    onClickAddIngredient={onClickAddIngredient}
                    onClickRemoveNthIngredient={onClickRemoveNthIngredient}
                />
            </Hide>
        </>
    );
};

const MobileIngredientsList = ({
    ingredients,
    register,
    formErrors,
    measureUnits,
    onClickRemoveNthIngredient,
    onClickAddIngredient,
}: {
    ingredients: FieldArrayWithId<RecipieFormData, 'ingredients', 'id'>[];
    register: UseFormRegister<RecipieFormData>;
    formErrors: FieldErrors<RecipieFormData>;
    measureUnits: MeasureUnit[];
    onClickRemoveNthIngredient: (i: number) => void;
    onClickAddIngredient: () => void;
}) => (
    <VStack spacing='12px'>
        {ingredients.map((ingridient, i) => (
            <Fragment key={ingridient.id}>
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
                        {...getInputStyles(formErrors.ingredients?.[i]?.measureUnit)}
                        placeholder='Единица измерения'
                    >
                        {measureUnits.map((measureUnit) => (
                            <option key={measureUnit._id} value={measureUnit.name}>
                                {measureUnit.name}
                            </option>
                        ))}
                    </Select>
                    <IngredientActions
                        index={i}
                        totalIngredients={ingredients.length}
                        onRemove={onClickRemoveNthIngredient}
                        onAdd={onClickAddIngredient}
                    />
                </HStack>
            </Fragment>
        ))}
    </VStack>
);

const DesktopIngredientsTable = ({
    ingredients,
    register,
    formErrors,
    measureUnits,
    onClickRemoveNthIngredient,
    onClickAddIngredient,
}: {
    ingredients: FieldArrayWithId<RecipieFormData, 'ingredients', 'id'>[];
    register: UseFormRegister<RecipieFormData>;
    formErrors: FieldErrors<RecipieFormData>;
    measureUnits: MeasureUnit[];
    onClickRemoveNthIngredient: (i: number) => void;
    onClickAddIngredient: () => void;
}) => {
    const [ingredientMeasureUnit, setIngredientMeasureUnit] = useState(
        ingredients.map((it) => it.measureUnit),
    );
    return (
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
                                Ингредиент
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
                                    Количество
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
                                    Единица измерения
                                </Text>
                            </HStack>
                        </Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {ingredients.map((ingridient, i) => (
                        <Tr key={ingridient.id} p={0}>
                            <Td p='8px' textStyle='textSmLh5Medium'>
                                <Input
                                    data-test-id={`recipe-ingredients-title-${i}`}
                                    placeholder='Ингредиент'
                                    {...register(`ingredients.${i}.title`)}
                                    {...getInputStyles(formErrors.ingredients?.[i]?.title)}
                                />
                            </Td>
                            <Td p='8px'>
                                <Input
                                    data-test-id={`recipe-ingredients-count-${i}`}
                                    width='80px'
                                    placeholder='100'
                                    {...register(`ingredients.${i}.count`)}
                                    {...getInputStyles(formErrors.ingredients?.[i]?.count)}
                                    type='number'
                                />
                            </Td>
                            <Td p='8px'>
                                <Select
                                    {...register(`ingredients.${i}.measureUnit`)}
                                    value={ingredientMeasureUnit[i]}
                                    onChange={(e) => {
                                        setIngredientMeasureUnit([
                                            ...ingredientMeasureUnit.slice(0, i),
                                            e.target.value,
                                            ...ingredientMeasureUnit.slice(i + 1),
                                        ]);
                                    }}
                                    {...getInputStyles(formErrors.ingredients?.[i]?.measureUnit)}
                                    data-test-id={`recipe-ingredients-measureUnit-${i}`}
                                    placeholder='Единица измерения'
                                >
                                    {measureUnits.map((measureUnit) => (
                                        <option key={measureUnit._id} value={measureUnit.name}>
                                            {measureUnit.name}
                                        </option>
                                    ))}
                                </Select>
                            </Td>
                            <Td p='8px'>
                                <IngredientActions
                                    index={i}
                                    totalIngredients={ingredients.length}
                                    onRemove={onClickRemoveNthIngredient}
                                    onAdd={onClickAddIngredient}
                                />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
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
