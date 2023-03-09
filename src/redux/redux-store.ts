import { createStore, applyMiddleware, AnyAction } from 'redux';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import rootReducer from './rootReducer';

const bindMiddleware = (middleware: any) => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension');
        return composeWithDevTools(applyMiddleware(...middleware));
    }

    return applyMiddleware(...middleware);
};

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case HYDRATE:
            return { ...state, ...action.payload };
        default:
            return rootReducer(state, action);
    }
};

const initStore = () => {
    return createStore(reducer, bindMiddleware([thunkMiddleware]));
};
const store = initStore();

export const wrapper = createWrapper(initStore);

/* Types */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ReduxState = ReturnType<typeof rootReducer>;
export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;
export type TypedThunk<ReturnType = void> = ThunkAction<ReturnType, ReduxState, unknown, AnyAction>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<ReduxState> = useSelector;
