import { ROUTERS } from "./common/routes";

export const getInitialRoute = (role: string): string => {
    switch (role.toLowerCase()) {
        case "admin":
            return ROUTERS.adminDashboard;
        case "user":
            return ROUTERS.dashboard;

        default:
            return ROUTERS.logIn; // Fallback in case of an unknown role
    }
};