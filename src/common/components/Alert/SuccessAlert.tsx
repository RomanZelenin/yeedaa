import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    CloseButton,
    useDisclosure,
} from '@chakra-ui/react';
import { useEffect } from 'react';

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
    const { isOpen: isVisible, onClose } = useDisclosure({ defaultIsOpen: true });

    useEffect(() => {
        setTimeout(() => {
            onClose();
        }, 15000);
    }, [isVisible]);

    return (
        isVisible && (
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
