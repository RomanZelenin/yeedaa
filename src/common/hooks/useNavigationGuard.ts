import { useEffect, useState } from 'react';
import { useBlocker } from 'react-router';

export function useNavigationGuard(shouldBlock: boolean) {
    const [showModal, setShowModal] = useState(false);
    //const [confirmedNavigation, setConfirmedNavigation] = useState(false);

    const blocker = useBlocker(
        ({ currentLocation, nextLocation }) =>
            shouldBlock &&
            /* !confirmedNavigation && */
            currentLocation.pathname !== nextLocation.pathname,
    );

    /*  useEffect(() => {
        if (!shouldBlock) return;

        const handleBeforeUnload = (e) => {
            if (!confirmedNavigation) {
                e.preventDefault();
                setShowModal(true);
                e.returnValue = '';
                return '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [shouldBlock, confirmedNavigation]); */

    useEffect(() => {
        if (blocker.state === 'blocked') {
            setShowModal(true);
        }
    }, [blocker]);

    const handleConfirm = () => {
        if (blocker.state === 'blocked') blocker.proceed();
        setShowModal(false);
    };

    const handleCancel = () => {
        if (blocker.state === 'blocked') blocker.reset();
        setShowModal(false);
    };

    /* useEffect(() => {
        setConfirmedNavigation(false);
    }, []); */

    return { showModal, handleConfirm, handleCancel };
}
