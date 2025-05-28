import { Button, Flex, Stack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { Form, useFieldArray, useForm } from 'react-hook-form';
import { useBlocker } from 'react-router';

import { CookingStep } from '~/app/mocks/types/type_defenitions';
import { WriteLineIcon } from '~/common/components/Icons/WriteLineIcon';

import { EmptyConatainer } from '../common/Containers/EmptyContainer';
import { recipieSchema } from '../Login/schemes';
import { IngredientFormData, IngredientsEditor } from './IngredientsEditor';
import { ExitConfirmationModal } from './Modal/ExitConfirmationModal';
import { RecipeCardEditor } from './RecipeCardEditor';
import { StepsEditor } from './StepsEditor';

export type RecipieFormData = {
    title: string;
    description: string;
    time: number;
    categoriesIds: string[];
    portions: number;
    image?: string;
    steps: CookingStep[];
    ingredients: IngredientFormData[];
    meat?: string;
    garnish?: string;
};

export const CreateRecipePage = () => {
    const [hasChanges, setHasChanges] = useState(false);
    const { showModal, handleConfirm, handleCancel } = useNavigationGuard(hasChanges);

    const {
        clearErrors,
        getValues,
        control,
        register,
        formState: { errors: formErrors },
    } = useForm({
        resolver: yupResolver(recipieSchema),
        defaultValues: {
            ingredients: [{ title: '', count: null, measureUnit: '' }],
            steps: [{ image: undefined, stepNumber: 1, description: '' }],
        },
        mode: 'onChange',
    });

    const ingredients = useFieldArray({
        control,
        name: 'ingredients',
    });
    const steps = useFieldArray({
        control,
        name: 'steps',
    });

    return (
        <EmptyConatainer>
            <Form control={control} onChange={() => setHasChanges(true)}>
                <Flex
                    direction={{ base: 'column' }}
                    px={{ base: '16px', md: '20px', lg: '0px' }}
                    rowGap={{ base: '24px' }}
                >
                    <RecipeCardEditor formErrors={formErrors} register={register} />
                    <Flex
                        w='100%'
                        px={{ md: '64px' }}
                        direction='column'
                        maxW='768px'
                        alignSelf='center'
                        rowGap={{ base: '24px' }}
                    >
                        <IngredientsEditor
                            ingredients={ingredients.fields}
                            formErrors={formErrors}
                            register={register}
                            onClickAddIngredient={() => {
                                ingredients.append({ ...getValues().ingredients[0] });
                                ingredients.update(getValues().ingredients.length - 1, {
                                    title: '',
                                    count: null,
                                    measureUnit: '',
                                });
                            }}
                            onClickRemoveNthIngredient={(i) => {
                                ingredients.remove(i);
                            }}
                        />
                        <StepsEditor
                            register={register}
                            formErrors={formErrors}
                            steps={steps.fields}
                            onClickAddStep={() => {
                                steps.append({ ...getValues().steps[0] });
                                steps.update(getValues().steps.length - 1, {
                                    image: '',
                                    stepNumber: getValues().steps.length,
                                    description: '',
                                });
                            }}
                            onRemoveNthStep={(i) => steps.remove(i)}
                        />
                        <Stack
                            direction={{ base: 'column', md: 'row' }}
                            justifyContent='center'
                            gap={{ base: '20px' }}
                        >
                            <Button
                                onClick={() => {
                                    clearErrors();
                                }}
                                type='submit'
                                variant='outline'
                                borderColor='blackAlpha.600'
                                leftIcon={<WriteLineIcon />}
                            >
                                Сохранить черновик
                            </Button>
                            <Button
                                type='submit'
                                variant='solid'
                                backgroundColor='black'
                                color='white'
                            >
                                Опубликовать рецепт
                            </Button>
                        </Stack>
                    </Flex>
                </Flex>
                {showModal && (
                    <ExitConfirmationModal
                        onClose={() => {
                            handleCancel();
                        }}
                        onExitWithoutSaving={() => {
                            handleConfirm();
                        }}
                        onClickSaving={() => {}}
                    />
                )}
            </Form>
        </EmptyConatainer>
    );
};

export function useNavigationGuard(shouldBlock: boolean) {
    const [showModal, setShowModal] = useState(false);
    const [confirmedNavigation, setConfirmedNavigation] = useState(false);

    const blocker = useBlocker(
        ({ currentLocation, nextLocation }) =>
            shouldBlock &&
            !confirmedNavigation &&
            currentLocation.pathname !== nextLocation.pathname,
    );

    useEffect(() => {
        if (!shouldBlock) return;

        const handleBeforeUnload = (e) => {
            if (!confirmedNavigation) {
                e.preventDefault();
                setShowModal(true);
                e.returnValue = '';
                return '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [shouldBlock, confirmedNavigation]);

    useEffect(() => {
        if (blocker.state === 'blocked') {
            setShowModal(true);
        }
    }, [blocker]);

    const handleConfirm = () => {
        if (blocker.state === 'blocked') blocker.proceed();
        setShowModal(false);
    };

    const handleCancel = () => {
        if (blocker.state === 'blocked') blocker.reset();
        setShowModal(false);
    };

    useEffect(() => {
        setConfirmedNavigation(false);
    }, []);

    return { showModal, handleConfirm, handleCancel };
}
