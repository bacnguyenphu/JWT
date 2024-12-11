import axios from '../utils/axiosCutomize'

const testApi = ()=>{
    return axios.get('testApi')
}

const register = (email,password,username,phone)=>{
    return axios.post('register',{email,password,username,phone})
}

export {testApi,register}