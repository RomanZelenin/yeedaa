import { Stack, useDisclosure } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useRef, useState } from 'react';
import { FieldArrayWithId, useFieldArray, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router';

import { SelectItem } from '~/app/features/filters/filtersSlice';
import { CookingStep } from '~/app/mocks/types/type_defenitions';
import { useNavigationGuard } from '~/common/hooks/useNavigationGuard';
import { getJWTPayload } from '~/common/utils/getJWTPayload';
import { getPathToRecipe } from '~/common/utils/getPathToRecipe';
import { StatusCode } from '~/query/constants';
import { useLazyGetCategoriesQuery } from '~/query/create-category-api';
import { useLazyGetMeasureUnitsQuery } from '~/query/create-measureUnits-api';
import {
    useCreateRecipeDraftMutation,
    useCreateRecipeMutation,
    useEditRecipeMutation,
    useLazyGetRecipeByIdQuery,
} from '~/query/create-recipe-api';
import { RecipeDraft, StatusResponse } from '~/query/types';
import { ApplicationRoute } from '~/router';
import { Error, myProfile, setAppLoader, setNotification } from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

import { EmptyConatainer } from '../common/Containers/EmptyContainer';
import { recipieSchema } from '../Login/schemes';
import { ExitConfirmationModal } from './Modal/ExitConfirmationModal';
import { SaveImageModalTest } from './Modal/SaveImageModalTest';
import { FooterCreateRecipe } from './Sections/FooterCreateRecipe';
import { HeaderCreateRecipe } from './Sections/HeaderCreateRecipe';
import { IngredientFormData, IngredientsEditor, MeasureUnit } from './Sections/IngredientsEditor';
import { StepsEditor } from './Sections/StepsEditor';

export type RecipieFormData = {
    title: string;
    description: string;
    time?: string;
    categoriesIds: SelectItem[];
    portions?: string;
    image?: string;
    steps: CookingStep[];
    ingredients: IngredientFormData[];
    meat?: string;
    garnish?: string;
};

export const CreateRecipePage = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id: recipeId } = useParams();
    const profile = useAppSelector(myProfile);

    const {
        isOpen: isOpenSaveImageModal,
        onClose: onCloseSaveImageModal,
        onOpen: onOpenSaveImageModal,
    } = useDisclosure();
    const [hasChanges, setHasChanges] = useState(false);
    const {
        showModal: isShowExitConfirmationModal,
        handleConfirm,
        handleCancel,
    } = useNavigationGuard(hasChanges);
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
        mode: 'onSubmit',
    });
    const ingredients = useFieldArray({
        control: control,
        name: 'ingredients',
    });
    const steps = useFieldArray({
        control: control,
        name: 'steps',
    });

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

    const handleOnClickPublish = async () => {
        clearErrors();
        const isValid = await trigger();
        if (isValid) {
            try {
                dispatch(setAppLoader(true));
                setHasChanges(false);
                const categories = await getCategories().unwrap();
                const recipe: RecipeDraft = {
                    ...getValues(),
                    categoriesIds: getValues('categoriesIds')
                        .filter((it) => it.selected)
                        .map((it) => it._id),
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
                    image: URL.parse(steps.fields[i].image as string)?.pathname ?? null,
                }));

                recipe._id = location.pathname.startsWith('/edit-recipe')
                    ? (await editRecipe({ id: recipeId!, body: recipe }).unwrap())._id
                    : (await createRecipe(recipe).unwrap())._id;

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

    const handleOnClickSafeDraft = async () => {
        clearErrors();
        const isValid = await trigger('title');
        if (isValid) {
            try {
                dispatch(setAppLoader(true));
                const result = await createDraft({
                    ...getValues(),
                    categoriesIds: getValues('categoriesIds')
                        .filter((it) => it.selected)
                        .map((it) => it._id),
                    ingredients: getValues('ingredients').map((it) => ({
                        ...it,
                        count: parseInt(it.count),
                    })),
                    image: URL.parse(getValues('image') ?? '')?.pathname,
                    portions: parseInt(getValues('portions') ?? ''),
                    time: parseInt(getValues('time') ?? ''),
                }).unwrap();
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
                console.log(result);
            } catch (e) {
                handleOnSaveRecipeDraftError(e as StatusResponse);
            } finally {
                dispatch(setAppLoader(false));
            }
        }
    };

    const [isLoading, setIsLoading] = useState(true);
    const measureUnits = useRef<MeasureUnit[]>([]);
    const [getMeasureUnits] = useLazyGetMeasureUnitsQuery();
    const [createDraft] = useCreateRecipeDraftMutation();
    const [createRecipe] = useCreateRecipeMutation();
    const [editRecipe] = useEditRecipeMutation();
    const [getRecipeById] = useLazyGetRecipeByIdQuery();
    const [getCategories] = useLazyGetCategoriesQuery();
    useEffect(() => {
        (async () => {
            try {
                dispatch(setAppLoader(true));
                setIsLoading(true);
                measureUnits.current = await getMeasureUnits().unwrap();
                const categories = await getCategories(undefined, true).unwrap();
                const subCategories = categories.flatMap(
                    (category) => category.subCategories ?? [],
                );
                if (location.pathname.startsWith('/new-recipe')) {
                    reset({
                        image: '',
                        title: '',
                        description: '',
                        categoriesIds: subCategories.map((it) => ({
                            _id: it._id,
                            title: it.title,
                            selected: false,
                        })) as SelectItem[],
                        time: undefined,
                        portions: undefined,
                        steps: [{ stepNumber: 1, description: '', image: null }],
                        ingredients: [{ title: '', count: null, measureUnit: '' }],
                    });
                    setValue(
                        'categoriesIds',
                        subCategories.map((it) => ({
                            _id: it._id,
                            title: it.title,
                            selected: false,
                        })) as SelectItem[],
                    );
                } else if (location.pathname.startsWith('/edit-recipe')) {
                    const recipe = await getRecipeById(recipeId!, true).unwrap();
                    const isRecipeOwner = getJWTPayload().userId === recipe.authorId;
                    if (isRecipeOwner) {
                        reset({
                            image: recipe.image,
                            title: recipe.title,
                            description: recipe.description,
                            categoriesIds: subCategories.map((it) => ({
                                _id: it._id,
                                title: it.title,
                                selected: recipe.categoriesIds!.includes(it._id),
                            })) as SelectItem[],
                            time: recipe.time,
                            portions: recipe.portions?.toString() ?? '',
                            steps: recipe.steps,
                            ingredients: recipe.ingredients,
                        });
                    }
                } else if (location.pathname.startsWith('/edit-draft') && recipeId) {
                    const draft = profile.profileInfo?.drafts.find((it) => it._id === recipeId!);
                    if (draft) {
                        reset({
                            image: draft.image,
                            title: draft.title,
                            description: draft.description ?? '',
                            categoriesIds: subCategories.map((it) => ({
                                _id: it._id,
                                title: it.title,
                                selected: draft.categoriesIds?.includes(it._id) ?? false,
                            })) as SelectItem[],
                            time: draft.time ?? '',
                            portions: draft.portions?.toString() ?? '',
                            steps: draft.steps ?? [{ stepNumber: 1, description: '', image: null }],
                            ingredients: draft.ingredients ?? [
                                { title: '', count: null, measureUnit: '' },
                            ],
                        });
                    }
                }
            } catch (e) {
                console.log(e);
            } finally {
                dispatch(setAppLoader(false));
                setIsLoading(false);
            }
        })();
    }, [location, profile.profileInfo]);

    const selectedStep = useRef<FieldArrayWithId<RecipieFormData, 'steps', 'id'>>(null);
    const isClickImage = useRef(false);

    if (!isLoading)
        return (
            <>
                <EmptyConatainer>
                    <form data-test-id='recipe-form' onChange={() => setHasChanges(true)}>
                        <Stack px={{ base: '16px', md: '20px', lg: '0px' }} rowGap='24px'>
                            <HeaderCreateRecipe
                                formErrors={formErrors}
                                getValues={getValues}
                                setValue={setValue}
                                register={register}
                                trigger={trigger}
                                onClickImage={() => {
                                    setTimeout(() => {
                                        isClickImage.current = true;
                                        onOpenSaveImageModal();
                                    }, 401);
                                }}
                            />

                            <IngredientsEditor
                                formErrors={formErrors}
                                ingredients={ingredients}
                                measureUnits={measureUnits.current}
                                register={register}
                            />

                            <StepsEditor
                                formErrors={formErrors}
                                register={register}
                                onClickImage={(step, i) => {
                                    selectedStep.current = { ...step, stepNumber: i + 1 };
                                    onOpenSaveImageModal();
                                }}
                                steps={steps}
                            />

                            <FooterCreateRecipe
                                onClickPublish={handleOnClickPublish}
                                onClickSafeDraft={handleOnClickSafeDraft}
                            />
                        </Stack>
                    </form>
                </EmptyConatainer>
                {isShowExitConfirmationModal && (
                    <ExitConfirmationModal
                        onClose={() => {
                            handleCancel();
                        }}
                        onExitWithoutSaving={() => handleConfirm()}
                        onClickSaving={async () => {
                            await handleOnClickSafeDraft();
                            handleCancel();
                        }}
                    />
                )}
                {isOpenSaveImageModal && (
                    <SaveImageModalTest
                        dataTestIdInput={
                            isClickImage.current
                                ? 'recipe-image-block-input-file'
                                : `recipe-steps-image-block-${selectedStep.current!.stepNumber - 1}-input-file`
                        }
                        dataTestIdModal='recipe-image-modal'
                        dataTestIdPreview='recipe-image-modal-preview-image'
                        dataTestIdFallback='recipe-image-modal-image-block'
                        image={
                            isClickImage.current
                                ? getValues('image')
                                : steps.fields[selectedStep.current!.stepNumber - 1].image!
                        }
                        isOpen={isOpenSaveImageModal}
                        onClose={onCloseSaveImageModal}
                        onSave={(image) => {
                            if (isClickImage.current === true) {
                                setTimeout(() => {
                                    setValue('image', image as string);
                                    trigger('image');
                                    isClickImage.current = false;
                                }, 400);
                            } else if (selectedStep.current) {
                                steps.update(selectedStep.current.stepNumber - 1, {
                                    ...getValues(`steps.${selectedStep.current.stepNumber - 1}`),
                                    image: image! as string,
                                });
                                selectedStep.current = null;
                            }
                            setHasChanges(true);
                        }}
                        onDelete={() => {
                            if (isClickImage.current === true) {
                                setValue('image', undefined);
                                isClickImage.current = false;
                            } else if (selectedStep.current) {
                                steps.update(selectedStep.current.stepNumber - 1, {
                                    ...selectedStep.current,
                                    image: null,
                                });
                                selectedStep.current = null;
                            }
                        }}
                    />
                )}
            </>
        );
};
