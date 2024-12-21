import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
    baseURL: 'http://localhost:3001/api/',
});

instance.defaults.withCredentials = true

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = error?.response?.status || 500
    switch (status) {
        case 401: {
            toast.error('Unauthorized the user. Please login!!')
            return error?.response;
        }
        case 403: {
            toast.error(`You don't permission to accsess`)
            return error|| Promise.reject(error);
        }

        default: {
            return Promise.reject(error);
        }
    }

});

export default instance

