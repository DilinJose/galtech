import React, { useEffect } from 'react'
import DataTable from '../../../components/dataTable/DataTable'
import Body from '../../../components/layout/body/Body';
import { UserTypes } from '../../../redux/slice/userSlice';
import { ColumnDef } from '@tanstack/react-table';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store/store';
import { deleteUserDetails, getAllUsers } from '../../../redux/action/LoginAction';
import { useNavigate } from 'react-router';

const Users = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const users = useSelector((state: RootState) => state.user.userList);

  useEffect(() => {
    if (users.length === 0) {
        dispatch(getAllUsers());
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
      <DataTable data={users} columns={columns} />
    </Body>
  )
}

export default Users