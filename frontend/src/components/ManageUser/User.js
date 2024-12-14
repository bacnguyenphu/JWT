import { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../../services/apiServices";
import ReactPaginate from 'react-paginate';
import ModelCRUD from "./ModalCRUD";
import { toast } from "react-toastify";

function User() {

    const [listUsers, setListUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [limit, setLimit] = useState(8)
    const [totalPages, setTotalPages] = useState(1)

    const[showModal,setShowModal] = useState(false)

    useEffect(() => {
        fetchUsers()
    }, [currentPage])

    const fetchUsers = async () => {
        const res = await getUsers(currentPage, limit)
        if (res.errCode === 0) {
            setListUsers(res.data.users)
            setTotalPages(res.data.totalPages)
        }
    }

    const handleClickDelete = async (id) => {
        const res = await deleteUser(+id)
        if (res.errCode === 0) {
            toast.success(res.message)
            await fetchUsers()
            if (listUsers.length === 1 && currentPage > 1) {
                setCurrentPage(currentPage - 1)
            }
        }

    }

    const handlePageClick = (event) => {
        // const newOffset = (event.selected * itemsPerPage) % items.length;
        // console.log(
        //     `User requested page number ${event.selected}, which is offset ${newOffset}`
        // );
        // setItemOffset(newOffset);
        setCurrentPage(event.selected + 1)
    }

    return (
        <div className="px-4">
            <div>
                <button
                    onClick={()=>{setShowModal(true)}}
                    className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                >
                    Create a new user
                </button>
            </div>
            <div className="mt-4">
                <table className="min-w-full divide-y divide-gray-200 border">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GroupId</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {listUsers && listUsers.length > 0 &&
                            listUsers.map((user) => {
                                return (
                                    <tr key={user.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{user.groupId}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                className="px-4 py-2 font-medium text-white bg-yellow-600 rounded-md hover:bg-yellow-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                                                onClick={() => { handleClickDelete(user.id) }}
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

                <ReactPaginate
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    pageCount={totalPages}
                    nextLabel="next >"
                    previousLabel="< prev"
                    previousLinkClassName="block px-3 py-2 border border-gray-300 rounded hover:bg-blue-500"
                    nextLinkClassName="block px-3 py-2 border border-gray-300 rounded hover:bg-blue-500"
                    breakLabel="..."
                    pageClassName="mx-1"
                    pageLinkClassName="block px-3 py-2 overflow-hidden border border-gray-300 rounded hover:bg-blue-500"
                    previousClassName="mx-1"
                    nextClassName="mx-1"
                    breakClassName="mx-1"
                    breakLinkClassName="block px-3 py-2 border border-gray-300 rounded hover:bg-blue-500"
                    containerClassName=" flex flex-wrap justify-center mt-4 items-center"
                    activeClassName="bg-blue-500 overflow-hidden text-white"
                    renderOnZeroPageCount={null}
                />
            </div>
            {showModal&&<ModelCRUD setShowModal={setShowModal} fetchUsers={fetchUsers}/>}

        </div>

    );
}

export default User;