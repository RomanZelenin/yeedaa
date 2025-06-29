import {
    Box,
    Center,
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
import {
    FieldError,
    FieldErrors,
    UseFormGetValues,
    UseFormRegister,
    UseFormSetValue,
    UseFormTrigger,
} from 'react-hook-form';

import fillIcon from '~/assets/icons/BsFillImageFill.svg';
import { MultiSelectDropdown } from '~/common/components/Drawer/MultiSelectDropdown';
import { useResource } from '~/common/components/ResourceContext/ResourceContext';

import { RecipieFormData } from '../CreateRecipePage';

export const HeaderCreateRecipe = ({
    register,
    getValues,
    formErrors,
    setValue,
    trigger,
    onClickImage,
}: {
    register: UseFormRegister<RecipieFormData>;
    getValues: UseFormGetValues<RecipieFormData>;
    formErrors: FieldErrors<RecipieFormData>;
    setValue: UseFormSetValue<RecipieFormData>;
    trigger: UseFormTrigger<RecipieFormData>;
    onClickImage: () => void;
}) => {
    const { getString } = useResource();
    return (
        <>
            <Stack
                direction={{ base: 'column', md: 'row' }}
                alignItems={{ md: 'start' }}
                columnGap={{ base: '16px', lg: '24px' }}
            >
                <Image
                    {...register('image')}
                    data-test-id='recipe-image-block-preview-image'
                    src={getValues('image')}
                    borderWidth='2px'
                    borderRadius='8px'
                    onClick={onClickImage}
                    objectFit='cover'
                    width={{ base: '328px', md: '232px', lg: '353px', xl: '553px' }}
                    height={{ base: '224px', lg: '410px', xl: '410px' }}
                    fallback={
                        <Center
                            data-test-id='recipe-image-block'
                            bgColor='blackAlpha.200'
                            borderRadius='8px'
                            border={formErrors.image && '2px solid red'}
                            width={{ base: '328px', md: '232px', lg: '353px', xl: '553px' }}
                            height={{ base: '224px', lg: '410px', xl: '410px' }}
                            onClick={onClickImage}
                        >
                            <Image src={fillIcon} />
                        </Center>
                    }
                />
                <Stack rowGap={{ base: '16px', lg: '24px' }} flex={1}>
                    <Stack direction='row' spacing={{ base: '16px' }} align='center'>
                        <Text textStyle='textMdLh6Semibold' minW={0} flex={1}>
                            Выберите не менее&nbsp;3-х тегов
                        </Text>
                        <Box
                            data-test-id='recipe-categories'
                            minW={0}
                            flex={1}
                            borderWidth='2px'
                            borderColor={
                                formErrors.categoriesIds ? 'rgb(229,62,62)' : 'blackAlpha.200'
                            }
                            borderRadius='8px'
                        >
                            <MultiSelectDropdown
                                placeholder={`${getString('select-from-list')}`}
                                items={getValues('categoriesIds')}
                                onChange={(_e, i) => {
                                    setValue('categoriesIds', [
                                        ...getValues('categoriesIds').slice(0, i!),
                                        {
                                            ...getValues('categoriesIds')[i!],
                                            selected: !getValues('categoriesIds')[i!].selected,
                                        },
                                        ...getValues('categoriesIds').slice(i! + 1),
                                    ]);
                                    trigger('categoriesIds');
                                }}
                            />
                        </Box>
                    </Stack>
                    <Input
                        data-test-id='recipe-title'
                        {...register('title')}
                        borderWidth='2px'
                        {...getBorderColor(formErrors.title)}
                        _focus={getBorderColor(formErrors.title)}
                        _active={getBorderColor(formErrors.title)}
                        color='blackAlpha.700'
                        placeholder={getString('recipe-name')}
                    />
                    <Textarea
                        data-test-id='recipe-description'
                        {...register('description')}
                        borderWidth='2px'
                        {...getBorderColor(formErrors.description)}
                        _focus={getBorderColor(formErrors.description)}
                        _active={getBorderColor(formErrors.description)}
                        placeholder={getString('brief-description-recipe')}
                    />
                    <Stack direction='row' align='center'>
                        <Text textStyle='textMdLh6Semibold'>На сколько человек ваш рецепт?</Text>
                        <NumberInput
                            step={1}
                            h='40px'
                            value={getValues('portions')}
                            onChange={(valueString) => {
                                setValue('portions', valueString);
                                trigger('portions');
                            }}
                        >
                            <NumberInputField
                                data-test-id='recipe-portions'
                                {...getBorderColor(formErrors.portions)}
                                _focus={getBorderColor(formErrors.portions)}
                                _active={getBorderColor(formErrors.portions)}
                                w='90px'
                                borderRadius='8px'
                                borderWidth='2px'
                            />
                            <NumberInputStepper>
                                <NumberIncrementStepper data-test-id='increment-stepper' />
                                <NumberDecrementStepper data-test-id='decrement-stepper' />
                            </NumberInputStepper>
                        </NumberInput>
                    </Stack>
                    <Stack direction='row' align='center'>
                        <Text textStyle='textMdLh6Semibold'>
                            Сколько времени готовить в минутах?
                        </Text>
                        <NumberInput
                            step={1}
                            h='40px'
                            value={getValues('time')}
                            onChange={(valueString) => {
                                setValue('time', valueString);
                                trigger('time');
                            }}
                        >
                            <NumberInputField
                                data-test-id='recipe-time'
                                {...getBorderColor(formErrors.time)}
                                _focus={getBorderColor(formErrors.time)}
                                _active={getBorderColor(formErrors.time)}
                                w='90px'
                                borderWidth='2px'
                            />
                            <NumberInputStepper>
                                <NumberIncrementStepper data-test-id='increment-stepper' />
                                <NumberDecrementStepper data-test-id='decrement-stepper' />
                            </NumberInputStepper>
                        </NumberInput>
                    </Stack>
                </Stack>
            </Stack>
        </>
    );
};

const getBorderColor = (field?: FieldError) =>
    field !== undefined ? { borderColor: 'rgb(229,62,62)' } : { borderColor: 'blackAlpha.200' };
