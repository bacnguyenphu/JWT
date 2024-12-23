import { NavLink, useNavigate } from "react-router-dom";
import { HOME, USERS, ROLES, GROUPROLE } from "../utils/paths";
import { useSelector,useDispatch } from "react-redux";
import { FiLogOut } from "react-icons/fi";
import { loginRedux } from "../redux/userLoginSlice";
import { logout } from "../services/apiServices";
import { toast } from "react-toastify";

function Header() {
    const navs = [
        {
            name: 'Home',
            path: HOME
        },
        {
            name: 'Users',
            path: USERS
        },
        {
            name: 'Roles',
            path: ROLES
        },
        {
            name: 'Group-Role',
            path: GROUPROLE
        },
        
    ]

    const userLogin = useSelector(state => state.loginUser)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let payload = {
        username: '',
        email: '',
        phone: '',
        sex: '',
        address: '',
        groupId: '',
        id: '',
        isAuthenticated: false
    }

    const handleLogOut = async()=>{
        const res = await logout()
        if(res.errCode===0){
            toast.success('Log out succsess')
            navigate('/login')
        }
        dispatch(loginRedux(payload))
    }

    return (
        <div className="h-[80px] bg-[#1E232D] px-20 flex justify-between">
            <div className="flex items-center gap-5 h-full">
                {navs.map((nav, index) => {
                    return (
                        <div className="text-white text-xl font-semibold hover:text-blue-500" key={index}>
                            <NavLink
                                to={nav.path}
                                className={({ isActive }) => {
                                    return isActive ? 'text-blue-500' : ''
                                }}
                            >
                                {nav.name}
                            </NavLink>
                        </div>
                    )
                })}
            </div>

            <div className="flex items-center">
                {userLogin.isAuthenticated ?
                    <div className="flex gap-6">
                        <span className="text-white font-semibold">Welcome {userLogin.username} !</span>
                        <span 
                        className="cursor-pointer"
                        onClick={()=>{handleLogOut()}}
                        >
                            <FiLogOut color="white" size={'1.5rem'}/>
                            </span>
                    </div>
                    :
                    <button
                        className="bg-blue-400 text-white p-2 font-bold rounded-xl"
                        onClick={() => { navigate('/login') }}
                    >
                        Log in
                    </button>}
            </div>
        </div>
    );
}

export default Header;