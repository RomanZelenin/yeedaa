import { Navigate, useSearchParams } from 'react-router';

import { setNotification } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

export const VerificationPage = () => {
    const [searchParams] = useSearchParams();
    const emailVerified = searchParams.get('emailVerified') === 'true';
    const dispatch = useAppDispatch();

    if (emailVerified) {
        dispatch(
            setNotification({
                _id: crypto.randomUUID(),
                title: 'Верификация прошла успешно',
                type: 'success',
            }),
        );
        return <Navigate to='/login' state={{ emailVerified }} replace />;
    } else {
        return <Navigate to='/registration' state={{ emailVerified }} replace />;
    }
};
