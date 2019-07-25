// reducers/serviceReducer.js

import { READ_PROJECTS } from '../actions/types';
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
    default:
      return state;
  }
}