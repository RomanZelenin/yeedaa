import { Image, useBreakpointValue } from '@chakra-ui/react';

export const Logo = () => {
    const path = useBreakpointValue({
        base: '/src/assets/logo.svg',
        md: '/src/assets/logo-md.svg',
    })!;

    return (
        <a href='/'>
            <Image src={path} h={{ base: '32px' }} w={{ base: '32px', md: '135px' }} />
        </a>
    );
};
