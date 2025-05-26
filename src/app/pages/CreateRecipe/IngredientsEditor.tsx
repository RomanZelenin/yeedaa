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
import { yupResolver } from '@hookform/resolvers/yup';
import { Fragment, useEffect, useState } from 'react';
import { Form, useFieldArray, useForm } from 'react-hook-form';

import { Ingredient } from '~/app/mocks/types/type_defenitions';
import { BasketIcon } from '~/common/components/Icons/BasketIcon';
import { CloseInCircleIcon } from '~/common/components/Icons/CloseInCircleIcon';
import { MeasureUnit, useGetMeasureUnitsQuery } from '~/query/create-api';

import { ingridientsSchema } from '../Login/schemes';

export type IngredientFormData = {
    title: string;
    count: number | null;
    measureUnit: string;
};
export const IngredientsEditor = ({
    onChangeIngredients,
}: {
    onChangeIngredients: (ingredients: Ingredient[]) => void;
}) => {
    const measureUnitsQuery = useGetMeasureUnitsQuery();
    const [measureUnits, setMeasureUnits] = useState<MeasureUnit[]>([]);

    const {
        watch,
        getValues,
        control,
        register,
        formState: { errors: formErrors },
    } = useForm({
        resolver: yupResolver(ingridientsSchema),
        defaultValues: { items: [{ title: '', count: null, measureUnit: '' }] },
        mode: 'onChange',
    });

    const { fields, append, remove, update } = useFieldArray({
        control,
        name: 'items',
    });

    useEffect(() => {
        if (measureUnitsQuery.isSuccess) {
            setMeasureUnits(measureUnitsQuery.data);
        }
    }, [measureUnitsQuery]);

    const ingredients = watch().items;
    useEffect(() => {
        onChangeIngredients(ingredients.slice(0, ingredients.length - 1));
    }, [ingredients]);

    const handleOnClickAddIngredient = () => {
        append({ ...getValues().items[0] });
        update(getValues().items.length - 1, { title: '', count: null, measureUnit: '' });
    };

    const handleOnClickRemoveNthIngredient = (i: number) => {
        remove(i);
    };

    return (
        <>
            <Text textStyle='textMdLh6Semibold'>
                Добавьте ингредиенты рецепта, нажав на{' '}
                <CloseInCircleIcon transform='rotate(45deg)' />
            </Text>
            <Show above='md'>
                <Form control={control} onSubmit={() => handleOnClickAddIngredient()}>
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
                                {fields.map((ingridient, i) => (
                                    <Tr key={ingridient.id} p={0}>
                                        <Td p='8px' textStyle='textSmLh5Medium'>
                                            <Input
                                                placeholder='Ингредиент'
                                                {...register(`items.${i}.title`)}
                                                borderWidth='2px'
                                                borderColor={
                                                    formErrors.items?.[i]?.title
                                                        ? 'red'
                                                        : 'blackAlpha.200'
                                                }
                                            />
                                        </Td>
                                        <Td p='8px'>
                                            <Input
                                                width='80px'
                                                placeholder='100'
                                                {...register(`items.${i}.count`)}
                                                borderWidth='2px'
                                                borderColor={
                                                    formErrors.items?.[i]?.count
                                                        ? 'red'
                                                        : 'blackAlpha.200'
                                                }
                                                type='number'
                                            />
                                        </Td>
                                        <Td p='8px'>
                                            <Select
                                                {...register(`items.${i}.measureUnit`)}
                                                borderWidth='2px'
                                                borderColor={
                                                    formErrors.items?.[i]?.measureUnit
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
                                            {i < fields.length - 1 ? (
                                                <IconButton
                                                    minW={0}
                                                    boxSize='32px'
                                                    borderRadius='100%'
                                                    backgroundColor='transparent'
                                                    aria-label='remove'
                                                    icon={<BasketIcon color='lime.600' />}
                                                    onClick={() =>
                                                        handleOnClickRemoveNthIngredient(i)
                                                    }
                                                />
                                            ) : (
                                                <IconButton
                                                    type='submit'
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
                </Form>
            </Show>
            <Hide above='md'>
                <Form control={control} onSubmit={() => handleOnClickAddIngredient()}>
                    <VStack spacing='12px'>
                        {fields.map((ingridient, i) => (
                            <Fragment key={ingridient.id}>
                                <Input
                                    placeholder='Ингредиент'
                                    {...register(`items.${i}.title`)}
                                    borderWidth='2px'
                                    borderColor={
                                        formErrors.items?.[i]?.title ? 'red' : 'blackAlpha.200'
                                    }
                                />
                                <HStack spacing='16px' width='100%'>
                                    <Input
                                        width='80px'
                                        placeholder='100'
                                        {...register(`items.${i}.count`)}
                                        borderWidth='2px'
                                        borderColor={
                                            formErrors.items?.[i]?.count ? 'red' : 'blackAlpha.200'
                                        }
                                        type='number'
                                    />
                                    <Select
                                        {...register(`items.${i}.measureUnit`)}
                                        borderWidth='2px'
                                        borderColor={
                                            formErrors.items?.[i]?.measureUnit
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
                                    {i < fields.length - 1 ? (
                                        <IconButton
                                            borderRadius='100%'
                                            backgroundColor='transparent'
                                            aria-label='remove'
                                            icon={<BasketIcon color='lime.600' />}
                                            onClick={() => handleOnClickRemoveNthIngredient(i)}
                                        />
                                    ) : (
                                        <IconButton
                                            type='submit'
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
                </Form>
            </Hide>
        </>
    );
};
