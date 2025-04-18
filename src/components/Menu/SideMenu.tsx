import { Box, Flex } from '@chakra-ui/react';

import { Footer } from '../Footer/Footer';
import { MenuItems } from './MenuItems';

export const SideMenu = () => (
    <Flex
        direction='column'
        pos='fixed'
        paddingTop='24px'
        width='256px'
        bottom={0}
        top={{ base: '64px', md: '80px' }}
        boxShadow='0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.2)'
        aria-label='Боковое меню'
    >
        <MenuItems />
        <Box px='24px'>
            <Footer />
        </Box>
    </Flex>
);
