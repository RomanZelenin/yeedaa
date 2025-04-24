import { Box, GridItem, VStack } from '@chakra-ui/react';
import { JSX } from '@emotion/react/jsx-runtime';

import HeaderContainer from './HeaderContainer';

export default function ContentContainer({
    title,
    subtitle,
    children,
}: {
    title: string;
    subtitle?: string;
    children: JSX.Element;
}) {
    return (
        <>
            <GridItem
                px={{ md: '30px' }}
                colSpan={{ base: 4, md: 8 }}
                display='block'
                colStart={{ base: 1, md: 1, lg: 2, xl: 4 }}
                colEnd={{ base: 5, md: 13, lg: 12, xl: 10 }}
            >
                <Box px={{ base: '16px', md: '0px' }}>
                    <HeaderContainer title={title} subtitle={subtitle} />
                </Box>
            </GridItem>

            <GridItem
                colSpan={{ base: 4, md: 13 }}
                mt={{ base: '16px', lg: '24px' }}
                display='block'
                colStart={1}
                colEnd={{ lg: 13 }}
            >
                <VStack align='stretch' spacing='32px'>
                    {children}
                </VStack>
            </GridItem>
        </>
    );
}
