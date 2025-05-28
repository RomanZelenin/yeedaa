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
    useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { Fallback } from '~/common/components/Fallback/Fallback';
import { Selector } from '~/common/components/Selector /Selector';

import { RecipieFormData } from './CreateRecipePage';
import { SaveImageModal } from './Modal/SaveImageModal';

export const RecipeCardEditor = ({
    formErrors,
    register,
}: {
    formErrors: FieldErrors<RecipieFormData>;
    register: UseFormRegister<RecipieFormData>;
}) => {
    const {
        isOpen: isOpenSaveImageModal,
        onClose: onCloseSaveImageModal,
        onOpen: onOpenSaveImageModal,
    } = useDisclosure({ defaultIsOpen: false });
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

    return (
        <Flex
            direction={{ base: 'column', md: 'row' }}
            alignItems={{ md: 'start' }}
            rowGap={{ base: '16px' }}
            columnGap={{ md: '16px' }}
        >
            <Image
                {...register(`image`)}
                src={preview?.toString()}
                borderWidth='2px'
                borderColor='red'
                onClick={() => {
                    onOpenSaveImageModal();
                }}
                objectFit='cover'
                borderRadius='8px'
                w={{ base: '328px', md: '232px', lg: '353px', xl: '553px' }}
                h={{ base: '224px', xl: '410px' }}
                fallback={
                    <Fallback
                        borderRadius='8px'
                        onClick={() => {
                            onOpenSaveImageModal();
                        }}
                        border={formErrors.image && '2px solid red'}
                        width='100%'
                        height={{ base: '224px', xl: '410px' }}
                    />
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
                    {...register(`title`)}
                    borderWidth='2px'
                    borderColor={formErrors.title ? 'red' : 'blackAlpha.200'}
                    color='blackAlpha.700'
                    placeholder='Название рецепта'
                />
                <Textarea
                    {...register(`description`)}
                    borderWidth='2px'
                    borderColor={formErrors.description ? 'red' : 'blackAlpha.200'}
                    placeholder='Краткое описание рецепта'
                />
                <HStack>
                    <Text textStyle='textMdLh6Semibold'>На сколько человек ваш рецепт?</Text>
                    <NumberInput min={1} step={1} w='90px' h='40px'>
                        <NumberInputField
                            {...register(`portions`)}
                            borderWidth='2px'
                            borderColor={formErrors.portions ? 'red' : 'blackAlpha.200'}
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
                            {...register(`time`)}
                            borderWidth='2px'
                            borderColor={formErrors.time ? 'red' : 'blackAlpha.200'}
                        />
                        <NumberInputStepper>
                            <NumberIncrementStepper data-test-id='increment-stepper' />
                            <NumberDecrementStepper data-test-id='decrement-stepper' />
                        </NumberInputStepper>
                    </NumberInput>
                </HStack>
            </Stack>
            {isOpenSaveImageModal && (
                <SaveImageModal
                    image={preview?.toString()}
                    onClickClose={() => {
                        onCloseSaveImageModal();
                    }}
                    onClickSave={(img) => {
                        setPreview(img);
                    }}
                    onClickDelete={() => {
                        setPreview(null);
                    }}
                />
            )}
        </Flex>
    );
};
