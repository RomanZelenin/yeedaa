import { Button, Image, Stack, Text } from '@chakra-ui/react';

export default function Footer() {
    return (
        <Stack direction='column' fontSize='12px' px='24px' spacing='16px' mb='32px'>
            <Text color='rgba(0, 0, 0, 0.24)'>Версия программы 03.25</Text>
            <Text whiteSpace='pre-wrap' color='rgba(0, 0, 0, 0.64)'>{`Все права защищены,
ученический файл,
©Клевер Технолоджи, ${new Date().toLocaleDateString('ru-RU', { year: 'numeric' })}`}</Text>
            <Button
                px={0}
                variant='ghost'
                justifyContent='start'
                leftIcon={<Image src='./src/assets/icons/left.svg' />}
            >
                Выйти
            </Button>
        </Stack>
    );
}
