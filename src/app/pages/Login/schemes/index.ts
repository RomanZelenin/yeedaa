import * as yup from 'yup';

import { SelectItem } from '~/app/features/filters/filtersSlice';
import { CookingStep } from '~/app/mocks/types/type_defenitions';
import { NoteFormData } from '~/common/components/Drawer/AddNoteDrawer';

import { RecipieFormData } from '../../CreateRecipe/CreateRecipePage';
import { IngredientFormData } from '../../CreateRecipe/Sections/IngredientsEditor';
import { ChangeProfilePasswordFormData } from '../../ProfileSettings/Modal/ChangeProfilePasswordModal';
import { ProfileNameFormData } from '../../ProfileSettings/Sections/HeaderProfileSettings';
import { LoginFormData } from '../LoginForm/LoginForm';
import { AccountFormData } from '../Modal/Recovery/AccountRecoveryForm';
import { EmailRecoveryFormData } from '../Modal/Recovery/EmailRecoveryForm';
import { RegistrationFormData } from '../RegistrationForm/RegistrationForm';

const emailTemplate = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const loginTemplate = /^[A-Za-z0-9!@#$&_+\-.]+$/;
const passwordTemplate = /^(?=.*[A-Z])(?=.*\d)[A-Za-z0-9!@#$&_+\-.]+$/;
const startFirstOrLastNameTemplate = /^[А-ЯЁ]/;
const firstOrLastName = /^[а-яА-ЯЁё-]*$/;

const INPUT_LOGIN = 'Введите логин';
const MAX_LENGTH = 'Максимальная длина 50 символов';
const INPUT_PASSWORD = 'Введите пароль';
const INPUT_EMAIL = 'Введите e-mail';
const INPUT_CORRECT_EMAIL = 'Введите корректный e-mail';
const DOSNT_MATCH_FORMAT = 'Не соответствует формату';
const REPEAT_PASSWORD = 'Повторите пароль';
const INPUT_FIRST_NAME = 'Введите имя';
const INPUT_LAST_NAME = 'Введите фамилию';
const PASSWORDS_MUST_MATCH = 'Пароли должны совпадать';
const START_WITH_CYRILLIC = 'Должно начинаться с кириллицы А-Я';
const ONLY_CYRILLIC = 'Только кириллица А-Я, и "-"';

export const loginFormSchema: yup.ObjectSchema<LoginFormData> = yup
    .object({
        login: yup.string().trim().required(INPUT_LOGIN).max(50, MAX_LENGTH),
        password: yup.string().required(INPUT_PASSWORD).max(50, MAX_LENGTH),
    })
    .required();

export const emailRecoverySchema: yup.ObjectSchema<EmailRecoveryFormData> = yup
    .object({
        email: yup
            .string()
            .required(INPUT_EMAIL)
            .max(50, MAX_LENGTH)
            .test({
                name: 'email',
                test(value, ctx) {
                    if (!emailTemplate.test(value)) {
                        return ctx.createError({ message: INPUT_CORRECT_EMAIL });
                    }

                    return true;
                },
            }),
    })
    .required();

export const accountRecoverySchema: yup.ObjectSchema<AccountFormData> = yup
    .object({
        login: yup
            .string()
            .trim()
            .required(INPUT_LOGIN)
            .max(50, MAX_LENGTH)
            .min(5, DOSNT_MATCH_FORMAT)
            .test({
                name: 'valid-symbols',
                test(value, ctx) {
                    if (!loginTemplate.test(value)) {
                        return ctx.createError({ message: DOSNT_MATCH_FORMAT });
                    }
                    return true;
                },
            }),
        password: yup
            .string()
            .required(INPUT_PASSWORD)
            .max(50, MAX_LENGTH)
            .min(8, DOSNT_MATCH_FORMAT)
            .test({
                name: 'valid-symbols',
                test(value, ctx) {
                    if (!passwordTemplate.test(value)) {
                        return ctx.createError({ message: DOSNT_MATCH_FORMAT });
                    }
                    return true;
                },
            }),
        passwordConfirm: yup
            .string()
            .required(REPEAT_PASSWORD)
            .when('password', (password, schema) =>
                password && password.length > 0
                    ? schema.oneOf(password, PASSWORDS_MUST_MATCH)
                    : schema,
            ),
    })
    .required();

export const registrationFormSchema: yup.ObjectSchema<RegistrationFormData> = yup
    .object({
        firstName: yup
            .string()
            .trim()
            .required(INPUT_FIRST_NAME)
            .max(50, MAX_LENGTH)
            .test({
                name: 'start-first-name',
                test(value, ctx) {
                    if (!startFirstOrLastNameTemplate.test(value)) {
                        return ctx.createError({
                            message: START_WITH_CYRILLIC,
                        });
                    }
                    if (!firstOrLastName.test(value)) {
                        return ctx.createError({ message: ONLY_CYRILLIC });
                    }
                    return true;
                },
            }),
        lastName: yup
            .string()
            .trim()
            .required(INPUT_LAST_NAME)
            .max(50, MAX_LENGTH)
            .test({
                name: 'start-last-name',
                test(value, ctx) {
                    if (!startFirstOrLastNameTemplate.test(value)) {
                        return ctx.createError({
                            message: START_WITH_CYRILLIC,
                        });
                    }
                    if (!firstOrLastName.test(value)) {
                        return ctx.createError({ message: ONLY_CYRILLIC });
                    }
                    return true;
                },
            }),
        email: yup
            .string()
            .required(INPUT_EMAIL)
            .max(50, MAX_LENGTH)
            .test({
                name: 'email',
                test(value, ctx) {
                    if (!emailTemplate.test(value)) {
                        return ctx.createError({ message: INPUT_CORRECT_EMAIL });
                    }

                    return true;
                },
            }),
        login: yup
            .string()
            .trim()
            .required(INPUT_LOGIN)
            .max(50, MAX_LENGTH)
            .min(5, DOSNT_MATCH_FORMAT)
            .test({
                name: 'valid-symbols',
                test(value, ctx) {
                    if (!loginTemplate.test(value)) {
                        return ctx.createError({ message: DOSNT_MATCH_FORMAT });
                    }
                    return true;
                },
            }),
        password: yup
            .string()
            .required(INPUT_PASSWORD)
            .max(50, MAX_LENGTH)
            .min(8, DOSNT_MATCH_FORMAT)
            .test({
                name: 'valid-symbols',
                test(value, ctx) {
                    if (!passwordTemplate.test(value)) {
                        return ctx.createError({ message: DOSNT_MATCH_FORMAT });
                    }
                    return true;
                },
            }),
        confirmPassword: yup
            .string()
            .required(REPEAT_PASSWORD)
            .when('password', (password, schema) =>
                password && password.length > 0
                    ? schema.oneOf(password, PASSWORDS_MUST_MATCH)
                    : schema,
            ),
    })
    .required();

export const ingredientSchema: yup.ObjectSchema<IngredientFormData> = yup
    .object({
        title: yup.string().trim().required().max(50, MAX_LENGTH),
        count: yup.number().positive().required(),
        measureUnit: yup.string().required(),
    })
    .required();

export const cookingStepSchema: yup.ObjectSchema<CookingStep> = yup
    .object({
        stepNumber: yup.number().required(),
        description: yup.string().trim().required().max(300),
        image: yup.string().nullable(),
    })
    .required();

export const categoriesIdsStepSchema: yup.ObjectSchema<SelectItem> = yup
    .object({
        _id: yup.string().required(),
        title: yup.string().required(),
        selected: yup.bool().required(),
    })
    .required();

export const recipieSchema: yup.ObjectSchema<RecipieFormData> = yup
    .object({
        title: yup.string().trim().required().max(50),
        description: yup.string().trim().required().max(500),
        time: yup
            .string()
            .trim()
            .test({
                name: 'is-num',
                test(value) {
                    if (value === '') return true;
                    const num = parseInt(value!);
                    if (num < 1 || num > 1000) {
                        return false;
                    }
                    return true;
                },
            })
            .required(),
        categoriesIds: yup
            .array()
            .of(categoriesIdsStepSchema)
            .test({
                name: 'valid-count',
                test(value) {
                    if ((value?.filter((it) => it.selected).length ?? 0) >= 3) {
                        return true;
                    } else {
                        return false;
                    }
                },
            })
            .min(3)
            .required(),
        portions: yup
            .string()
            .trim()
            .test({
                name: 'is-num',
                test(value) {
                    if (value === '') return true;
                    const num = parseInt(value!);
                    if (num < 1) {
                        return false;
                    }
                    return true;
                },
            })
            .required(),
        image: yup.string().required(),
        steps: yup.array().of(cookingStepSchema).min(1).required(),
        ingredients: yup.array().of(ingredientSchema).min(1).required(),
    })
    .required();

export const noteSchema: yup.ObjectSchema<NoteFormData> = yup
    .object({
        text: yup
            .string()
            .trim()
            .min(10, 'Минимальная длина 10 символов')
            .max(160, 'Максимальная длина 160 символов')
            .required('Введите текст заметки'),
    })
    .required();

export const profileSchema: yup.ObjectSchema<ProfileNameFormData> = yup
    .object({
        firstName: yup
            .string()
            .trim()
            .required(INPUT_FIRST_NAME)
            .max(50, MAX_LENGTH)
            .test({
                name: 'start-first-name',
                test(value, ctx) {
                    if (!startFirstOrLastNameTemplate.test(value)) {
                        return ctx.createError({
                            message: START_WITH_CYRILLIC,
                        });
                    }
                    if (!firstOrLastName.test(value)) {
                        return ctx.createError({ message: ONLY_CYRILLIC });
                    }
                    return true;
                },
            }),
        lastName: yup
            .string()
            .trim()
            .required(INPUT_LAST_NAME)
            .max(50, MAX_LENGTH)
            .test({
                name: 'start-last-name',
                test(value, ctx) {
                    if (!startFirstOrLastNameTemplate.test(value)) {
                        return ctx.createError({
                            message: START_WITH_CYRILLIC,
                        });
                    }
                    if (!firstOrLastName.test(value)) {
                        return ctx.createError({ message: ONLY_CYRILLIC });
                    }
                    return true;
                },
            }),
    })
    .required();

export const changeProfilePasswordSchema: yup.ObjectSchema<ChangeProfilePasswordFormData> = yup
    .object({
        password: yup
            .string()
            .required(INPUT_PASSWORD)
            .max(50, MAX_LENGTH)
            .min(8, DOSNT_MATCH_FORMAT)
            .test({
                name: 'valid-symbols',
                test(value, ctx) {
                    if (!passwordTemplate.test(value)) {
                        return ctx.createError({ message: DOSNT_MATCH_FORMAT });
                    }
                    return true;
                },
            }),
        newPassword: yup
            .string()
            .required(INPUT_PASSWORD)
            .max(50, MAX_LENGTH)
            .min(8, DOSNT_MATCH_FORMAT)
            .test({
                name: 'valid-symbols',
                test(value, ctx) {
                    if (!passwordTemplate.test(value)) {
                        return ctx.createError({ message: DOSNT_MATCH_FORMAT });
                    }
                    return true;
                },
            }),
        repeatedPassword: yup
            .string()
            .required(REPEAT_PASSWORD)
            .when('newPassword', (newPassword, schema) =>
                newPassword && newPassword.length > 0
                    ? schema.oneOf(newPassword, PASSWORDS_MUST_MATCH)
                    : schema,
            ),
    })
    .required();
