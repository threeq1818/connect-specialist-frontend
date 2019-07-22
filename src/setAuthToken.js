// setAuthToken.js

import axios from 'axios';

const setAuthToken = token => {
    if (token) {
        //    axios.defaults.headers.common('Autherization') = token;
    }
    else {
        delete axios.defaults.header.common('Authorization');
    }
}

export default setAuthToken;