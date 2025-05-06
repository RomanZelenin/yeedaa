import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    CloseButton,
    useDisclosure,
} from '@chakra-ui/react';

export const ErrorAlert = ({ message }: { message: string }) => {
    const { isOpen: isVisible, onClose } = useDisclosure({ defaultIsOpen: true });

    return isVisible ? (
        <Alert
            data-test-id='error-notification'
            status='error'
            variant='solid'
            width='fit-content'
            position='fixed'
            margin='auto'
            right={0}
            left={0}
            bottom={{ base: '106px', md: '112px' }}
            zIndex='toast'
        >
            <AlertIcon />
            <Box>
                <AlertTitle>Ошибка сервера</AlertTitle>
                <AlertDescription>{message}</AlertDescription>
            </Box>
            <CloseButton
                data-test-id='close-alert-button'
                alignSelf='flex-start'
                position='relative'
                right={-1}
                top={-1}
                onClick={onClose}
            />
        </Alert>
    ) : (
        <></>
    );
};
