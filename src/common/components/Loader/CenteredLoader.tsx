import { Center, Spinner } from '@chakra-ui/react';

export const CenteredLoader = () => (
    <Center
        position='absolute'
        width='206px'
        top='50%'
        left='50%'
        transform='translate(-50%, -50%)'
        boxSize='150px'
        bgGradient='radial(30% 30% at 50% 50%, rgba(196, 255, 97, 0.7) 0%, rgba(255, 255, 255, 0) 100%) lime.50'
    >
        <Spinner data-test-id='mobile-loader' size='lg' boxSize='28px' minW={0} />
    </Center>
);
