import { configureStore } from '@reduxjs/toolkit'
import loginUser from './userLoginSlice'

export default configureStore({
  reducer: {
    loginUser:loginUser
  },
})