import { Navigate, useSearchParams } from 'react-router';

export const VerificationPage = () => {
    const [searchParams] = useSearchParams();
    const emailVerified = searchParams.get('emailVerified') === 'true';

    return emailVerified ? (
        <Navigate to='/login' state={{ emailVerified }} replace />
    ) : (
        <Navigate to='/registration' state={{ emailVerified }} replace />
    );
};
