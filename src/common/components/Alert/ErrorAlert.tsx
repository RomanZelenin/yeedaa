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

import { AlertButtom } from './SuccessAlert';

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
    bottom?: AlertButtom;
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
