import { NavLink } from "react-router-dom";
import { auth } from '../config/firebase';
import { forwardRef } from 'react';

type MenuListProps = {
    toggle: boolean;
    closeMenu: () => void;
    logout: () => void;
}

export type Ref = HTMLUListElement

const MenuList = forwardRef<Ref, MenuListProps>((props, ref) => {

    const { toggle, closeMenu, logout } = props

    return (
        <ul
            className={`fixed right-0 py-6 top-16 max-w-min max-h-min border-t-2 border-zinc-900 bg-zinc-100 z-10  ${toggle
                ? 'opacity-100 transition duration-500'
                : 'opacity-0 transition duration-500 hidden'
                } md:block md:opacity-100 md:static md:mt-16 md`}
            ref={ref}
        >
            <li className='py-4 px-12 font-bold'>{auth?.currentUser?.email}</li>
            <li onClick={closeMenu}>
                <NavLink
                    to='projects'
                    className={({ isActive }) =>
                        isActive
                            ? 'text-teal-700 block py-2 px-12 font-semibold hover:bg-teal-200 cursor-pointer'
                            : 'block py-2 px-12 font-semibold hover:bg-teal-200 cursor-pointer'
                    }
                >
                    Projects
                </NavLink>
            </li>
            <li onClick={closeMenu}>
                <NavLink
                    to='queue'
                    className={({ isActive }) =>
                        isActive
                            ? 'text-teal-700 block py-2 px-12 font-semibold hover:bg-teal-200 cursor-pointer'
                            : 'block py-2 px-12 font-semibold hover:bg-teal-200 cursor-pointer'
                    }
                >
                    Queue
                </NavLink>
            </li>
            <li onClick={closeMenu}>
                <NavLink
                    to='stash'
                    className={({ isActive }) =>
                        isActive
                            ? 'text-teal-700 block py-2 px-12 font-semibold hover:bg-teal-200 cursor-pointer'
                            : 'block py-2 px-12 font-semibold hover:bg-teal-200 cursor-pointer'
                    }
                >
                    Stash
                </NavLink>
            </li>
            <li onClick={closeMenu}>
                <NavLink
                    to='notes'
                    className={({ isActive }) =>
                        isActive
                            ? 'text-teal-700 block py-2 px-12 font-semibold hover:bg-teal-200 cursor-pointer'
                            : 'block py-2 px-12 font-semibold hover:bg-teal-200 cursor-pointer'
                    }
                >
                    Notes
                </NavLink>
            </li>
            <li className='py-4 px-12'>
                <button
                    className='mt-1 px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5'
                    onClick={logout}
                >
                    Logout
                </button>
            </li>
        </ul>
    )
})

MenuList.displayName = "MenuList"

export default MenuList