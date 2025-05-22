import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    CloseButton,
    HStack,
} from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

import { BottomBehavior } from './BottomBehavior';

export const ErrorAlert = ({
    title,
    message,
    position,
    bottom,
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    position: 'fixed' | 'absolute';
    bottom?: BottomBehavior;
}) => {
    const refTimeout = useRef<NodeJS.Timeout>(undefined);
    useEffect(() => {
        if (isOpen) {
            refTimeout.current = setTimeout(() => {
                onClose();
            }, 15000);
        } else {
            clearTimeout(refTimeout.current);
        }
    }, [isOpen]);

    return (
        isOpen && (
            <Alert
                data-test-id='error-notification'
                status='error'
                variant='solid'
                maxW={{ base: '355px', lg: '400px' }}
                position={position}
                width='fit-content'
                margin='auto'
                right={{ base: '16px', lg: '0px' }}
                left={{ base: '16px', lg: '0px' }}
                bottom={bottom}
                zIndex='toast'
            >
                <HStack>
                    <AlertIcon justifySelf='start' />
                    <Box>
                        <HStack>
                            <AlertTitle flex={1}>{title}</AlertTitle>
                            <CloseButton
                                boxSize='12px'
                                data-test-id='close-alert-button'
                                alignSelf='flex-start'
                                position='relative'
                                right={-1}
                                top={1}
                                onClick={() => {
                                    onClose();
                                }}
                            />
                        </HStack>

                        <AlertDescription textStyle='textMdLh6Normal' whiteSpace='pre-wrap'>
                            {message}
                        </AlertDescription>
                    </Box>
                </HStack>
            </Alert>
        )
    );
};
