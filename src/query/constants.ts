export enum ApiEndpoints {
    CATEGORY = '/category',
    RECIPE_BY_CATEGORY = '/recipe/category',
    RECIPE = '/recipe',
    RECOMMEND = '/recipe/recommend',
    BLOGGER_RECIPES = '/recipe/user',
    LOGIN = '/auth/login',
    SIGNUP = '/auth/signup',
    FORGOT_PASSWORD = '/auth/forgot-password',
    VERIFY_OTP = '/auth/verify-otp',
    RESET_PASSWORD = '/auth/reset-password',
    MEASURE_UNITS = '/measure-units',
    FILE_UPLOAD = '/file/upload',
    RECIPE_DRAFT = '/recipe/draft',
    BLOGGERS = '/bloggers',
    TOGGLE_SUBSCRIPTION = '/users/toggle-subscription',
    MY_PROFILE = '/users/me',
    ALL_USERS = '/users/all',
    UPDATE_PROFILE_NAME = '/users/me/update-info',
    UPDATE_PROFILE_PASSWORD = '/users/me/update-password',
    MY_STATISTIC = '/statistic',
    UPLOAD_PHOTO = '/users/me/photo',
    PROFILE = '/profile',
    NOTE = '/users/me/note',
}

export enum StatusCode {
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    InternalServerError = 500,
    Confilct = 409,
}
export const API_BASE_URL = 'https://marathon-api.clevertec.ru/';
export const IMAGE_BASE_URL = 'https://training-api.clevertec.ru';
