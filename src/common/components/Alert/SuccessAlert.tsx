import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    CloseButton,
    useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

import { BottomBehavior } from './BottomBehavior';

export const SuccessAlert = ({
    title,
    message,
    position,
    bottom,
}: {
    title: string;
    message: string;
    position: 'fixed' | 'absolute';
    bottom?: BottomBehavior;
}) => {
    const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });

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
                status='success'
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
                <AlertIcon />
                <Box>
                    <AlertTitle>{title}</AlertTitle>
                    <AlertDescription>{message}</AlertDescription>
                </Box>
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
            </Alert>
        )
    );
};
