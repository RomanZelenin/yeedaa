import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    CloseButton,
    ResponsiveValue,
    useDisclosure,
} from '@chakra-ui/react';
import { useEffect } from 'react';

export const SuccessAlert = ({
    title,
    message,
    position,
    bottom,
}: {
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
