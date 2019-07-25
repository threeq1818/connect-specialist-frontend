// actions/projects.js

import axios from 'axios';
import { GET_ERRORS, READ_PROJECTS } from './types';

export const fetchRequestedProjects_customer = (id) => dispatch => {
  axios.get(`api/projects/customer/requestedProjs/5d2f26ef88652e14708e3175`)
    .then(res => {
      dispatch({
        type: READ_PROJECTS,
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