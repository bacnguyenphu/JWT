import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {register} from '../services/apiServices'

function Register() {

    const navigate = useNavigate()

    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const[confirmPassword,setConfirmPassword] = useState('')
    const[username,setUsername] = useState('')
    const[phone,setPhone] = useState('')

    const handleRegister = async()=>{
        if(password!==confirmPassword){
            toast.error("Password does not match")
            return
        }
        const res = await register(email,password,username,phone)
        if(res.errCode===0){
            toast.success(res.message)
            navigate('/login')
        }
        if(res.errCode!==0){
            toast.error(res.message)
        }        

    }

    return (
        <div className="bg-gradient-to-r from-[#5c7909] to-[#00d4ff] h-screen pt-[100px]">
            <div className="container w-[375px] bg-white rounded-md mx-auto min-h-12 pb-5">
                <div className="text-center font-bold text-3xl py-4">Register</div>
                <div className="px-4 flex flex-col gap-4">
                    <div>
                        <p className="text-xl">Email</p>
                        <input
                            className="w-full text-base p-1 outline-none border-2 border-gray-300 rounded-sm"
                            placeholder="Email"
                            value={email}
                            onChange={(e)=>{setEmail(e.target.value)}}
                        />
                    </div>
                    <div>
                        <p className="text-xl">Password</p>
                        <input
                            className="w-full text-base p-1 outline-none border-2 border-gray-300 rounded-sm"
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e)=>{setPassword(e.target.value)}}
                        />
                    </div>
                    <div>
                        <p className="text-xl">Re-enter Password</p>
                        <input
                            className="w-full text-base p-1 outline-none border-2 border-gray-300 rounded-sm"
                            placeholder="Re-enter Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e)=>{setConfirmPassword(e.target.value)}}
                        />
                    </div>
                    <div>
                        <p className="text-xl">Phonenumber</p>
                        <input
                            className="w-full text-base p-1 outline-none border-2 border-gray-300 rounded-sm"
                            placeholder="Phonenumber"
                            type="text"
                            value={phone}
                            onChange={(e)=>{setPhone(e.target.value)}}
                        />
                    </div>
                    <div>
                        <p className="text-xl">Username</p>
                        <input
                            className="w-full text-base p-1 outline-none border-2 border-gray-300 rounded-sm"
                            placeholder="Username"
                            type="text"
                            value={username}
                            onChange={(e)=>{setUsername(e.target.value)}}
                        />
                    </div>

                </div>
                <div className="px-4 mt-5">
                    <button
                        className="w-full bg-gradient-to-r from-[#5c7909] to-[#00d4ff] rounded-full text-white font-semibold text-xl py-3"
                        onClick={()=>{handleRegister()}}
                    >
                        Register
                    </button>
                </div>

                <div className="px-4 text-sm cursor-pointer mt-3">
                    <p
                        className="underline italic text-blue-600"
                        onClick={() => { navigate('/login') }}
                    >Already've an account!</p>
                </div>

            </div>
        </div>
    );
}

export default Register;