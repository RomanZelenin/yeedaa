import { jwtDecode } from 'jwt-decode';

export type JWTPayload = {
    userId: string;
    login: string;
    iat: number;
    exp: number;
};

export const getJWTPayload = () => {
    const payload = jwtDecode(sessionStorage.getItem('access_token')!);
    return payload as JWTPayload;
};
