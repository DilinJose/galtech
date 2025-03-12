import React from "react";
import { useLocation, Navigate, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";

type ProtectedRoutesProps = {
    allowedRoles: string[];
    redirectTo?: string; // Add a redirect path for the initial component
};

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ allowedRoles, redirectTo }) => {
    const { auth } = useAuth();
    const location = useLocation();

    if (!auth || !auth.user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!allowedRoles.map(roles => roles.toLowerCase()).includes(auth.role.toLowerCase())) {
        return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }

    // If redirectTo is provided, navigate to the correct dashboard
    if (redirectTo && location.pathname === "/") {
        return <Navigate to={redirectTo} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;
