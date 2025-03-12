import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { ROUTERS } from '../utils/common/routes'
import Login from '../pages/login/Login'
import Layout from '../components/layout/Layout'
import UnAuthorized from '../pages/unAuthorized/unAuthorized'
import ProtectedRoutes from '../utils/ProtectedRoutes'
import AdminDashboard from '../pages/admin/adminDashboard/AdminDashboard'
import Dashboard from '../pages/dashboard/Dashboard'
import useAuth from '../hooks/useAuth'
import Users from '../pages/admin/users/Users'
import Signup from '../pages/signUp/SignUp'
import Logout from '../pages/logout/Logout'
import AdminProfileManagment from '../pages/admin/adminProfileManagment/AdminProfileManagment'
import UserEdit from '../pages/admin/users/UserEdit'

const AppRouter = () => {
  const { auth } = useAuth()
  const initialRoute = auth?.role === "admin"
    ? ROUTERS.adminDashboard
    : auth?.role === 'user'
      ? ROUTERS.dashboard
      : ROUTERS.logIn;

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to={initialRoute} replace />} />
        <Route path={ROUTERS.logIn} element={<Login />} />
        <Route path={ROUTERS.signUp} element={<Signup />} />
        <Route path={ROUTERS.unAuthorized} element={<UnAuthorized />} />

        <Route element={<ProtectedRoutes allowedRoles={["admin"]} redirectTo={ROUTERS.adminDashboard} />}>
          <Route path={ROUTERS.adminDashboard} element={<AdminDashboard />} />
          <Route path={ROUTERS.adminProfile} element={<AdminProfileManagment />} />
          <Route path={ROUTERS.users} element={<Users />} />
          <Route path={ROUTERS.editUser} element={<UserEdit />} />

          <Route path={ROUTERS.logOut} element={<Logout />} />

        </Route>

        <Route element={<ProtectedRoutes allowedRoles={["user"]} redirectTo={ROUTERS.dashboard} />}>
          <Route path={ROUTERS.dashboard} element={<Dashboard />} />
          <Route path={ROUTERS.logOut} element={<Logout />} />
        </Route>


      </Route>


    </Routes>
  )
}

export default AppRouter