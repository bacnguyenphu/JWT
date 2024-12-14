import { IoMdClose } from "react-icons/io";
import { createUser, getGroups } from "../../services/apiServices";
import { useEffect, useState } from "react";
import _ from 'lodash'
import { toast } from "react-toastify";

function ModelCRUD({ setShowModal,fetchUsers }) {

    const dataUserDefault = {
        email: '',
        password: '',
        username: '',
        address: '',
        phone: '',
        sex: '',
        groupId: ''
    }

    const [groups, setGroups] = useState([])

    const [dataUser, setDataUser] = useState(dataUserDefault)

    const fetchGroups = async () => {
        const res = await getGroups()
        if (res && res.errCode === 0) {
            setGroups(res.groups)
            setDataUser((dataUser) => { return { ...dataUser, groupId: (res.groups[0].id).toString() } })
            setDataUser((dataUser) => { return { ...dataUser, sex: '1' } })
        }
    }

    useEffect(() => {
        fetchGroups()
    }, [])

    const handleClickAdd = async() => {       
        const res = await createUser(dataUser)
        if(res&&res.errCode===0){
            toast.success(res.message)
            setShowModal(false)
            await fetchUsers()
        }else{
            toast.error(res.message)
        }
        
    }

    const handleOnchange = (value, name) => {
        const _dataUser = dataUser
        _dataUser[name] = value
        setDataUser(_dataUser)
    }

    return (
        <div className="fixed top-0 right-0 left-0 bottom-0 bg-black/50 z-20">
            <div className="modal bg-white w-[1000px] min-h-[400px] rounded-lg animate-slide-bottom py-4 overflow-hidden mx-auto">
                <div className="header flex justify-between px-5 pb-5 border-b-2">
                    <div className="text-2xl font-bold">
                        Add new user
                    </div>
                    <div>
                        <span onClick={() => { setShowModal(false) }}><IoMdClose size={'2rem'} /></span>
                    </div>
                </div>

                <form className="pt-5">
                    <div className="px-4 flex flex-col gap-4">
                        <div className="gap-8 flex">
                            <div className="w-1/2">
                                <label htmlFor='email'>Email</label>
                                <input
                                    id="email" name="email" className="border border-gray-400 p-1 w-full rounded"
                                    onChange={(e) => { handleOnchange(e.target.value, 'email') }}
                                />
                            </div>

                            <div className="w-1/2">
                                <label htmlFor='username1'>Username</label>
                                <input
                                    id="username1" className="border border-gray-400 p-1 w-full rounded"
                                    onChange={(e) => { handleOnchange(e.target.value, 'username') }}
                                />
                            </div>
                        </div>

                        <div className="gap-8 flex ">
                            <div className="w-1/2">
                                <label htmlFor='password'>Password</label>
                                <input
                                    className="border border-gray-400 rounded p-1 w-full" type="password"
                                    onChange={(e) => { handleOnchange(e.target.value, 'password') }}
                                />
                            </div>

                            <div className="w-1/2">
                                <label htmlFor='phonenumber'>Phone number</label>
                                <input
                                    className="border border-gray-400 rounded p-1 w-full" type="text"
                                    onChange={(e) => { handleOnchange(e.target.value, 'phone') }}
                                />
                            </div>
                        </div>

                        <div className="gap-8 flex">
                            <div className="w-full">
                                <label htmlFor='address'>Address</label>
                                <input
                                    id="address" name="address" className="border border-gray-400 p-1 w-full rounded"
                                    onChange={(e) => { handleOnchange(e.target.value, 'address') }}
                                />
                            </div>
                        </div>

                        <div className="gap-8 flex">
                            <div className="w-1/2">
                                <div className="flex flex-col">
                                    <label htmlFor="gender">Gender</label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        className=" p-1 border border-gray-400 rounded"
                                        onChange={(e) => { handleOnchange(e.target.value, 'sex') }}
                                    >
                                        <option value="1">Male</option>
                                        <option value="2">Female</option>
                                        <option value="0">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="w-1/2">
                                <div className="flex flex-col">
                                    <label htmlFor="group">Group</label>
                                    <select
                                        id="group"
                                        name="group"
                                        className="p-1 border border-gray-400 rounded"
                                        onChange={(e) => { handleOnchange(e.target.value, 'groupId') }}
                                    >
                                        {groups.length > 0 &&
                                            groups.map((group) => {
                                                return (
                                                    <option key={`group-${group.id}`} value={`${group.id}`}>{group.name}</option>
                                                )
                                            })}
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="footer flex items-center justify-end mt-4 px-5 gap-5">
                        <button
                            type="button"
                            className="px-4 py-2 text-xl font-semibold text-white bg-slate-500 rounded-xl"
                            onClick={() => { setShowModal(false) }}
                        >
                            Close</button>
                        <button
                            type="button"
                            className="px-4 py-2 text-xl font-semibold text-white bg-blue-400 rounded-xl"
                            onClick={() => { handleClickAdd() }}
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModelCRUD;