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
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { FieldArrayWithId, FieldErrors, UseFormRegister } from 'react-hook-form';

import { Fallback } from '~/common/components/Fallback/Fallback';
import { BasketIcon } from '~/common/components/Icons/BasketIcon';
import { useResource } from '~/common/components/ResourceContext/ResourceContext';

import { RecipieFormData } from './CreateRecipePage';
import { SaveImageModal } from './Modal/SaveImageModal';

export const StepsEditor = ({
    steps,
    register,
    formErrors,
    onClickAddStep,
    onRemoveNthStep,
}: {
    steps: FieldArrayWithId<RecipieFormData, 'steps', 'id'>[];
    register: UseFormRegister<RecipieFormData>;
    formErrors: FieldErrors<RecipieFormData>;
    onClickAddStep: () => void;
    onRemoveNthStep: (i: number) => void;
}) => {
    const { getString } = useResource();
    const {
        isOpen: isOpenSaveImageModal,
        onClose: onCloseSaveImageModal,
        onOpen: onOpenSaveImageModal,
    } = useDisclosure({ defaultIsOpen: false });
    const [previews, setPreviews] = useState<unknown[]>([]);
    const [selectedStepIdxPreview, setSelectedStepIdxPreview] = useState(-1);

    const handleOnClickNthImage = (i: number) => {
        setSelectedStepIdxPreview(i);
        onOpenSaveImageModal();
    };
    return (
        <VStack spacing={{ base: '20px' }} align='stretch'>
            <Text textStyle='textMdLh6Semibold'>Добавьте шаги приготовления</Text>
            {steps?.map((step, i) => (
                <Fragment key={step.id}>
                    <Card direction='row' overflow='clip' flex={1}>
                        <Image
                            onClick={() => {
                                handleOnClickNthImage(i);
                            }}
                            objectFit='cover'
                            src={previews[i] as string}
                            w={{ base: '158px', lg: '346px' }}
                            fallback={
                                <Fallback
                                    onClick={() => {
                                        handleOnClickNthImage(i);
                                    }}
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
                                    {i < steps.length - 1 && (
                                        <IconButton
                                            minW={0}
                                            boxSize='32px'
                                            borderRadius='100%'
                                            backgroundColor='transparent'
                                            aria-label='remove'
                                            icon={<BasketIcon color='lime.600' />}
                                            onClick={() => onRemoveNthStep(i)}
                                        />
                                    )}
                                </HStack>
                            </CardHeader>
                            <CardBody p={0}>
                                <Textarea
                                    borderWidth='2px'
                                    borderColor={
                                        formErrors.steps?.[i]?.description
                                            ? 'red'
                                            : 'blackAlpha.200'
                                    }
                                    {...register(`steps.${i}.description`)}
                                    placeholder='Шаг'
                                />
                            </CardBody>
                        </Stack>
                    </Card>
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
                            Новый шаг
                        </Button>
                    )}
                </Fragment>
            ))}
            {isOpenSaveImageModal && (
                <SaveImageModal
                    image={previews[selectedStepIdxPreview]?.toString()}
                    onClickClose={() => {
                        onCloseSaveImageModal();
                    }}
                    onClickSave={(img) => {
                        if (selectedStepIdxPreview !== -1) {
                            setPreviews([
                                ...previews.slice(0, selectedStepIdxPreview),
                                img,
                                ...previews.slice(selectedStepIdxPreview + 1),
                            ]);
                        } else {
                            setPreviews([img]);
                        }
                    }}
                    onClickDelete={() => {
                        setPreviews([
                            ...previews.slice(0, selectedStepIdxPreview),
                            null,
                            ...previews.slice(selectedStepIdxPreview + 1),
                        ]);
                    }}
                />
            )}
        </VStack>
    );
};
