// recuders/index.js
import { combineRecuders } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

export default combineRecuders({
    authReducer,
    errorReducer
});
