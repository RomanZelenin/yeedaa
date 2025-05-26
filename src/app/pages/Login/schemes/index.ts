import * as yup from 'yup';

import { CookingStep } from '~/app/mocks/types/type_defenitions';

import { IngredientFormData } from '../../CreateRecipe/IngredientsEditor';
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

export const ingridientsSchema = yup.object({
    items: yup.array().of(ingredientSchema).required(),
});

export const cookingStepSchema: yup.ObjectSchema<CookingStep> = yup
    .object({
        stepNumber: yup.number().required(),
        description: yup.string().trim().required().max(300),
        image: yup.string(),
    })
    .required();

export const cookingStepsSchema = yup.object({
    items: yup.array().of(cookingStepSchema).required(),
});
