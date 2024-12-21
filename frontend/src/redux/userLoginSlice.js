import { createSlice } from '@reduxjs/toolkit'

export const userLogin = createSlice({
    name: 'userLogin',
    initialState: {
        username: '',
        email: '',
        phone: '',
        sex: '',
        address: '',
        groupId: '',
        id: '',
        isAuthenticated: false
    },
    reducers: {
        loginRedux: (state, action) => {
            state.email = action.payload.email;
            state.username = action.payload.username;
            state.phone = action.payload.phone;
            state.sex = action.payload.sex;
            state.address = action.payload.address;
            state.groupId = action.payload.groupId;
            state.id = action.payload.id;
            state.isAuthenticated = action.payload.isAuthenticated
        },
    },
})

// Action creators are generated for each case reducer function
export const { loginRedux } = userLogin.actions

export default userLogin.reducer