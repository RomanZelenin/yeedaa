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

import { CloseInCircleIcon } from '~/common/components/Icons/CloseInCircleIcon';

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
        {
            testId: 'send-email-modal',
            content: (
                <EmailRecoveryForm
                    onSuccess={(data) => {
                        setEmail(data.email);
                        nextStep();
                    }}
                />
            ),
        },
        {
            testId: 'verification-code-modal',
            content: <OTPRecoveryFrom email={email} onSuccess={() => nextStep()} />,
        },
        {
            testId: 'reset-credentials-modal',
            content: (
                <AccountRecoveryForm
                    email={email}
                    onSuccess={() => {
                        onClickClose();
                        navigate('/login', { state: { successfulRecovery: true } });
                    }}
                />
            ),
        },
    ];

    return (
        <Modal onClose={handleOnClickClose} isOpen={isVisible} isCentered>
            <ModalOverlay />
            <ModalContent
                data-test-id={steps[currentStep].testId}
                borderRadius='16px'
                width={{ base: '316px', lg: '396px' }}
            >
                <ModalBody p={0}>
                    <IconButton
                        right={0}
                        position='absolute'
                        data-test-id='close-button'
                        m='24px'
                        boxSize='24px'
                        alignSelf='end'
                        minW={0}
                        onClick={handleOnClickClose}
                        backgroundColor='transparent'
                        icon={<CloseInCircleIcon boxSize='24px' />}
                        aria-label='close'
                    />
                    {steps[currentStep].content}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
