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

const getGroups = ()=>{
    return axios.get('getGroups')
}

const getUsers = (page,limit)=>{
    return axios.get('getUsers',{params:{
        page,
        limit
    }})
}

const deleteUser = (id)=>{
    return axios.delete('deleteUser',{ params: { id } })
}

const createUser = (data)=>{
    return axios.post('createUser',{...data})
}

export {testApi,register,login,getUsers,deleteUser,getGroups,createUser}