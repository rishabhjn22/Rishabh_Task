import axios from 'axios';
// import store from '../redux/store';
import {BASE_URL} from '../utils/constant';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const Log = (tag: string, ...msg: any) => {
  // if (ENV !== 'PROD') {
  console.log(`${tag} - `, ...msg);
  // }
};

// Request Interceptor
axiosInstance.interceptors.request.use(
  // On Success
  async config => {
    // Check for token validity and if required then refresh the token

    // config.url = Config.URL;

    Log('Axios Request', '================');
    Log('Axios Request', 'Request BASE URL - ', config.baseURL);
    Log('Axios Request', 'Request URL - ', config.url);
    Log('Axios Request', 'Request Headers - ', config.headers);
    if (config.data) {
      Log('Axios Request', 'Request Body - ', config.data);
    }
    Log('Axios Request', '================');
    return config;
  },
  // On Error
  error => {
    return Promise.reject(error);
  },
);

// Request Interceptor

// Interceptor
axiosInstance.interceptors.response.use(
  // On Success
  response => {
    Log('Axios Response', '================');
    Log('Axios Response', 'Request status - ', response.status);
    Log('Axios Response', 'Request Data - ', response.data);
    Log('Axios Response', '================');
    return response;
  },
  // On Error
  error => {
    Log('Axios Response', error);
    Log('Axios Response', error.request._response);
    // if (error.request._response) {
    //   const err = JSON.parse(error.request._response);

    //   const {errors} = err;
    //   // This will show all the errors

    //   //   if (errors) {
    //   //     let concatErr = '';
    //   //     switch (typeof errors) {
    //   //       case 'string':
    //   //         concatErr = errors;

    //   //         break;
    //   //       case 'object':
    //   //         // concatErr = '';
    //   //         Object.keys(errors).map((key, index) => {
    //   //           if (index !== 0) {
    //   //             concatErr += '\n';
    //   //           }
    //   //           concatErr += `${errors[key]}`;
    //   //         });
    //   //         break;
    //   //     }

    //   //     // store.dispatch(snackAction({title: concatErr}));
    //   //   }
    // }
    return Promise.reject(error);
  },
);

export default axiosInstance;
