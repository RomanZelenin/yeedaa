import {
    Box,
    HStack,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';

import { Ingredient } from '~/app/mocks/types/type_defenitions';
import { useResource } from '~/common/components/ResourceContext/ResourceContext';
import { getIngredientsPerPortion } from '~/common/utils/getIngredientsPerPortion';

export const IngredientsList = ({
    ingredients,
    portions,
}: {
    ingredients: Ingredient[];
    portions: number;
}) => {
    const [numPortions, setNumServings] = useState(portions);
    const ingredientsPerPortion = useMemo(
        () => getIngredientsPerPortion(ingredients, portions),
        [ingredients, portions],
    );
    const { getString } = useResource();

    return (
        <>
            <TableContainer whiteSpace='none' overflowX='clip'>
                <Table variant='striped'>
                    <Thead>
                        <Tr>
                            <Th px='8px'>
                                <Text
                                    textStyle='textXsLh4BoldLsw'
                                    color='lime.600'
                                    textAlign='start'
                                >
                                    {getString('ingredients')}
                                </Text>
                            </Th>
                            <Th px='0px'>
                                <HStack justify='right'>
                                    <Text
                                        textStyle='textXsLh4BoldLsw'
                                        color='lime.600'
                                        textAlign='end'
                                    >
                                        {getString('portions')}
                                    </Text>
                                    <NumberInput
                                        value={numPortions}
                                        onChange={(_valueString, valueNumber) =>
                                            setNumServings(valueNumber)
                                        }
                                        step={1}
                                        min={1}
                                        w='90px'
                                        h='40px'
                                    >
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper data-test-id='increment-stepper' />
                                            <NumberDecrementStepper data-test-id='decrement-stepper' />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </HStack>
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {ingredientsPerPortion.map((it, idx) => (
                            <Tr>
                                <Td px='8px' py='10px' textStyle='textSmLh5Medium'>
                                    {it.title}
                                </Td>
                                <Td py='10px' px={0}>
                                    <Text mr='8px' textStyle='textSmLh5' textAlign='end'>
                                        <Box as='span' data-test-id={`ingredient-quantity-${idx}`}>
                                            {isNaN(parseFloat(it.count))
                                                ? it.count
                                                : parseFloat(
                                                      (numPortions * parseFloat(it.count)).toFixed(
                                                          2,
                                                      ),
                                                  )}
                                        </Box>
                                        {` ${it.measureUnit}`}
                                    </Text>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
};
