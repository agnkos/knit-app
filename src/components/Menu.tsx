import { useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

type ToggleProps = {
    toggle: boolean,
    closeMenu: () => void;
}

const Menu = ({ toggle, closeMenu }: ToggleProps) => {
    const navigate = useNavigate();
    const ref = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const closeOnClickOutside = (e: MouseEvent) => {
            if (toggle && ref.current && !ref.current.contains(e.target as Element) && !(e.target as Element).classList.contains("burger-btn")) {
                closeMenu();
            }
        }
        document.addEventListener("click", closeOnClickOutside)

        return () => {
            document.removeEventListener("click", closeOnClickOutside)
        }
    }, [toggle])

    const logout = () => {
        localStorage.setItem('loggedUser', "")
        signOut(auth);
        navigate('/')
    }

    return (
        <ul
            className={`fixed right-0 py-6 top-16 max-w-min max-h-min border-t-2 border-zinc-900 bg-zinc-100 z-10  ${toggle ? 'opacity-100 transition duration-500' : 'opacity-0 transition duration-500 hidden'} md:block md:opacity-100 md:static md:mt-16 md`}
            ref={ref}
        >
            <li className="py-4 px-12 font-bold">{auth?.currentUser?.email}</li>
            <li onClick={closeMenu}><NavLink to="projects"
                className={({ isActive }) => isActive ? 'text-teal-700 block py-2 px-12 font-semibold hover:bg-teal-200 cursor-pointer' : 'block py-2 px-12 font-semibold hover:bg-teal-200 cursor-pointer'}
            >Projects</NavLink></li>
            <li onClick={closeMenu}><NavLink to="queue"
                className={({ isActive }) => isActive ? 'text-teal-700 block py-2 px-12 font-semibold hover:bg-teal-200 cursor-pointer' : 'block py-2 px-12 font-semibold hover:bg-teal-200 cursor-pointer'}>Queue</NavLink></li>
            <li onClick={closeMenu}><NavLink to="stash"
                className={({ isActive }) => isActive ? 'text-teal-700 block py-2 px-12 font-semibold hover:bg-teal-200 cursor-pointer' : 'block py-2 px-12 font-semibold hover:bg-teal-200 cursor-pointer'}>Stash</NavLink></li>
            <li onClick={closeMenu}><NavLink to="notes"
                className={({ isActive }) => isActive ? 'text-teal-700 block py-2 px-12 font-semibold hover:bg-teal-200 cursor-pointer' : 'block py-2 px-12 font-semibold hover:bg-teal-200 cursor-pointer'}>Notes</NavLink></li>
            <li className="py-4 px-12">
                <button
                    className='mt-1 px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5'
                    onClick={logout}
                >Logout</button></li>
        </ul>
    )
}
export default Menu