import { Button, Image, Stack, Text } from '@chakra-ui/react';

import leftIcon from '~/assets/icons/left.svg';

import { useResource } from '../ResourceContext/ResourceContext';

interface FooterProps {
    onLogout?: () => void;
}

export const Footer = ({ onLogout }: FooterProps) => {
    const appVersion = '03.25';
    const currentYear = new Date().getFullYear();
    const copyright = `Все права защищены, ученический\u00A0файл, ©Клевер\u00A0Технолоджи, ${currentYear}`;
    const { getString } = useResource();

    return (
        <Stack
            direction='column'
            fontSize='12px'
            spacing='16px'
            mb='32px'
            width='full'
            aria-label='Футер приложения'
        >
            <Text color='rgba(0, 0, 0, 0.24)'>
                {getString('program-version')} {appVersion}
            </Text>
            <Text color='rgba(0, 0, 0, 0.64)' whiteSpace='pre-wrap'>
                {copyright}
            </Text>
            <Button
                px={0}
                variant='ghost'
                justifyContent='start'
                leftIcon={<Image src={leftIcon} alt='Иконка выхода' onClick={onLogout} />}
            >
                {getString('exit')}
            </Button>
        </Stack>
    );
};
