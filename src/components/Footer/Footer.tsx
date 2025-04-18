import { Button, Image, Stack, Text } from '@chakra-ui/react';

interface FooterProps {
    onLogout?: () => void;
}

export const Footer = ({ onLogout }: FooterProps) => {
    const appVersion = '03.25';
    const currentYear = new Date().getFullYear();
    const copyright = `Все права защищены, ученический\u00A0файл, ©Клевер\u00A0Технолоджи, ${currentYear}`;

    return (
        <Stack
            direction='column'
            fontSize='12px'
            spacing='16px'
            mb='32px'
            width='full'
            aria-label='Футер приложения'
        >
            <Text color='rgba(0, 0, 0, 0.24)'>Версия программы {appVersion}</Text>
            <Text color='rgba(0, 0, 0, 0.64)' whiteSpace='pre-wrap'>
                {copyright}
            </Text>
            <Button
                px={0}
                variant='ghost'
                justifyContent='start'
                leftIcon={
                    <Image
                        src='/src/assets/icons/left.svg'
                        alt='Иконка выхода'
                        onClick={onLogout}
                    />
                }
            >
                Выйти
            </Button>
        </Stack>
    );
};
