// recuders/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import serviceReducer from './serviceReducer';
import projectReducer from './projectReducer';

export default combineReducers({
    auth: authReducer,
    services: serviceReducer,
    projects: projectReducer,
    errors: errorReducer
});
