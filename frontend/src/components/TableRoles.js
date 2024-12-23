import { useEffect, useState,forwardRef, useImperativeHandle } from "react";
import { deleteRole, getRoles } from "../services/apiServices";
import { toast } from "react-toastify";

function TableRoles(props,ref) {

    const [roles, setRoles] = useState([])
    useEffect(() => {
        fetchRoles()
    }, [])

    const fetchRoles = async () => {
        const res = await getRoles()
        if (res && res.errCode === 0) {
            setRoles(res.roles)
        }
    }

    useImperativeHandle(ref,()=>({
        fetchRoles(){
            fetchRoles()
        }
    }))

    const handleClickDelete = async(id)=>{
        const res = await deleteRole(id)
        if(res&&res.errCode===0){
            toast.success(res.message)
            fetchRoles()
        }
        else{
            toast.error(res.message)
        }
        
    }

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            URL
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {roles.length > 0 &&
                        roles.map(role => {
                            return (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {role.id}
                                    </th>
                                    <td className="px-6 py-4">
                                        {role.url}
                                    </td>
                                    <td className="px-6 py-4">
                                        {role?.description}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            className="px-4 py-2 font-medium text-white bg-yellow-600 rounded-md hover:bg-yellow-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"

                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                                            onClick={()=>{handleClickDelete(role.id)}}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>

    );
}

export default forwardRef(TableRoles);