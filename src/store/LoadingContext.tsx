import { useState, createContext } from 'react';

interface ILoadingContext {
    status: boolean;
    section: boolean;
    title: string;
    message: string;
    waitMessage: string;
    showProgressBar: boolean;
    progress: number;
}
export type LoadingContextType = {
    loading: ILoadingContext;
    setLoading: (loading: ILoadingContext) => void;
};
const defaultLoadingState = {
    status: false,
    section: false,
    title: '',
    message: '',
    waitMessage: '',
    showProgressBar: false,
    progress: 0,
};

const defaultContext = {
    loading: defaultLoadingState,
    setLoading: (_loading: ILoadingContext) => {},
};
export const LoadingContext = createContext<LoadingContextType>(defaultContext);

function LoadingProvider({ children }: any) {
    const [loading, _updateLoading] = useState(defaultLoadingState);

    const setLoading = (loading: ILoadingContext) => {
        _updateLoading({
            status: loading.status,
            section: loading.section,
            title: loading.title,
            message: loading.message,
            waitMessage: loading.waitMessage,
            showProgressBar: loading.showProgressBar,
            progress: loading.progress,
        });
    };

    return <LoadingContext.Provider value={{ loading, setLoading }}>{children}</LoadingContext.Provider>;
}

export default LoadingProvider;
