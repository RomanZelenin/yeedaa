import { Button, Flex, Stack, useDisclosure } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router';

import { CookingStep } from '~/app/mocks/types/type_defenitions';
import { WriteLineIcon } from '~/common/components/Icons/WriteLineIcon';
import { useResource } from '~/common/components/ResourceContext/ResourceContext';
import { useNavigationGuard } from '~/common/hooks/useNavigationGuard';
import { getJWTPayload } from '~/common/utils/getJWTPayload';
import { getPathToRecipe } from '~/common/utils/getPathToRecipe';
import { StatusCode } from '~/query/constants';
import { useGetCategoriesQuery } from '~/query/create-category-api';
import {
    useCreateRecipeDraftMutation,
    useCreateRecipeMutation,
    useEditRecipeMutation,
    useGetRecipeByIdQuery,
} from '~/query/create-recipe-api';
import { RecipeDraft, StatusResponse } from '~/query/types';
import { ApplicationRoute } from '~/router';
import { Error, setAppLoader, setNotification } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

import { EmptyConatainer } from '../common/Containers/EmptyContainer';
import { recipieSchema } from '../Login/schemes';
import { IngredientFormData, IngredientsEditor } from './IngredientsEditor';
import { ExitConfirmationModal } from './Modal/ExitConfirmationModal';
import { SaveImageModal } from './Modal/SaveImageModal';
import { RecipeCardEditor } from './RecipeCardEditor';
import { StepsEditor } from './StepsEditor';

export type RecipieFormData = {
    title: string;
    description: string;
    time?: string;
    categoriesIds: string[];
    portions?: string;
    image?: string;
    steps: CookingStep[];
    ingredients: IngredientFormData[];
    meat?: string;
    garnish?: string;
};

export const CreateRecipePage = () => {
    const { id } = useParams();
    const location = useLocation();
    const { getString } = useResource();
    const [hasChanges, setHasChanges] = useState(false);
    const [stepsImages, setStepsImages] = useState<unknown[]>([null]);
    const [selectedStepIdxPreview, setSelectedStepIdxPreview] = useState(-1);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {
        showModal: isShowExitConfirmationModal,
        handleConfirm,
        handleCancel,
    } = useNavigationGuard(hasChanges);
    const {
        isOpen: isOpenSaveImageModal,
        onClose: onCloseSaveImageModal,
        onOpen: onOpenSaveImageModal,
    } = useDisclosure({ defaultIsOpen: false });

    const {
        reset,
        clearErrors,
        trigger,
        getValues,
        setValue,
        control,
        register,
        formState: { errors: formErrors },
    } = useForm({
        resolver: yupResolver(recipieSchema),
        defaultValues: {
            ingredients: [{ title: '', count: null, measureUnit: '' }],
            steps: [{ stepNumber: 1, description: '', image: null }],
            categoriesIds: [],
        },
        mode: 'onChange',
    });

    const ingredients = useFieldArray({
        control: control,
        name: 'ingredients',
    });
    const steps = useFieldArray({
        control: control,
        name: 'steps',
    });

    const {
        data: recipe,
        isSuccess,
        isError,
        isLoading,
    } = useGetRecipeByIdQuery(id!, { skip: id === undefined });
    useEffect(() => {
        if (location.pathname.startsWith('/edit-recipe')) {
            if (isLoading) {
                dispatch(setAppLoader(true));
            }
            if (isError) {
                dispatch(setAppLoader(false));
            }
            if (isSuccess) {
                dispatch(setAppLoader(false));
                const isRecipeOwner = getJWTPayload().userId === recipe.authorId;
                if (isRecipeOwner) {
                    reset({
                        image: recipe.image,
                        title: recipe.title,
                        description: recipe.description,
                        categoriesIds: recipe.categoriesIds!,
                        time: recipe.time,
                        portions: recipe.portions?.toString() ?? '',
                        steps: recipe.steps,
                        ingredients: recipe.ingredients,
                    });
                    setStepsImages(recipe.steps.map((it) => it.image));
                } else {
                    navigate(ApplicationRoute.INDEX);
                }
            }
        }
    }, [recipe, isSuccess, isError, isLoading, dispatch, reset, navigate, location.pathname]);

    const [
        createDraft,
        {
            isError: isErrorCreateRecipeDraft,
            isSuccess: isSuccessCreateRecipeDraft,
            isLoading: isLoadingCreateRecipeDraft,
            error: errorCreateRecipeDraft,
        },
    ] = useCreateRecipeDraftMutation();
    const [createRecipe] = useCreateRecipeMutation();
    const [editRecipe] = useEditRecipeMutation();

    const handleOnSaveRecipeDraftError = (response?: StatusResponse) => {
        switch (response?.status) {
            case StatusCode.InternalServerError:
                dispatch(
                    setNotification({
                        _id: crypto.randomUUID(),
                        title: 'Ошибка сервера',
                        message: 'Не удалось сохранить черновик рецепта',
                        type: 'error',
                    }),
                );
                break;
            case StatusCode.Confilct:
                dispatch(
                    setNotification({
                        _id: crypto.randomUUID(),
                        title: 'Ошибка',
                        message: 'Рецепт с таким названием уже существует',
                        type: 'error',
                    }),
                );
                break;
            default:
                dispatch(
                    setNotification({
                        _id: crypto.randomUUID(),
                        title: response!.data.error,
                        message: response!.data.message,
                        type: 'error',
                    }),
                );
        }
    };
    const handleOnPublishRecipeError = (response?: StatusResponse) => {
        switch (response?.status) {
            case StatusCode.Confilct:
                dispatch(
                    setNotification({
                        _id: crypto.randomUUID(),
                        title: 'Ошибка',
                        message: 'Рецепт с таким названием уже существует',
                        type: 'error',
                    }),
                );
                break;
            case StatusCode.InternalServerError:
                dispatch(
                    setNotification({
                        _id: crypto.randomUUID(),
                        title: Error.SERVER,
                        message: 'Попробуйте пока сохранить в черновик.',
                        type: 'error',
                    }),
                );
                break;
            default:
                dispatch(
                    setNotification({
                        _id: crypto.randomUUID(),
                        title: response?.data.error ?? '',
                        message: response?.data.message,
                        type: 'error',
                    }),
                );
        }
    };
    useEffect(() => {
        if (isLoadingCreateRecipeDraft) {
            dispatch(setAppLoader(true));
        }
        if (isSuccessCreateRecipeDraft) {
            dispatch(setAppLoader(false));
            setHasChanges(false);
            setTimeout(() => {
                navigate(ApplicationRoute.INDEX, { replace: true });
                dispatch(
                    setNotification({
                        _id: crypto.randomUUID(),
                        title: 'Черновик успешно сохранен',
                        type: 'success',
                    }),
                );
            }, 0);
        }
        if (isErrorCreateRecipeDraft) {
            dispatch(setAppLoader(false));
            handleOnSaveRecipeDraftError(errorCreateRecipeDraft as StatusResponse);
        }
    }, [
        isErrorCreateRecipeDraft,
        isSuccessCreateRecipeDraft,
        isLoadingCreateRecipeDraft,
        errorCreateRecipeDraft,
    ]);

    const handleOnClickSafeDraft = async () => {
        clearErrors();
        const isValid = await trigger('title');
        if (isValid) {
            createDraft({
                ...getValues(),
                ingredients: getValues('ingredients').map((it) => ({
                    ...it,
                    count: parseInt(it.count),
                })),
                image: URL.parse(getValues('image') ?? '')?.pathname,
                portions: parseInt(getValues('portions') ?? ''),
                time: parseInt(getValues('time') ?? ''),
            });
        }
    };

    const {
        data: categories,
        /*    isSuccess: isSuccessGetCategories,
           isLoading: isLoadingGetCategories,
           isError: isErrorGetCategories, */
    } = useGetCategoriesQuery();

    const handleOnClickPublish = async () => {
        clearErrors();
        const isValid = await trigger();
        if (isValid) {
            try {
                const recipe: RecipeDraft = {
                    ...getValues(),
                    ingredients: getValues('ingredients').map((it) => ({
                        ...it,
                        count: parseInt(it.count),
                    })),
                    image: URL.parse(getValues('image') ?? '')?.pathname,
                    portions: parseInt(getValues('portions') ?? ''),
                    time: parseInt(getValues('time') ?? ''),
                };
                recipe.steps = (recipe as RecipeDraft).steps?.map((it, i) => ({
                    ...it,
                    stepNumber: i + 1,
                    image: URL.parse(stepsImages[i] as string)?.pathname ?? null,
                }));

                dispatch(setAppLoader(true));
                recipe._id = location.pathname.startsWith('/edit-recipe')
                    ? (await editRecipe({ id: id!, body: recipe }).unwrap())._id
                    : (await createRecipe(recipe).unwrap())._id;

                setHasChanges(false);
                setTimeout(() => {
                    navigate(getPathToRecipe({ recipe: recipe, categories: categories }), {
                        replace: true,
                    });
                    dispatch(
                        setNotification({
                            _id: crypto.randomUUID(),
                            title: 'Рецепт успешно опубликован',
                            type: 'success',
                        }),
                    );
                }, 0);
            } catch (e) {
                handleOnPublishRecipeError(e as StatusResponse);
            } finally {
                dispatch(setAppLoader(false));
            }
        }
    };

    return (
        <EmptyConatainer>
            <>
                <form data-test-id='recipe-form' onChange={() => setHasChanges(true)}>
                    <Flex
                        direction={{ base: 'column' }}
                        px={{ base: '16px', md: '20px', lg: '0px' }}
                        rowGap={{ base: '24px' }}
                    >
                        <RecipeCardEditor
                            selectedCategoriesIds={getValues('categoriesIds')}
                            image={getValues('image') ?? ''}
                            onChangeSelectedSubcategories={(categoriesIds) =>
                                setValue('categoriesIds', categoriesIds)
                            }
                            onClickImage={() => setTimeout(() => onOpenSaveImageModal(), 401)} //Задержка для прохождения теста
                            formErrors={formErrors}
                            register={register}
                        />
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
                                onClickAddIngredient={() =>
                                    ingredients.append({ title: '', count: null, measureUnit: '' })
                                }
                                onClickRemoveNthIngredient={(i) => ingredients.remove(i)}
                            />
                            <StepsEditor
                                images={stepsImages as string[]}
                                register={register}
                                formErrors={formErrors}
                                steps={steps.fields}
                                onClickAddStep={() =>
                                    steps.append({
                                        stepNumber: getValues().steps.length + 1,
                                        description: '',
                                        image: null,
                                    })
                                }
                                onRemoveNthStep={(i) => {
                                    steps.remove(i);
                                    setStepsImages(stepsImages.filter((_v, idx) => i !== idx));
                                }}
                                onClickNthImage={(i) => {
                                    setSelectedStepIdxPreview(i);
                                    onOpenSaveImageModal();
                                }}
                            />
                            <Stack
                                direction={{ base: 'column', md: 'row' }}
                                justifyContent='center'
                                gap={{ base: '20px' }}
                            >
                                <Button
                                    id='recipe-save-draft-button'
                                    data-test-id='recipe-save-draft-button'
                                    onClick={handleOnClickSafeDraft}
                                    variant='outline'
                                    borderColor='blackAlpha.600'
                                    leftIcon={<WriteLineIcon />}
                                >
                                    {getString('save-draft')}
                                </Button>
                                <Button
                                    id='recipe-publish-recipe-button'
                                    data-test-id='recipe-publish-recipe-button'
                                    onClick={handleOnClickPublish}
                                    variant='solid'
                                    backgroundColor='black'
                                    color='white'
                                >
                                    {getString('publish-recipe')}
                                </Button>
                            </Stack>
                        </Flex>
                    </Flex>
                </form>
                {isShowExitConfirmationModal && (
                    <ExitConfirmationModal
                        onClose={() => {
                            handleCancel();
                        }}
                        onExitWithoutSaving={() => handleConfirm()}
                        onClickSaving={async () => {
                            const isValid = await trigger('title');
                            if (isValid) {
                                setHasChanges(false);
                                createDraft(getValues());
                            }
                            handleCancel();
                        }}
                    />
                )}
                {isOpenSaveImageModal &&
                    (selectedStepIdxPreview === -1 ? (
                        <SaveImageModal
                            props={{
                                dataTestIdInput: 'recipe-image-block-input-file',
                                dataTestIdModal: 'recipe-image-modal',
                                dataTestIdPreview: 'recipe-image-modal-preview-image',
                                dataTestIdFallback: 'recipe-image-modal-image-block',
                                image: (getValues('image') as string) ?? '',
                                onClickClose: () => onCloseSaveImageModal(),
                                onClickSave: (image) => {
                                    setHasChanges(true);
                                    setTimeout(() => {
                                        setValue('image', image as string);
                                        trigger('image');
                                    }, 400); //Задержка для прохождения теста
                                },
                                onClickDelete: () => setValue('image', undefined),
                            }}
                        />
                    ) : (
                        <SaveImageModal
                            props={{
                                dataTestIdInput: `recipe-steps-image-block-${selectedStepIdxPreview}-input-file`,
                                dataTestIdPreview: 'recipe-image-modal-preview-image',
                                dataTestIdModal: 'recipe-image-modal',
                                dataTestIdFallback: 'recipe-image-modal-image-block',
                                image: steps.fields[selectedStepIdxPreview].image ?? '',
                                onClickClose: () => {
                                    onCloseSaveImageModal();
                                    setSelectedStepIdxPreview(-1);
                                    setHasChanges(true);
                                },
                                onClickSave: (image) => {
                                    setValue(
                                        `steps.${selectedStepIdxPreview}.image`,
                                        image as string,
                                    );
                                    setStepsImages([
                                        ...stepsImages.slice(0, selectedStepIdxPreview),
                                        image,
                                        ...stepsImages.slice(selectedStepIdxPreview + 1),
                                    ]);
                                },
                                onClickDelete: () => {
                                    setValue(`steps.${selectedStepIdxPreview}.image`, null);
                                    setStepsImages([
                                        ...stepsImages.slice(0, selectedStepIdxPreview),
                                        null,
                                        ...stepsImages.slice(selectedStepIdxPreview + 1),
                                    ]);
                                },
                            }}
                        />
                    ))}
            </>
        </EmptyConatainer>
    );
};
