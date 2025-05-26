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

import { Fallback } from '~/common/components/Fallback/Fallback';
import { Selector } from '~/common/components/Selector /Selector';

export const RecipeCardEditor = ({
    onChangeTitle,
    onChangeDescription,
    onChangeCountPersons,
    onChangeCookingTime,
}: {
    onChangeTitle: (title: string) => void;
    onChangeDescription: (description: string) => void;
    onChangeCountPersons: (persons: number) => void;
    onChangeCookingTime: (min: number) => void;
}) => (
    <Flex
        direction={{ base: 'column', md: 'row' }}
        alignItems={{ md: 'start' }}
        rowGap={{ base: '16px' }}
        columnGap={{ md: '16px' }}
    >
        <Image
            onClick={() => {}}
            objectFit='cover'
            src='#'
            borderRadius='8px'
            w={{ base: '328px', md: '232px', lg: '353px', xl: '553px' }}
            h={{ base: '224px', xl: '410px' }}
            fallback={
                <Fallback borderRadius='8px' width='100%' height={{ base: '224px', xl: '410px' }} />
            }
        />
        <Stack w='100%' alignSelf={{ md: 'stretch' }} spacing={{ base: '16px' }}>
            <HStack>
                <Text flex={1} textStyle='textMdLh6Semibold'>
                    Выберите не менее 3-х тегов
                </Text>
                <Box flex={1}>
                    <Selector
                        items={[]}
                        isDisabled={false}
                        isShowAddItemInput={true}
                        placeholder='Выберите из списка...'
                        addItemPlaceholder='Другой аллерген'
                        onClickClearAll={() => {}}
                        onAddCustomItem={() => {}}
                        onSelect={() => {}}
                    />
                </Box>
            </HStack>
            <Input
                onInput={(e) => {
                    onChangeTitle((e.target as HTMLInputElement).value);
                }}
                borderColor='lime.150'
                color='blackAlpha.700'
                placeholder='Название рецепта'
            />
            <Textarea
                onInput={(e) => {
                    onChangeDescription((e.target as HTMLTextAreaElement).value);
                }}
                placeholder='Краткое описание рецепта'
            />
            <HStack>
                <Text textStyle='textMdLh6Semibold'>На сколько человек ваш рецепт?</Text>
                <NumberInput
                    value={1}
                    onChange={(_valueString, valueNumber) => {
                        onChangeCountPersons(valueNumber);
                    }}
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
            <HStack>
                <Text textStyle='textMdLh6Semibold'>Сколько времени готовить в минутах?</Text>
                <NumberInput
                    value={1}
                    onChange={(_valueString, valueNumber) => {
                        onChangeCookingTime(valueNumber);
                    }}
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
        </Stack>
    </Flex>
);
