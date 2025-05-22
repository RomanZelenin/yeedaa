import { Image, useBreakpointValue } from '@chakra-ui/react';

import logoImg from '~/assets/logo.svg';
import logoMdImg from '~/assets/logo-md.svg';

export const Logo = () => {
    const path = useBreakpointValue({
        base: logoImg,
        md: logoMdImg,
    })!;

    return (
        <a href='/'>
            <Image src={path} h={{ base: '32px' }} w={{ base: '32px', md: '135px' }} />
        </a>
    );
};
