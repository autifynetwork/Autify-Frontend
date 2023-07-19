import React, { useState, createContext } from 'react';

const defaultErrorState = {
    title: '',
    message: '',
    showErrorBox: false,
};
const defaultSuccessState = {
    title: '',
    message: '',
    showSuccessBox: false,
};

export type ErrorStateType = {
    title?: string;
    message?: string;
    showErrorBox?: boolean;
};

export type SuccessStateType = {
    title?: string;
    message?: string;
    showSuccessBox?: boolean;
};

type SetErrorFunction = React.Dispatch<React.SetStateAction<ErrorStateType>>;
type SetSuccessFunction = React.Dispatch<React.SetStateAction<SuccessStateType>>;

export type StatusContextType = {
    error?: any;
    setError: SetErrorFunction;
    success?: any;
    setSuccess: SetSuccessFunction;
};

export const StatusContext = createContext<StatusContextType>({
    error: defaultErrorState,
    setError: () => {},
    success: defaultSuccessState,
    setSuccess: () => {},
});

function StatusContextProvider({ children }: any) {
    const [error, setError] = useState<any>(defaultErrorState);
    const [success, setSuccess] = useState<any>(defaultSuccessState);

    return <StatusContext.Provider value={{ error, success, setSuccess, setError }}>{children}</StatusContext.Provider>;
}

export default StatusContextProvider;
