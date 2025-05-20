import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    CloseButton,
    ResponsiveValue,
} from '@chakra-ui/react';
import { useEffect } from 'react';

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
    bottom?:
        | ResponsiveValue<
              | number
              | string
              | '-moz-initial'
              | 'inherit'
              | 'initial'
              | 'revert'
              | 'revert-layer'
              | 'unset'
              | 'auto'
          >
        | undefined;
}) => {
    useEffect(() => {
        setTimeout(() => {
            onClose();
        }, 15000);
    }, [isOpen]);

    return (
        isOpen && (
            <Alert
                data-test-id='error-notification'
                status='error'
                variant='solid'
                width='fit-content'
                position={position}
                margin='auto'
                right={0}
                left={0}
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
