import { useRef, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash'
import TableRoles from "./TableRoles";
import { toast } from "react-toastify";
import { createRoles } from "../services/apiServices";

function Roles() {

    const roleDefault = {
        id: uuidv4(),
        url: '',
        description: '',
        isEmpty:false
    }

    const childRef = useRef()

    const [listRoles, setListRoles] = useState([{ ...roleDefault }])

    const handleOnChangeInput = (title, id, value) => {
        const tempListRoles = _.cloneDeep(listRoles)
        const index = tempListRoles.findIndex(item => item.id === id)
        if (index > -1) {
            tempListRoles[index][title] = value
            setListRoles(tempListRoles)
        }
    }

    const checkEmptyInput = ()=>{
        let empty = false

        const tempListRoles = _.cloneDeep(listRoles)
        for(let i=0;i<tempListRoles.length;i++){
            if(tempListRoles[i].url===''){
                tempListRoles[i].isEmpty=true
                empty = true
            }
        }
        setListRoles(tempListRoles)
        return empty
    }

    const handleClickAdd = async() => {
        if(checkEmptyInput()){
            toast.error('Input is not empty')
            return
        }
        const tempListRoles = _.cloneDeep(listRoles)
        const roles = []
        tempListRoles.forEach(item => {
            roles.push({
                url: item.url,
                description: item.description
            })
        })
        console.log('check roles>>>', roles);
        // const res = await createRoles([...roles])
        // console.log('check res>>',res);
        try {
            // Gửi API và xử lý kết quả
            const res = await createRoles(roles);

            if(res&&res.errCode===0){
                toast.success(res.message)
                childRef.current.fetchRoles()
            }
            else{
                toast.error(res.message)
            }
        } catch (error) {
            console.error('API Error:', error);
            toast.error('An error occurred while creating roles');
        }
        
    }

    const handleClickPlus = () => {
        const tempListRoles = _.cloneDeep(listRoles)
        const rolePush = {
            id: uuidv4(),
            url: '',
            description: ''
        }
        tempListRoles.push(rolePush)
        setListRoles(tempListRoles)
    }

    const handleClickMoins = (id) => {
        const tempListRoles = _.cloneDeep(listRoles)
        const filterTemp = tempListRoles.filter(item => item.id !== id)
        setListRoles(filterTemp)
    }

    return (
        <div className="mt-5 px-20">
            <div className="text-2xl font-bold">Add new role...</div>
            <div className="mt-5 flex flex-col justify-center gap-4">
                {listRoles.map((role) => {
                    return (
                        <div className="flex gap-10" key={`${role.id}`}>
                            <div className="w-1/3 flex flex-col">
                                <label>URL:</label>
                                <input
                                    className={`border border-gray-400 p-2 outline-none rounded-md ${role.isEmpty?'border-red-500':''}`}
                                    value={role.url}
                                    onChange={(e) => { handleOnChangeInput('url', role.id, e.target.value) }}
                                />
                            </div>
                            <div className="w-1/3 flex flex-col">
                                <label>Description:</label>
                                <input
                                    className="border border-gray-400 p-2 outline-none rounded-md"
                                    value={role.description}
                                    onChange={(e) => { handleOnChangeInput('description', role.id, e.target.value) }}
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <span
                                    className="mt-4 cursor-pointer"
                                    onClick={() => { handleClickPlus() }}
                                >
                                    <MdAddCircle size={'2rem'} color="#088107" />
                                </span>
                                {listRoles.length > 1 &&
                                    <span
                                        className="mt-4 cursor-pointer"
                                        onClick={() => { handleClickMoins(role.id) }}
                                    >
                                        <IoMdRemoveCircleOutline size={'2rem'} color="#EA3C53" />
                                    </span>
                                }
                            </div>
                        </div>
                    )
                })}
            </div>
            <div>
                <button
                    className="font-semibold text-xl p-3 bg-blue-500 hover:bg-blue-600 text-white mt-5 rounded-lg"
                    onClick={() => { handleClickAdd() }}
                >
                    ADD
                </button>
            </div>

            <div className="mt-5">
                <TableRoles ref={childRef} />
            </div>
        </div>
    );
}

export default Roles;