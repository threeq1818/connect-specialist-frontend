// actions/projects.js

import axios from 'axios';
import { GET_ERRORS, READ_PROJECTS, ACCEPT_PROJECT, REJECT_PROJECT } from './types';

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
  axios.get(`api/projects/customer/finishedProjs/${id}`)
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

export const fetchRequestedProjects_specialist = (id) => dispatch => {
  axios.get(`api/projects/specialist/requestedProjs/${id}`)
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

export const acceptProject_specialist = (id) => dispatch => {
  axios.put(`api/projects/specialist/acceptProject/${id}`)
    .then(res => {
      dispatch({
        type: ACCEPT_PROJECT,
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

export const rejectProject_specialist = (id) => dispatch => {
  axios.put(`api/projects/specialist/rejectProject/${id}`)
    .then(res => {
      dispatch({
        type: REJECT_PROJECT,
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

export const fetchFinishedProjects_specialist = (id) => dispatch => {
  axios.get(`api/projects/specialist/finishedProjs/${id}`)
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


