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
import { Fragment, useEffect, useState } from 'react';
import { FieldArrayWithId, FieldErrors, UseFormRegister } from 'react-hook-form';

import { BasketIcon } from '~/common/components/Icons/BasketIcon';
import { CloseInCircleIcon } from '~/common/components/Icons/CloseInCircleIcon';
import { MeasureUnit, useGetMeasureUnitsQuery } from '~/query/create-api';

import { RecipieFormData } from './CreateRecipePage';

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
    const measureUnitsQuery = useGetMeasureUnitsQuery();
    const [measureUnits, setMeasureUnits] = useState<MeasureUnit[]>([]);

    useEffect(() => {
        if (measureUnitsQuery.isSuccess) {
            setMeasureUnits(measureUnitsQuery.data);
        }
    }, [measureUnitsQuery]);

    return (
        <>
            <Text textStyle='textMdLh6Semibold'>
                Добавьте ингредиенты рецепта, нажав на{' '}
                <CloseInCircleIcon transform='rotate(45deg)' />
            </Text>
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
                                        Ингридиент
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
                                            placeholder='Ингредиент'
                                            {...register(`ingredients.${i}.title`)}
                                            borderWidth='2px'
                                            borderColor={
                                                formErrors.ingredients?.[i]?.title
                                                    ? 'red'
                                                    : 'blackAlpha.200'
                                            }
                                        />
                                    </Td>
                                    <Td p='8px'>
                                        <Input
                                            width='80px'
                                            placeholder='100'
                                            {...register(`ingredients.${i}.count`)}
                                            borderWidth='2px'
                                            borderColor={
                                                formErrors.ingredients?.[i]?.count
                                                    ? 'red'
                                                    : 'blackAlpha.200'
                                            }
                                            type='number'
                                        />
                                    </Td>
                                    <Td p='8px'>
                                        <Select
                                            {...register(`ingredients.${i}.measureUnit`)}
                                            borderWidth='2px'
                                            borderColor={
                                                formErrors.ingredients?.[i]?.measureUnit
                                                    ? 'red'
                                                    : 'blackAlpha.200'
                                            }
                                            placeholder='Единица измерения'
                                        >
                                            {measureUnits.map((measureUnit) => (
                                                <option
                                                    key={measureUnit._id}
                                                    value={measureUnit._id}
                                                >
                                                    {measureUnit.name}
                                                </option>
                                            ))}
                                        </Select>
                                    </Td>
                                    <Td p='8px'>
                                        {i < ingredients.length - 1 ? (
                                            <IconButton
                                                minW={0}
                                                boxSize='32px'
                                                borderRadius='100%'
                                                backgroundColor='transparent'
                                                aria-label='remove'
                                                icon={<BasketIcon color='lime.600' />}
                                                onClick={() => onClickRemoveNthIngredient(i)}
                                            />
                                        ) : (
                                            <IconButton
                                                onClick={() => onClickAddIngredient()}
                                                minW={0}
                                                boxSize='32px'
                                                borderRadius='100%'
                                                bgColor='black'
                                                aria-label='add'
                                                icon={<AddIcon color='white' />}
                                            />
                                        )}
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Show>
            <Hide above='md'>
                <VStack spacing='12px'>
                    {ingredients.map((ingridient, i) => (
                        <Fragment key={ingridient.id}>
                            <Input
                                placeholder='Ингредиент'
                                {...register(`ingredients.${i}.title`)}
                                borderWidth='2px'
                                borderColor={
                                    formErrors.ingredients?.[i]?.title ? 'red' : 'blackAlpha.200'
                                }
                            />
                            <HStack spacing='16px' width='100%'>
                                <Input
                                    width='80px'
                                    placeholder='100'
                                    {...register(`ingredients.${i}.count`)}
                                    borderWidth='2px'
                                    borderColor={
                                        formErrors.ingredients?.[i]?.count
                                            ? 'red'
                                            : 'blackAlpha.200'
                                    }
                                    type='number'
                                />
                                <Select
                                    {...register(`ingredients.${i}.measureUnit`)}
                                    borderWidth='2px'
                                    borderColor={
                                        formErrors.ingredients?.[i]?.measureUnit
                                            ? 'red'
                                            : 'blackAlpha.200'
                                    }
                                    placeholder='Единица измерения'
                                >
                                    {measureUnits.map((measureUnit) => (
                                        <option key={measureUnit._id} value={measureUnit._id}>
                                            {measureUnit.name}
                                        </option>
                                    ))}
                                </Select>
                                {i < ingredients.length - 1 ? (
                                    <IconButton
                                        borderRadius='100%'
                                        backgroundColor='transparent'
                                        aria-label='remove'
                                        icon={<BasketIcon color='lime.600' />}
                                        onClick={() => onClickRemoveNthIngredient(i)}
                                    />
                                ) : (
                                    <IconButton
                                        onClick={() => onClickAddIngredient()}
                                        borderRadius='100%'
                                        bgColor='black'
                                        aria-label='add'
                                        icon={<AddIcon color='white' />}
                                    />
                                )}
                            </HStack>
                        </Fragment>
                    ))}
                </VStack>
            </Hide>
        </>
    );
};
