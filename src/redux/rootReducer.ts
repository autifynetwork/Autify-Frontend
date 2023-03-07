import { combineReducers } from 'redux';
import { emailWhitelistCheckReducer, authReducer, logoutReducer, loadedUserReducer } from './reducers/userReducers';

const rootReducer = combineReducers({
    emailWhitelistCheck: emailWhitelistCheckReducer,
    auth: authReducer,
    logout: logoutReducer,
    loadedUser: loadedUserReducer,
});

export default rootReducer;
