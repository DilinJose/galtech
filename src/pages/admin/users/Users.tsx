import React, { useEffect } from 'react'
import DataTable from '../../../components/dataTable/DataTable'
import Body from '../../../components/layout/body/Body';
import { UserTypes } from '../../../redux/slice/userSlice';
import { ColumnDef } from '@tanstack/react-table';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store/store';
import { deleteUserDetails, getAllUsers } from '../../../redux/action/LoginAction';
import { useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { ROUTERS } from '../../../utils/common/routes';
import { UserType } from '../../../context/AuthProvider';

const Users = () => {
  const { auth } = useAuth()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const users = useSelector((state: RootState) => state.user.userList);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(getAllUsers(auth?.user || {
        id: "",
        username: "",
        email: "",
        mobile: "",
        gender: "",
        profileImage: ""
      } as UserType))
    }
  }, [dispatch])


  const columns = React.useMemo<ColumnDef<UserTypes>[]>(
    () => [
      { accessorKey: 'id', header: 'ID' },
      { accessorKey: 'username', header: 'Username' },
      { accessorKey: 'email', header: 'Email' },
      { accessorKey: 'mobile', header: 'Mobile' },
      { accessorKey: 'gender', header: 'Gender' },
      { accessorKey: 'dob', header: 'Date of Birth' },
      { accessorKey: 'address', header: 'Address' },
      { accessorKey: 'role', header: 'Role' },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              onClick={() => handleEdit(row.original)}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(row.original.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const handleEdit = (user: UserTypes) => {
    navigate(`/edituser/${user.id}`, { state: user });
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await dispatch(deleteUserDetails(id));
      if (response.meta.requestStatus === "fulfilled") {
        alert("User deleted successfully!");
      } else {
        alert("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Body>
      <div className='flex justify-start  items-center mb-5'>
        <button
          type="submit"
          className="w-30 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          onClick={() => navigate(ROUTERS.UserCreate)}
        >
          Create user
        </button>
      </div>
      <DataTable data={users} columns={columns} />
    </Body>
  )
}

export default Users