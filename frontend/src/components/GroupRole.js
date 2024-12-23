import { useEffect, useState } from "react";
import { getGroups, getRolebyIdGroup, getRoles } from "../services/apiServices";

function GroupRole() {

    const [groups, setGroups] = useState([])
    const [roles, setRoles] = useState([])
    const [listRolesSelected, setListRolesSelected] = useState([])

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
    }

    const handleClickOnchangeOption = ()=>{
        console.log('check roles>>>', roles);
        
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
                                <option key={`keyGroup-${group.id}`} value={group.id}
                                    onClick={()=>{handleClickOnchangeOption()}}
                                >
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
                                <input className="mt-[3px]" type="checkbox" id="vehicle1" name="vehicle1" value={role.id} checked={role.isSelected} />
                                <label htmlFor="vehicle1" className="cursor-pointer">{role.url}</label>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default GroupRole;