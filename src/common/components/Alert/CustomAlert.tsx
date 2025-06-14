import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, CloseButton } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

import { Notification, removeNotification } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

import { BottomBehavior } from './BottomBehavior';

export const CustomAlert = ({
    notification,
    position,
    bottom,
}: {
    notification: Notification;
    position: 'fixed' | 'absolute';
    bottom?: BottomBehavior;
}) => {
    const dispatch = useAppDispatch();
    const refTimeout = useRef<NodeJS.Timeout>(undefined);

    useEffect(() => {
        refTimeout.current = setTimeout(() => {
            dispatch(removeNotification());
        }, 15000);
        return () => clearTimeout(refTimeout.current);
    }, []);

    return (
        <Alert
            key={notification._id}
            data-test-id='error-notification'
            status={notification.type}
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
                <AlertTitle data-test-id='error-notification-title'>
                    {notification.title}
                </AlertTitle>
                <AlertDescription data-test-id='error-notification-description'>
                    {notification.message}
                </AlertDescription>
            </Box>
            <CloseButton
                boxSize='12px'
                data-test-id='close-alert-button'
                alignSelf='flex-start'
                position='relative'
                right={-1}
                top={1}
                onClick={() => {
                    dispatch(removeNotification());
                }}
            />
        </Alert>
    );
};
