import { Button, Input, Stack, Text } from '@chakra-ui/react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { RegistrationFormData } from './RegistrationForm';

export const PersonalInformation = ({
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
                data-test-id='first-name-input'
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
                onBlur={() => {
                    const thisElement = document.getElementById('firstName') as HTMLInputElement;
                    thisElement.value = thisElement.value.trim();
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
                data-test-id='last-name-input'
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
                onBlur={() => {
                    const thisElement = document.getElementById('lastName') as HTMLInputElement;
                    thisElement.value = thisElement.value.trim();
                }}
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
                data-test-id='email-input'
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
            data-test-id='submit-button'
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
