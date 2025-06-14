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
import { Fragment } from 'react/jsx-runtime';
import { FieldArrayWithId, FieldError, FieldErrors, UseFormRegister } from 'react-hook-form';

import { Fallback } from '~/common/components/Fallback/Fallback';
import { BasketIcon } from '~/common/components/Icons/BasketIcon';
import { useResource } from '~/common/components/ResourceContext/ResourceContext';

import { RecipieFormData } from './CreateRecipePage';

export const StepsEditor = ({
    images,
    steps,
    register,
    formErrors,
    onClickAddStep,
    onRemoveNthStep,
    onClickNthImage,
}: {
    images: string[];
    steps: FieldArrayWithId<RecipieFormData, 'steps', 'id'>[];
    register: UseFormRegister<RecipieFormData>;
    formErrors: FieldErrors<RecipieFormData>;
    onClickAddStep: () => void;
    onRemoveNthStep: (i: number) => void;
    onClickNthImage: (i: number) => void;
}) => {
    const { getString } = useResource();
    return (
        <VStack spacing={{ base: '20px' }} align='stretch'>
            <Text textStyle='textMdLh6Semibold'>{getString('add-cooking-steps')}</Text>
            {steps?.map((step, i) => (
                <Fragment key={step.id}>
                    <StepCard
                        index={i}
                        image={images[i]}
                        formErrors={formErrors}
                        onClickImage={onClickNthImage}
                        onClickRemoveStep={onRemoveNthStep}
                        register={register}
                        totalSteps={steps.length}
                    />
                    {i == steps.length - 1 && (
                        <Button
                            onClick={() => onClickAddStep()}
                            alignSelf='end'
                            variant='outline'
                            borderColor='blackAlpha.600'
                            rightIcon={
                                <Center borderRadius='100%' boxSize='14px' bgColor='black'>
                                    <AddIcon boxSize='9px' color='white' />
                                </Center>
                            }
                        >
                            {getString('new-step')}
                        </Button>
                    )}
                </Fragment>
            ))}
        </VStack>
    );
};

const StepCard = ({
    register,
    index,
    totalSteps,
    onClickImage,
    onClickRemoveStep,
    formErrors,
    image,
}: {
    register: UseFormRegister<RecipieFormData>;
    index: number;
    onClickImage: (i: number) => void;
    totalSteps: number;
    onClickRemoveStep: (i: number) => void;
    formErrors: FieldErrors<RecipieFormData>;
    image?: string | null | undefined;
}) => {
    const { getString } = useResource();
    const getBorderColor = (field?: FieldError) =>
        field !== undefined ? { borderColor: 'rgb(229,62,62)' } : { borderColor: 'blackAlpha.200' };

    return (
        <Card direction='row' overflow='clip' flex={1}>
            {image ? (
                <Image
                    {...register(`steps.${index}.image`)}
                    data-test-id={`recipe-steps-image-block-${index}-preview-image`}
                    onClick={() => onClickImage(index)}
                    objectFit='cover'
                    src={image}
                    w={{ base: '158px', lg: '346px' }}
                />
            ) : (
                <Fallback
                    data-test-id={`recipe-steps-image-block-${index}`}
                    onClick={() => onClickImage(index)}
                    width={{ base: '158px', lg: '346px' }}
                    height='inherit'
                />
            )}
            {/*  <Image
                {...register(`steps.${index}.image`)}
                data-test-id={`recipe-steps-image-block-${index}-preview-image`}
                onClick={() => onClickImage(index)}
                objectFit='cover'
                src={image}
                w={{ base: '158px', lg: '346px' }}
                fallback={
                    <Fallback
                        data-test-id={`recipe-steps-image-block-${index}`}
                        onClick={() => onClickImage(index)}
                        width={{ base: '158px', lg: '346px' }}
                        height='inherit'
                    />
                }
            /> */}
            <Stack spacing={{ base: '12px', lg: '16px' }} flex={1} p={{ base: '8px', lg: '24px' }}>
                <CardHeader p='0px'>
                    <HStack justify='space-between'>
                        <Tag>
                            <TagLabel textStyle='textSmLh5'>
                                {getString('step')} {index + 1}
                            </TagLabel>
                        </Tag>
                        {index < totalSteps - 1 && (
                            <IconButton
                                data-test-id={`recipe-steps-remove-button-${index + 1}`}
                                minW={0}
                                boxSize='32px'
                                borderRadius='100%'
                                backgroundColor='transparent'
                                aria-label='remove'
                                icon={<BasketIcon color='lime.600' />}
                                onClick={() => {
                                    onClickRemoveStep(index);
                                }}
                            />
                        )}
                    </HStack>
                </CardHeader>
                <CardBody p={0}>
                    <Textarea
                        data-test-id={`recipe-steps-description-${index}`}
                        {...register(`steps.${index}.description`)}
                        borderWidth='2px'
                        {...getBorderColor(formErrors.steps?.[index]?.description)}
                        _focus={getBorderColor(formErrors.steps?.[index]?.description)}
                        _active={getBorderColor(formErrors.steps?.[index]?.description)}
                        placeholder={getString('step')}
                    />
                </CardBody>
            </Stack>
        </Card>
    );
};
