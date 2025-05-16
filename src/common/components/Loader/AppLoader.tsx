import { Box, Center, Spinner } from '@chakra-ui/react';
import { ReactNode } from 'react';

export const AppLoader = ({ isLoading, children }: { isLoading: boolean; children: ReactNode }) => (
    <>
        <Box
            display={isLoading ? 'flex' : 'none'}
            position='fixed'
            top={0}
            left={0}
            width='100%'
            height='100%'
            zIndex='toast'
        >
            <Center
                position='fixed'
                width='206px'
                top='50%'
                left='50%'
                transform='translate(-50%, -50%)'
                data-test-id=''
                boxSize='206px'
                bgGradient='radial(30% 30% at 50% 50%, rgba(196, 255, 97, 0.7) 0%, rgba(255, 255, 255, 0) 100%) lime.50'
            >
                <Spinner
                    data-test-id={isLoading ? 'app-loader' : ''}
                    size='lg'
                    boxSize='37px'
                    minW={0}
                />
            </Center>
        </Box>
        <Box filter={isLoading ? 'blur(2px)' : 'none'}>{children}</Box>
    </>
);
