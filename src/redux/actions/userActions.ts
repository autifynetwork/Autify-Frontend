import axios from 'axios';
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
import { magic } from '@/lib/magic';
import apolloClient from '@/lib/apollo-client';
import { CHECK_EMAIL } from '@/lib/queries/api';

// Email whitelist check
export const emailWhitelistCheck = (email: string) => async (dispatch: any) => {
    try {
        dispatch({ type: EMAIL_WHITELIST_CHECK_REQUEST });

        // TODO: Make API call to validate email whitelist status
        // const whitelisted = email.endsWith('autify.network');
        // const result = await apolloClient.query({
        //     query: CHECK_EMAIL,
        //     variables: {
        //         email,
        //     },
        // });

        dispatch({
            type: EMAIL_WHITELIST_CHECK_SUCCESS,
        });
        return;

        if (result.data.checkEmail === 'true') {
            dispatch({
                type: EMAIL_WHITELIST_CHECK_SUCCESS,
            });
        } else {
            dispatch({
                type: EMAIL_WHITELIST_CHECK_FAIL,
                payload: 'Email not whitelisted',
            });
        }
    } catch (error) {
        dispatch({
            type: EMAIL_WHITELIST_CHECK_FAIL,
            payload: 'Email not whitelisted',
        });
    }
};

// Login user
export const loginUser = (userData: any) => async (dispatch: any) => {
    try {
        dispatch({ type: LOGIN_USER_REQUEST });

        console.log(userData);

        // const config = {
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // };

        // TODO: Make API call to login user
        // await axios.post(`/api/auth/register`, userData, config);

        dispatch({
            type: LOGIN_USER_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: LOGIN_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Logout user
export const logoutUser = () => async (dispatch: any) => {
    try {
        dispatch({ type: LOGOUT_USER_REQUEST });

        // TODO: Make API call to logout user
        await fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (magic) {
            await magic.user.logout();
        }

        dispatch({
            type: LOGOUT_USER_SUCCESS,
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: LOGOUT_USER_FAIL,
            payload: error,
        });
    }
};

// Load user
export const loadUser = () => async (dispatch: any) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        const { data } = await axios.get(`/api/me`);

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user,
        });
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Clear errors
export const clearErrors: any = () => async (dispatch: any) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};

// Reset state
export const resetState: any = () => async (dispatch: any) => {
    dispatch({
        type: RESET_STATE,
    });
};
