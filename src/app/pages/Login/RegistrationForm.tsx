import { Button, Input, Progress, Stack, Text } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { FieldErrors, Form, useForm, UseFormRegister } from 'react-hook-form';
import * as yup from 'yup';

import { PasswordInput } from '~/common/components/PasswordInput/PasswordInput';

type RegistrationFormData = {
    firstName: string;
    lastName: string;
    email: string;
    login: string;
    password: string;
    confirmPassword: string;
};

const enum Step {
    ONE = 'Шаг 1. Личная информация',
    TWO = 'Шаг 2. Логин и пароль',
}

export const RegistrationForm = () => {
    const schema: yup.ObjectSchema<RegistrationFormData> = yup
        .object({
            firstName: yup
                .string()
                .required('Введите имя')
                .max(50, 'Максимальная длина 50 символов')
                .test({
                    name: 'start-first-name',
                    test(value, ctx) {
                        if (!/^[А-ЯЁ]/.test(value)) {
                            return ctx.createError({
                                message: 'Должно начинаться с кириллицы А-Я',
                            });
                        }
                        if (!/^[а-яА-ЯЁё-]*$/.test(value)) {
                            return ctx.createError({ message: 'Только кириллица А-Я, и "-"' });
                        }
                        return true;
                    },
                }),
            lastName: yup
                .string()
                .required('Введите фамилию')
                .max(50, 'Максимальная длина 50 символов')
                .test({
                    name: 'start-last-name',
                    test(value, ctx) {
                        if (!/^[А-ЯЁ]/.test(value)) {
                            return ctx.createError({
                                message: 'Должно начинаться с кириллицы А-Я',
                            });
                        }
                        if (!/^[а-яА-ЯЁё-]*$/.test(value)) {
                            return ctx.createError({ message: 'Только кириллица А-Я, и "-"' });
                        }
                        return true;
                    },
                }),
            email: yup
                .string()
                .required('Введите e-mail')
                .test({
                    name: 'email',
                    test(value, ctx) {
                        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                            return ctx.createError({ message: 'Введите корректный e-mail' });
                        }

                        return true;
                    },
                })
                .max(50, 'Максимальная длина 50 символов'),
            login: yup
                .string()
                .required('Введите логин')
                .max(50, 'Максимальная длина 50 символов')
                .min(5, 'Не соответствует формату')
                .test({
                    name: 'valid-symbols',
                    test(value, ctx) {
                        if (!/^[A-Za-z0-9!@#$&_+\-.]+$/.test(value)) {
                            return ctx.createError({ message: 'Не соответствует формату' });
                        }
                        return true;
                    },
                }),
            password: yup
                .string()
                .required('Введите пароль')
                .max(50, 'Максимальная длина 50 символов')
                .min(8, 'Не соответствует формату')
                .test({
                    name: 'valid-symbols',
                    test(value, ctx) {
                        if (!/^(?=.*[A-Z])(?=.*\d)[A-Za-z0-9!@#$&_+\-.]+$/.test(value)) {
                            return ctx.createError({ message: 'Не соответствует формату' });
                        }
                        return true;
                    },
                }),
            confirmPassword: yup
                .string()
                .required('Повторите пароль')
                .when('password', (password, schema) =>
                    password && password.length > 0
                        ? schema.oneOf(password, 'Пароли должны совпадать')
                        : schema,
                ),
        })
        .required();

    const {
        trigger,
        watch,
        getValues,
        control,
        register,
        clearErrors,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const password = watch('password');
    useEffect(() => {
        if (watch('confirmPassword')) {
            trigger('confirmPassword');
        }
    }, [password, trigger]);

    const getProgress = () => {
        const numFields = 6;
        const numValidFields = Object.entries(watch())
            .filter((it) => it[1].length !== 0)
            .flatMap((it) => it[0])
            .filter((it) => !Object.keys(errors).includes(it)).length;
        return (100 / numFields) * numValidFields;
    };

    const [currentStep, setCurrentStep] = useState<Step>(Step.ONE);

    return (
        <Form control={control}>
            <Stack spacing={{ base: '24px' }}>
                <Stack>
                    <label>
                        <Text textStyle='textMdLh6Normal'>{currentStep}</Text>
                    </label>
                    <Progress
                        aria-valuenow={getProgress()}
                        colorScheme='green'
                        hasStripe
                        value={getProgress()}
                        width='100%'
                    />
                </Stack>
                {currentStep === Step.ONE && (
                    <StepOne
                        onClickNext={() => {
                            if (getProgress() === 50) {
                                clearErrors();
                                setCurrentStep(Step.TWO);
                            }
                        }}
                        register={register}
                        errors={errors}
                    />
                )}
                {currentStep === Step.TWO && (
                    <StepTwo
                        onClickNext={() => {
                            if (getProgress() === 100) {
                                console.log(getValues());
                                alert('Finish\n' + Object.entries(getValues()));
                            }
                        }}
                        register={register}
                        errors={errors}
                    />
                )}
            </Stack>
        </Form>
    );
};

const StepOne = ({
    register,
    errors,
    onClickNext,
}: {
    onClickNext: () => void;
    register: UseFormRegister<RegistrationFormData>;
    errors: FieldErrors<RegistrationFormData>;
}) => (
    <>
        <Stack>
            <label htmlFor='firstName'>
                <Text textStyle='textMdLh6Normal'>Ваше имя</Text>
            </label>
            <Input
                {...register('firstName')}
                borderRadius='6px'
                borderColor={errors.firstName ? 'red' : 'lime.150'}
                bgColor='white'
                _active={{
                    bgColor: 'white',
                    borderColor: errors.firstName ? 'red' : 'lime.150',
                }}
                _focus={{
                    bgColor: 'white',
                    borderColor: errors.firstName ? 'red' : 'lime.150',
                }}
                placeholder='Имя'
                variant='filled'
                id='firstName'
            />
            <Text textStyle='textXsLh4Normal' color='red'>
                {errors.firstName?.message}
            </Text>
        </Stack>
        <Stack>
            <label htmlFor='lastName'>
                <Text textStyle='textMdLh6Normal'>Ваша фамилия</Text>
            </label>
            <Input
                {...register('lastName')}
                borderRadius='6px'
                borderColor={errors.lastName ? 'red' : 'lime.150'}
                bgColor='white'
                _active={{
                    bgColor: 'white',
                    borderColor: errors.lastName ? 'red' : 'lime.150',
                }}
                _focus={{
                    bgColor: 'white',
                    borderColor: errors.lastName ? 'red' : 'lime.150',
                }}
                placeholder='Фамилия'
                variant='filled'
                id='lastName'
            />
            <Text textStyle='textXsLh4Normal' color='red'>
                {errors.lastName?.message}
            </Text>
        </Stack>
        <Stack>
            <label htmlFor='email'>
                <Text textStyle='textMdLh6Normal'>Ваш e-mail</Text>
            </label>
            <Input
                {...register('email')}
                type='email'
                borderRadius='6px'
                borderColor={errors.email ? 'red' : 'lime.150'}
                bgColor='white'
                _active={{
                    bgColor: 'white',
                    borderColor: errors.email ? 'red' : 'lime.150',
                }}
                _focus={{
                    bgColor: 'white',
                    borderColor: errors.email ? 'red' : 'lime.150',
                }}
                placeholder='e-mail'
                variant='filled'
                id='email'
            />
            <Text textStyle='textXsLh4Normal' color='red'>
                {errors.email?.message}
            </Text>
        </Stack>
        <Button
            onClick={onClickNext}
            type='submit'
            bgColor='black'
            color='white'
            width='100%'
            mt='24px'
        >
            Дальше
        </Button>
    </>
);

const StepTwo = ({
    register,
    errors,
    onClickNext,
}: {
    onClickNext: () => void;
    register: UseFormRegister<RegistrationFormData>;
    errors: FieldErrors<RegistrationFormData>;
}) => (
    <>
        <Stack>
            <label htmlFor='login'>
                <Text textStyle='textMdLh6Normal'>Логин для входа на сайт</Text>
            </label>
            <Stack gap='4px'>
                <Input
                    {...register('login')}
                    borderRadius='6px'
                    borderColor={errors.login ? 'red' : 'lime.150'}
                    bgColor='white'
                    _active={{
                        bgColor: 'white',
                        borderColor: errors.login ? 'red' : 'lime.150',
                    }}
                    _focus={{
                        bgColor: 'white',
                        borderColor: errors.login ? 'red' : 'lime.150',
                    }}
                    placeholder='Логин'
                    variant='filled'
                    id='login'
                />
                <Text textStyle='textXsLh4Normal' color='blackAlpha.700'>
                    Логин не менее 5 символов, только латиница и !@#$&_+-.
                </Text>
            </Stack>

            <Text textStyle='textXsLh4Normal' color='red'>
                {errors.login?.message}
            </Text>
        </Stack>
        <Stack>
            <label htmlFor='password'>
                <Text textStyle='textMdLh6Normal'>Пароль</Text>
            </label>
            <Stack gap='4px'>
                <PasswordInput
                    {...register('password')}
                    borderRadius='6px'
                    borderColor={errors.password ? 'red' : 'lime.150'}
                    bgColor='white'
                    _active={{
                        bgColor: 'white',
                        borderColor: errors.password ? 'red' : 'lime.150',
                    }}
                    _focus={{
                        boxShadow: 'none',
                        bgColor: 'white',
                        borderColor: errors.password ? 'red' : 'lime.150',
                    }}
                    placeholder='Пароль'
                    id='password'
                    aria-invalid={errors.password ? 'true' : 'false'}
                />
                <Text textStyle='textXsLh4Normal' color='blackAlpha.700'>
                    Пароль не менее 8 символов, с заглавной буквой и цифрой
                </Text>
                <Text textStyle='textXsLh4Normal' color='red'>
                    {errors.password?.message}
                </Text>
            </Stack>
        </Stack>
        <Stack>
            <label htmlFor='confirmPassword'>
                <Text textStyle='textMdLh6Normal'>Повторите пароль</Text>
            </label>
            <PasswordInput
                {...register('confirmPassword')}
                borderRadius='6px'
                borderColor={errors.confirmPassword ? 'red' : 'lime.150'}
                bgColor='white'
                _active={{
                    bgColor: 'white',
                    borderColor: errors.confirmPassword ? 'red' : 'lime.150',
                }}
                _focus={{
                    boxShadow: 'none',
                    bgColor: 'white',
                    borderColor: errors.confirmPassword ? 'red' : 'lime.150',
                }}
                placeholder='Пароль'
                id='confirmPassword'
                aria-invalid={errors.confirmPassword ? 'true' : 'false'}
            />
            <Text textStyle='textXsLh4Normal' color='red'>
                {errors.confirmPassword?.message}
            </Text>
        </Stack>
        <Button
            onClick={onClickNext}
            type='submit'
            bgColor='black'
            color='white'
            width='100%'
            mt='24px'
        >
            Зарегистрироваться
        </Button>
    </>
);
