export enum ApiEndpoints {
    CATEGORY = '/category',
    RECIPE_BY_CATEGORY = '/recipe/category',
    RECIPE = '/recipe',
    LOGIN = '/auth/login',
    SIGNUP = '/auth/signup',
    FORGOT_PASSWORD = '/auth/forgot-password',
    VERIFY_OTP = '/auth/verify-otp',
    RESET_PASSWORD = '/auth/reset-password',
}

export enum StatusCode {
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    InternalServerError = 500,
}
