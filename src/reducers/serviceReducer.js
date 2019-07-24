// reducers/serviceReducer.js

import { GUEST_READ_SERVICES } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
  data: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GUEST_READ_SERVICES:
      return {
        data: action.payload
      }
    default:
      return state;
  }
}