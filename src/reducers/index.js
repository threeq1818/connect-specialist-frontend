// recuders/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import serviceReducer from './serviceReducer';

export default combineReducers({
    auth: authReducer,
    services: serviceReducer,
    errors: errorReducer
});
