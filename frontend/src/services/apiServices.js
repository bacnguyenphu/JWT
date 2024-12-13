import axios from '../utils/axiosCutomize'

const testApi = ()=>{
    return axios.get('testApi')
}

const register = (email,password,username,phone)=>{
    return axios.post('register',{email,password,username,phone})
}

const login = (email,password)=>{
    return axios.post('login',{email,password})
}

const getUsers = (page,limit)=>{
    return axios.get('getUsers',{params:{
        page,
        limit
    }})
}

export {testApi,register,login,getUsers}