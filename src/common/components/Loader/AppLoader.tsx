import { Box, Center, ResponsiveValue, Spinner } from '@chakra-ui/react';
import { Property } from 'csstype';
import { ReactNode } from 'react';

export const AppLoader = ({
    isLoading,
    width = '100%',
    height = '100%',
    position = 'fixed',
    children,
}: {
    isLoading: boolean;
    position?: ResponsiveValue<Property.Position>;
    width?: string;
    height?: string;
    children: ReactNode;
}) => (
    <>
        <Box
            display={isLoading ? 'flex' : 'none'}
            position={position}
            width={width}
            height={height}
            zIndex='toast'
        >
            <Center
                position={position}
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
