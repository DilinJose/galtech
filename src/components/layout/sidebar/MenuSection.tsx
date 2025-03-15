import { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa';
import { getMenuForRole, MenuItem } from '../../../utils/SideBarMenues';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router';

const MenuSection = () => {
    const { auth } = useAuth()
    const navigate = useNavigate();
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

    const isActiveRoute = (path: string) => location.pathname.startsWith(path);

    const handleMenuClick = (path: string) => {
        navigate(path);
    };
    const handleSectionClick = (title: string, path?: string, items?: MenuItem[]) => {
        if (items && items.length > 0) {
            setExpandedSections(prev => ({ ...prev, [title]: !prev[title] }));
        } else if (path) {
            handleMenuClick(path);
        }
    };
    return (
        <div className="flex p-10 flex-col justify-between h-full gap-4 py-4 ">
            <div className='flex flex-col justify-between gap-4' >
                <div className="">
                    {getMenuForRole(auth?.role ?? "").map(({ title, path, items }) => (
                        <div key={title} className="mb-2">
                            <div
                                className="cursor-pointer font-medium flex justify-start gap-3 items-center py-2"
                                onClick={() => handleSectionClick(title, path, items)}
                            >
                                {title}
                                {items.length > 0 && (
                                    <span
                                        className={`transition-transform duration-500 ${expandedSections[title] ? 'rotate-180' : 'rotate-0'}`}
                                    >
                                        <FaChevronDown />
                                    </span>
                                )}
                            </div>
                            {expandedSections[title] && items.length > 0 && (
                                <ul className="pl-4">
                                    {items.map(({ id, label, path }) => (
                                        <li
                                            key={id}
                                            className={`cursor-pointer transition-all duration-200 hover:text-primary py-1 ${isActiveRoute(path) ? 'text-primary' : ''
                                                }`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleMenuClick(path);
                                            }}
                                        >
                                            {label}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MenuSection