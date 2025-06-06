import { HStack, Text } from '@chakra-ui/react';
import { JSX } from 'react';

export const IconWithCounter = ({ icon, count }: { icon: JSX.Element; count: number }) => (
    <HStack spacing='6px' p='4px'>
        {icon}
        <Text textStyle='textXsLh4Semibold' color='lime.600'>
            {count}
        </Text>
    </HStack>
);
