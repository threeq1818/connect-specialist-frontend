// reducers/serviceReducer.js

import { READ_PROJECTS, ACCEPT_PROJECT, REJECT_PROJECT } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
  data: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case READ_PROJECTS:
      return {
        data: action.payload
      }
    case ACCEPT_PROJECT:
      //  debugger
      let newState = [...state.data]
      let index = newState.findIndex(item => item._id === action.payload._id);
      newState[index].status = 'accept';
      newState[index].date = action.payload.date;
      return {
        data: newState
      };
    case REJECT_PROJECT:
      //  debugger
      let newState1 = [...state.data]
      let index1 = newState1.findIndex(item => item._id === action.payload._id);
      newState1[index1].status = 'reject';
      newState1[index1].date = action.payload.date;
      return {
        data: newState1
      };
    default:
      return state;
  }
}