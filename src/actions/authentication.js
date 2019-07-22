// actions/authentication.js

import axios from 'axios'
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt_decode';

export const registerUser = (user, history) => dispatch => {
    axios.post('/api/users/register', user)
        .then(res => {
            history.push('/login');
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.respose.data
            });
        });
}

export const loginUser = (user, history) => dispatch => {
    axios.post('api/users/login', user)
        .then(res => {
            const { token } = res.data;
            setAuthToken(token);
            localStorage.setItem('jwtToken', token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
            dispatch({
                action: GET_ERRORS,
                payload: err.respose.data
            });
        });
}

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    if (history)
        history.push('/Home');
}

export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}