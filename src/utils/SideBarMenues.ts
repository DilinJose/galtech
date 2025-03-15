import { ROUTERS } from "./common/routes";

export interface MenuItem {
    id: number;
    label: string;
    path: string;
}

interface MenuSection {
    title: string;
    path?: string;
    items: MenuItem[];
}

export const userMenuSections: MenuSection[] = [
    { title: 'Dashboard', path: ROUTERS.dashboard, items: [] },
    { title: 'Profile managment', path: ROUTERS.profileManagement, items: [] },
    { title: 'Change Password', path: ROUTERS.changePassword, items: [] },
    { title: 'Logout', path: ROUTERS.logOutUser, items: [] },
];


export const adminMenuSections: MenuSection[] = [
    { title: 'Dashboard', path: ROUTERS.adminDashboard, items: [] },
    { title: 'Profile managment', path: ROUTERS.adminProfile, items: [] },
    { title: 'Users', path: ROUTERS.users, items: [] },
    { title: 'Change Password', path: ROUTERS.changePswd, items: [] },
    { title: 'Logout', path: ROUTERS.logOut, items: [] },
];



export const getMenuForRole = (role: string): MenuSection[] => {
    switch (role.toLowerCase()) {
        case 'admin':
            return adminMenuSections;
        case 'user':
            return userMenuSections
        default:
            return [];
    }
};