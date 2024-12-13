import { FaGoogle, FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/apiServices";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginRedux } from '../redux/userLoginSlice'

function Login() {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const handleLogin = async () => {
        const res = await login(email, password)
        
        if (res.errCode === 0) {
            let payload = {
                username: res.user.username,
                email: res.user.email,
                phone: res.user.phone,
                sex: res.user.sex,
                address: res.user.address,
                groupId: res.user.groupId,
                id: res.user.id,
                isAuthenticated: true
            }
            toast.success(res.message)
            dispatch(loginRedux(payload))
            navigate('/user')
        }
        else {
            toast.error(res.message)
        }

    }

    return (
        <div className="bg-gradient-to-r from-[#5c7909] to-[#00d4ff] h-screen pt-[100px]">
            <div className="container w-[375px] bg-white rounded-md mx-auto min-h-12 pb-5">
                <div className="text-center font-bold text-3xl py-4">Log in</div>
                <div className="px-4 flex flex-col gap-4">
                    <div>
                        <p className="text-xl">Email</p>
                        <input
                            className="w-full text-base p-1 outline-none border-2 border-gray-300 rounded-sm"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                    </div>
                    <div>
                        <p className="text-xl">Password</p>
                        <input
                            className="w-full text-base p-1 outline-none border-2 border-gray-300 rounded-sm"
                            placeholder="Username"
                            type="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                    </div>
                </div>
                <div className="px-4 mt-5">
                    <button
                        className="w-full bg-gradient-to-r from-[#5c7909] to-[#00d4ff] rounded-full text-white font-semibold text-xl py-3"
                        onClick={() => { handleLogin() }}
                    >
                        Login
                    </button>
                </div>
                <div className="px-4 text-sm cursor-pointer mt-3 flex justify-between">
                    <p>Forgot your password?</p>
                    <p
                        className="underline italic text-blue-600"
                        onClick={() => { navigate('/register') }}
                    >Register</p>
                </div>
                <div className="mt-4">
                    <p className="text-center">Or Login with:</p>
                    <div className="flex justify-center gap-x-3">
                        <span className="cursor-pointer"><FaGoogle size={'2rem'} color="#E34032" /></span>
                        <span className="cursor-pointer"><FaFacebook size={'2rem'} color="#0C3FBB" /></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;