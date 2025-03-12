import React, { useEffect, useState } from "react";
import { ICONS } from "../../../utils/common/icons";
import ProfileSection from "./ProfileSection";
import MenuSection from "./MenuSection";

const SideBar: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(window.innerWidth >= 996);

    useEffect(() => {
        const handleResize = () => {
            setIsSidebarOpen(window.innerWidth >= 996);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
                aria-label="Toggle menu"
            >
                {isSidebarOpen ? <ICONS.Close size={24} /> : <ICONS.Menu size={24} />}
            </button>

            {isSidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-30 bg-transparent bg-opacity-50"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <div
                className={`
                    fixed lg:relative
                    h-screen w-64 lg:w-1/5
                    bg-white border-r border-gray-300
                    transition-transform duration-300 ease-in-out
                    z-40 lg:z-auto
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                `}
            >
                <ProfileSection />

                <div className="h-6/9 border-t-2 border-gray-300 overflow-auto">
                    <MenuSection />
                </div>
            </div>
        </>
    );
};

export default SideBar;
