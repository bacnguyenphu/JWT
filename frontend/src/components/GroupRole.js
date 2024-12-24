import { useEffect, useState } from "react";
import { assignRoleToGroup, getGroups, getRolebyIdGroup, getRoles } from "../services/apiServices";
import _ from 'lodash'
import { toast } from "react-toastify";

function GroupRole() {

    const [groups, setGroups] = useState([])
    const [roles, setRoles] = useState([])
    const [idGroupSelected,setIdGroupSelected] = useState()

    const fetchGroups = async () => {
        const res = await getGroups()
        if (res && res.errCode === 0) {
            setGroups(res.groups)
        }
    }

    const fetchRoles = async () => {
        const res = await getRoles()
        if (res && res.errCode === 0) {
            setRoles(res.roles)
        }

        return res.roles
    }

    useEffect(() => {
        fetchGroups()
    }, [])

    const handleOnChangeSelectGroup = async (e) => {
        const tempRoles = await fetchRoles()
        // console.log('check roles>>>', roles);
        const res = await getRolebyIdGroup(+e.target.value)
        if (res && res.errCode === 0) {
            // console.log('check res>>>', res.group.roles);
            const groupRole = res.group.roles
            const checkRoleSelect = tempRoles.map(role => {
                let check = groupRole.some(item => item.url === role.url)

                return {
                    ...role,
                    isSelected: check
                }
            })
            setRoles(checkRoleSelect)
        }
        setIdGroupSelected(+e.target.value)
    }

    const handleClickOnchangeOption = (id) => {
        const index = roles.findIndex(role => role.id === id)
        if (index > -1) {
            let tempRoles = _.cloneDeep(roles)
            tempRoles[index].isSelected = !tempRoles[index].isSelected
            setRoles(tempRoles)
        }
    }

    const handleClickSave = async ()=>{
        const payload = {
            idGroup:idGroupSelected,
            roles:[]
        }

        const temp =[]
        roles.forEach(role=>{
            if(role.isSelected){
                temp.push({
                    groupId:idGroupSelected,
                    roleId:role.id
                })
            }
        })
        payload.roles = temp

        const res = await assignRoleToGroup(payload)
        if(res&&res.errCode===0){
            toast.success(res.message)
        }
        
    }

    return (
        <div className="mt-5 px-20">
            <div className="text-2xl font-bold">
                Group Role:
            </div>
            <div className="flex flex-col">
                <label>Select group:</label>
                <select
                    className="border border-gray-400 p-2 outline-none rounded-md w-1/2"
                    onChange={(e) => { handleOnChangeSelectGroup(e) }}
                >
                    <option>Choose group...</option>
                    {groups.length > 0 &&
                        groups.map(group => {
                            return (
                                <option key={`keyGroup-${group.id}`} value={group.id}>
                                    {group.name}
                                </option>
                            )
                        })
                    }
                </select>
            </div>
            <hr className="my-5 border-2" />
            <div className="text-2xl font-bold">
                Assign Role:
            </div>

            {roles.length > 0 &&
                roles.map(role => {
                    return (
                        <div className="flex flex-col gap-1" key={`key-role-${role.id}`}>
                            <div className="flex items-center gap-1">
                                <input className="mt-[3px]" type="checkbox" id={`key-role-${role.id}`} name="vehicle1" value={role.id} checked={role.isSelected}
                                    onChange={() => { handleClickOnchangeOption(+role.id) }}
                                />
                                <label htmlFor={`key-role-${role.id}`} className="cursor-pointer">{role.url}</label>
                            </div>
                        </div>
                    )
                })
            }

            <div>
                <button
                    className=" mt-5 px-4 py-2 font-medium text-white bg-yellow-600 rounded-md hover:bg-yellow-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                    onClick={()=>{handleClickSave()}}
                >
                    Save
                </button>
            </div>
        </div>
    );
}

export default GroupRole;