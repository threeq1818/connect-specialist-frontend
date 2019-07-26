// actions/projects.js

import axios from 'axios';
import { GET_ERRORS, READ_PROJECTS } from './types';

export const fetchRequestedProjects_customer = (id) => dispatch => {
  axios.get(`api/projects/customer/requestedProjs/${id}`)
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

export const fetchFinishedProjects_customer = (id) => dispatch => {
  console.log('ok');
  axios.get(`api/projects/customer/finishedProjs/${id}`)
    .then(res => {
      console.log(res.data);
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