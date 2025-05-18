import {
    IconButton,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { ErrorAlert } from '~/common/components/Alert/ErrorAlert';
import { CloseInCircleIcon } from '~/common/components/Icons/CloseInCircleIcon';
import { Error, ResponseError } from '~/store/app-slice';

import { AccountRecoveryForm } from './AccountRecoveryForm';
import { EmailRecoveryForm } from './EmailRecoveryForm';
import { OTPRecoveryFrom } from './OTPRecoveryForm';

export const RecoveryModal = ({ onClickClose }: { onClickClose: () => void }) => {
    const navigate = useNavigate();
    const { isOpen: isVisible, onClose } = useDisclosure({ defaultIsOpen: true });

    const handleOnClickClose = () => {
        onClickClose();
        onClose();
    };

    const [currentStep, setCurrentStep] = useState(0);
    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const [email, setEmail] = useState('');
    const steps = [
        <EmailRecoveryForm
            onSuccess={(data) => {
                setEmail(data.email);
                nextStep();
            }}
        />,
        <OTPRecoveryFrom email={email} onSuccess={() => nextStep()} />,
        <AccountRecoveryForm
            email={email}
            onSuccess={() => {
                onClickClose();
                navigate('/login', { state: { successfulRecovery: true } });
            }}
        />,
    ];

    return (
        <Modal onClose={handleOnClickClose} isOpen={isVisible} isCentered>
            <ModalOverlay />
            <ModalContent borderRadius='16px' width={{ base: '316px', lg: '396px' }}>
                <ModalBody display='flex' flexDirection='column' p={0}>
                    <IconButton
                        m='24px'
                        boxSize='24px'
                        alignSelf='end'
                        minW={0}
                        onClick={handleOnClickClose}
                        backgroundColor='transparent'
                        icon={<CloseInCircleIcon boxSize='24px' />}
                        aria-label='close'
                    />
                    {steps[currentStep]}
                </ModalBody>

                {/*  <ErrorHandler error={error} /> */}
            </ModalContent>
        </Modal>
    );
};

export const ErrorHandler = ({ error }: { error: ResponseError }) => {
    if (error.value === Error.NONE) {
        return null;
    }
    return (
        <ErrorAlert
            bottom='20px'
            title={error.value}
            message={error.message ?? ''}
            position='fixed'
        />
    );
};
