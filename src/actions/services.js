// actions/services.js

import axios from 'axios';
import { GET_ERRORS, GUEST_READ_SERVICES, READ_SERVICES } from './types';

export const fetchAllServices_home = () => dispatch => {
  axios.get(`api/services/home/fetchAll`)
    .then(res => {
      dispatch({
        type: GUEST_READ_SERVICES,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
}

export const fetchAllServices_customer = () => dispatch => {
  axios.get(`api/services/fetchAll`)
    .then(res => {
      dispatch({
        type: READ_SERVICES,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
}