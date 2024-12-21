import { IoMdClose } from "react-icons/io";
import { createUser, editUser, getGroups, getUserById } from "../../services/apiServices";
import { useEffect, useState } from "react";
import _ from 'lodash'
import { toast } from "react-toastify";

function ModelCRUD({ setShowModal, fetchUsers, isEdit, setIsEdit, idUser }) {

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
            if (!isEdit) {
                setDataUser((dataUser) => { return { ...dataUser, groupId: (res.groups[0].id).toString() } })
                setDataUser((dataUser) => { return { ...dataUser, sex: '1' } })
            }
        }
    }

    const fetchUserId = async () => {
        const res = await getUserById(idUser)
        if (res && res.errCode === 0) {
            const dataUserFetch = {
                email: res.user.email,
                password: '',
                username: res.user.username,
                address: res.user.address,
                phone: res.user.phone,
                sex: res.user.sex,
                groupId: res.user.groupId
            }
            setDataUser({...dataUserFetch,id:idUser})

        }
        else{
            setShowModal(false)
            setIsEdit(false)
        }

    }

    useEffect(() => {
        fetch()
    }, [])

    const fetch = async()=>{
        if (isEdit) {
            await fetchGroups()
            await fetchUserId()
        }
        else {
            fetchGroups()
        }
    }

    const handleClickAdd = async () => {
        const res = await createUser(dataUser)
        
        if (res && res.errCode === 0) {
            toast.success(res.message)
            setShowModal(false)
            await fetchUsers()
        } else {
            toast.error(res.message)
        }

    }

    const handleClickSave = async()=>{
        const res = await editUser(dataUser)
        
        if(res&&res.errCode===0){
            toast.success(res.message)
            setShowModal(false)
            await fetchUsers()
        }
        else{
            toast.error(res.message)
        }
    }

    const handleOnchange = (value, name) => {
        let _dataUser = _.cloneDeep(dataUser)
        _dataUser[name] = value
        setDataUser(_dataUser)
    }

    const handleClose = () => {
        setShowModal(false)
        setIsEdit(false)
    }

    return (
        <div className="fixed top-0 right-0 left-0 bottom-0 bg-black/50 z-20">
            <div className="modal bg-white w-[1000px] min-h-[400px] rounded-lg animate-slide-bottom py-4 overflow-hidden mx-auto">
                <div className="header flex justify-between px-5 pb-5 border-b-2">
                    {isEdit ?
                        <div className="text-2xl font-bold">
                            Edit user
                        </div>
                        :
                        <div className="text-2xl font-bold">
                            Add new user
                        </div>}
                    <div>
                        <span onClick={() => { handleClose() }}><IoMdClose size={'2rem'} /></span>
                    </div>
                </div>

                <form className="pt-5">
                    <div className="px-4 flex flex-col gap-4">
                        <div className="gap-8 flex">
                            <div className="w-1/2">
                                <label htmlFor='email'>Email</label>
                                <input
                                    id="email" name="email" className="border border-gray-400 p-1 w-full rounded"
                                    value={dataUser.email}
                                    onChange={(event) => handleOnchange(event.target.value, 'email')}
                                />
                            </div>

                            <div className="w-1/2">
                                <label htmlFor='username1'>Username</label>
                                <input
                                    id="username1" className="border border-gray-400 p-1 w-full rounded"
                                    value={dataUser.username}
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
                                    value={dataUser.phone}
                                    onChange={(e) => { handleOnchange(e.target.value, 'phone') }}
                                />
                            </div>
                        </div>

                        <div className="gap-8 flex">
                            <div className="w-full">
                                <label htmlFor='address'>Address</label>
                                <input
                                    id="address" name="address" className="border border-gray-400 p-1 w-full rounded"
                                    value={dataUser.address}
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
                                        value={dataUser.sex}
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
                                        value={dataUser.groupId}
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
                            onClick={() => { handleClose() }}
                        >
                            Close
                        </button>
                        {isEdit ?
                            <button
                                type="button"
                                className="px-4 py-2 text-xl font-semibold text-white bg-blue-400 rounded-xl"
                                onClick={() => { handleClickSave() }}
                            >
                                Save
                            </button>
                            :
                            <button
                                type="button"
                                className="px-4 py-2 text-xl font-semibold text-white bg-blue-400 rounded-xl"
                                onClick={() => { handleClickAdd() }}
                            >
                                Add
                            </button>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModelCRUD;