import { Image, Link, useBreakpointValue } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router';

import logoImg from '~/assets/logo.svg';
import logoMdImg from '~/assets/logo-md.svg';

export const Logo = () => {
    const path = useBreakpointValue({
        base: logoImg,
        md: logoMdImg,
    })!;

    return (
        <Link data-test-id='header-logo' as={ReactRouterLink} to='/'>
            <Image src={path} h={{ base: '32px' }} w={{ base: '32px', md: '135px' }} />
        </Link>
    );
};
