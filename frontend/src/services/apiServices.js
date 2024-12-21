import axios from '../utils/axiosCutomize'

const testApi = () => {
    return axios.get('testApi')
}

const register = (email, password, username, phone) => {
    return axios.post('register', { email, password, username, phone })
}

const login = (email, password) => {
    return axios.post('login', { email, password })
}

const logout = ()=>{
    return axios.post('logout')
}

const getGroups = () => {
    return axios.get('getGroups')
}

const getUsers = (page, limit) => {
    return axios.get('getUsers', {
        params: {
            page,
            limit,

        }
    })
}

const getUserById = (id) => {
    return axios.get('getUserById', {
        params: {
            id
        }
    })
}

const deleteUser = (id) => {
    return axios.delete('deleteUser', { params: { id } })
}

const createUser = (data) => {
    return axios.post('createUser', { ...data })
}

const editUser = data=>{
    return axios.put('editUser',{...data})
}

const getRoles = ()=>{
    return axios.get('getRoles')
}

const createRoles = (roles)=>{
    console.log(roles);
    return axios.post('createRoles',roles)
}

export { testApi, register, login, getUsers, deleteUser, getGroups, createUser, getUserById,editUser,logout,getRoles,createRoles }