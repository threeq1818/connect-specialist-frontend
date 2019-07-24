// actions/services.js

import axios from 'axios';
import { GET_ERRORS, GUEST_READ_SERVICES } from './types';

export const fetchServices = (id) => dispatch => {
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