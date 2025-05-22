import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    CloseButton,
    HStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';

import { AlertProps } from './SuccessAlert';

export const ErrorAlert = ({
    alertProps,
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
    alertProps: AlertProps;
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
                maxW='355px'
                position={alertProps.position}
                width='fit-content'
                margin='auto'
                right={0}
                left={0}
                bottom={alertProps.bottom}
                zIndex='toast'
            >
                <HStack>
                    <AlertIcon justifySelf='start' />
                    <Box>
                        <HStack>
                            <AlertTitle flex={1}>{alertProps.title}</AlertTitle>
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
                            {alertProps.message}
                        </AlertDescription>
                    </Box>
                </HStack>
            </Alert>
        )
    );
};
