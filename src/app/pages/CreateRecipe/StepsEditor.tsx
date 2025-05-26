import { AddIcon } from '@chakra-ui/icons';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Center,
    HStack,
    IconButton,
    Image,
    Stack,
    Tag,
    TagLabel,
    Text,
    Textarea,
    VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Fragment } from 'react/jsx-runtime';
import { Form, useFieldArray, useForm } from 'react-hook-form';

import { Fallback } from '~/common/components/Fallback/Fallback';
import { BasketIcon } from '~/common/components/Icons/BasketIcon';
import { useResource } from '~/common/components/ResourceContext/ResourceContext';

import { cookingStepsSchema } from '../Login/schemes';

export const StepsEditor = () => {
    const { getString } = useResource();

    const {
        getValues,
        control,
        register,
        formState: { errors: formErrors },
    } = useForm({
        resolver: yupResolver(cookingStepsSchema),
        defaultValues: { items: [{ image: undefined, stepNumber: 1, description: '' }] },
        mode: 'onChange',
    });

    const { fields, append, remove, update } = useFieldArray({
        control,
        name: 'items',
    });

    const handleOnClickAddStep = () => {
        append({ ...getValues().items[0] });
        update(getValues().items.length - 1, {
            image: '',
            stepNumber: getValues().items.length,
            description: '',
        });
    };

    const handleOnRemoveNthStep = (i: number) => {
        remove(i);
        //update(getValues().items.length - 1, { ...getValues().items[getValues().items.length - 1], stepNumber: getValues().items.length })
    };

    return (
        <Form control={control} onSubmit={handleOnClickAddStep}>
            <VStack spacing={{ base: '20px' }} align='stretch'>
                <Text textStyle='textMdLh6Semibold'>Добавьте шаги приготовления</Text>
                {fields?.map((step, i) => (
                    <Fragment key={step.id}>
                        <Card direction='row' overflow='clip' flex={1}>
                            <Image
                                objectFit='cover'
                                src={step.image}
                                w={{ base: '158px', lg: '346px' }}
                                fallback={
                                    <Fallback
                                        width={{ base: '158px', lg: '346px' }}
                                        height='inherit'
                                    />
                                }
                            />
                            <Stack
                                spacing={{ base: '12px', lg: '16px' }}
                                flex={1}
                                p={{ base: '8px', lg: '24px' }}
                            >
                                <CardHeader p='0px'>
                                    <HStack justify='space-between'>
                                        <Tag /* layerStyle={isLast ? 'categoryTag' : 'timerTag'} */>
                                            <TagLabel textStyle='textSmLh5'>
                                                {getString('step')} {i + 1}
                                            </TagLabel>
                                        </Tag>
                                        {i < fields.length - 1 && (
                                            <IconButton
                                                minW={0}
                                                boxSize='32px'
                                                borderRadius='100%'
                                                backgroundColor='transparent'
                                                aria-label='remove'
                                                icon={<BasketIcon color='lime.600' />}
                                                onClick={() => {
                                                    handleOnRemoveNthStep(i);
                                                }}
                                            />
                                        )}
                                    </HStack>
                                </CardHeader>
                                <CardBody p={0}>
                                    <Textarea
                                        borderWidth='2px'
                                        borderColor={
                                            formErrors.items?.[i]?.description
                                                ? 'red'
                                                : 'blackAlpha.200'
                                        }
                                        {...register(`items.${i}.description`)}
                                        placeholder='Шаг'
                                    />
                                </CardBody>
                            </Stack>
                        </Card>
                        {i == fields.length - 1 && (
                            <Button
                                type='submit'
                                alignSelf='end'
                                variant='outline'
                                borderColor='blackAlpha.600'
                                rightIcon={
                                    <Center borderRadius='100%' boxSize='14px' bgColor='black'>
                                        <AddIcon boxSize='9px' color='white' />
                                    </Center>
                                }
                            >
                                Новый шаг
                            </Button>
                        )}
                    </Fragment>
                ))}
            </VStack>
        </Form>
    );
};
