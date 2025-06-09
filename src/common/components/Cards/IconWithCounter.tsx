import { HStack, Text } from '@chakra-ui/react';
import { JSX } from 'react';

export const IconWithCounter = ({
    icon,
    count,
    dataTestId,
}: {
    icon: JSX.Element;
    count: number;
    dataTestId?: string;
}) => (
    <HStack data-test-id={dataTestId} spacing='6px' p='4px' minW='40px'>
        {icon}
        <Text textStyle='textXsLh4Semibold' color='lime.600'>
            {count}
        </Text>
    </HStack>
);
