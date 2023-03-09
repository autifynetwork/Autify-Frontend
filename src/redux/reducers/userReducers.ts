import {
    EMAIL_WHITELIST_CHECK_REQUEST,
    EMAIL_WHITELIST_CHECK_SUCCESS,
    EMAIL_WHITELIST_CHECK_FAIL,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    CLEAR_ERRORS,
    RESET_STATE,
} from '../constants/userConstants';

// Email whitelist check reducer
export const emailWhitelistCheckReducer = (state = { user: null }, action: { type: any; payload: any }) => {
    switch (action.type) {
        case EMAIL_WHITELIST_CHECK_REQUEST:
            return {
                loading: true,
            };
        case EMAIL_WHITELIST_CHECK_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case EMAIL_WHITELIST_CHECK_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

// Auth reducer
export const authReducer = (
    state = { user: null, loading: false, success: null, error: null },
    action: { type: any; payload: any }
) => {
    switch (action.type) {
        case LOGIN_USER_REQUEST:
            return {
                loading: true,
            };
        case LOGIN_USER_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case LOGIN_USER_FAIL:
            return {
                loading: false,
                error: action.payload,
                success: false,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        case RESET_STATE:
            return {
                ...state,
                loading: false,
                success: null,
                error: null,
            };
        default:
            return state;
    }
};

// Logout reducer
export const logoutReducer = (
    state = { success: null, loading: false, error: null },
    action: { type: any; payload: any }
) => {
    switch (action.type) {
        case LOGOUT_USER_REQUEST:
            return {
                loading: true,
            };
        case LOGOUT_USER_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case LOGOUT_USER_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

// Loaded user reducer
export const loadedUserReducer = (state = { loading: true, user: null }, action: { type: any; payload: any }) => {
    switch (action.type) {
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            };
        case LOAD_USER_SUCCESS:
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            };
        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};
