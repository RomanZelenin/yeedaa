import {
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
import { useState } from 'react';

import { Ingredient } from '~/app/mocks/types/type_defenitions';

export const IngredientsList = ({ ingredients }: { ingredients: Ingredient[] }) => {
    const [numServings, setNumServings] = useState(1);

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
                                    Ингридиенты
                                </Text>
                            </Th>
                            <Th px='0px'>
                                <HStack justify='right'>
                                    <Text
                                        textStyle='textXsLh4BoldLsw'
                                        color='lime.600'
                                        textAlign='end'
                                    >
                                        Порций
                                    </Text>
                                    <NumberInput
                                        value={numServings}
                                        onChange={(_valueString, valueNumber) =>
                                            setNumServings(valueNumber)
                                        }
                                        step={1}
                                        min={0}
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
                        {ingredients.map((it, idx) => (
                            <Tr data-test-id={`ingredient-quantity-${idx}`}>
                                <Td px='8px' py='10px' textStyle='textSmLh5Medium'>
                                    {it.title}
                                </Td>
                                <Td py='10px' px={0}>
                                    <Text mr='8px' textStyle='textSmLh5' textAlign='end'>
                                        {parseInt(it.count) * numServings} {it.measureUnit}
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
