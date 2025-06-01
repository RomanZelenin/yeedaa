import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { LoginFormData } from '~/app/pages/Login/LoginForm/LoginForm';
import { EmailRecoveryFormData } from '~/app/pages/Login/Modal/Recovery/EmailRecoveryForm';
import { OTPFormData } from '~/app/pages/Login/Modal/Recovery/OTPRecoveryForm';
import { RegistrationFormData } from '~/app/pages/Login/RegistrationForm/RegistrationForm';

import { API_BASE_URL, ApiEndpoints } from './constants';
import { StatusResponse } from './types';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    endpoints: (build) => ({
        login: build.mutation<StatusResponse, LoginFormData>({
            query: (body) => ({
                url: `${ApiEndpoints.LOGIN}`,
                method: 'post',
                body,
            }),
            transformResponse: (response, meta) => {
                const headers = meta?.response?.headers;
                const token = headers?.get('Authentication-Access');
                sessionStorage.setItem('access_token', token ?? '');
                return response as StatusResponse;
            },
            transformErrorResponse: (response) => {
                console.log(response);
                return response;
            },
        }),
        signup: build.mutation<StatusResponse, RegistrationFormData>({
            query: (body) => ({
                url: `${ApiEndpoints.SIGNUP}`,
                method: 'post',
                body,
            }),
            transformErrorResponse: (response) => {
                console.log(response);
                return response;
            },
        }),
        forgotPassword: build.mutation<StatusResponse, EmailRecoveryFormData>({
            query: (body) => ({
                url: `${ApiEndpoints.FORGOT_PASSWORD}`,
                method: 'post',
                body,
            }),
            transformErrorResponse: (response) => {
                console.log(response);
                return response;
            },
        }),
        verifyOTP: build.mutation<StatusResponse, OTPFormData>({
            query: (body) => ({
                url: `${ApiEndpoints.VERIFY_OTP}`,
                method: 'post',
                body,
            }),
            transformErrorResponse: (response) => {
                console.log(response);
                return response;
            },
        }),
        resetPassword: build.mutation<StatusResponse, EmailRecoveryFormData>({
            query: (body) => ({
                url: `${ApiEndpoints.RESET_PASSWORD}`,
                method: 'post',
                body,
            }),
            transformErrorResponse: (response) => {
                console.log(response);
                return response;
            },
        }),
    }),
});

export const {
    useLoginMutation,
    useSignupMutation,
    useForgotPasswordMutation,
    useVerifyOTPMutation,
    useResetPasswordMutation,
} = authApi;
