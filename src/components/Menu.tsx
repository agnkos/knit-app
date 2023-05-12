import { auth } from "../config/firebase";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

type Toggle = {
    toggle: boolean,
}

const Menu = ({ toggle }: Toggle) => {

    const navigate = useNavigate();

    const logout = () => {
        console.log('log out')
        signOut(auth);
        navigate('/')
    }

    return (
        <ul className={`absolute right-0 py-6 max-w-min max-h-min bg-zinc-100 ${toggle ? 'translate-x-full transition duration-1000' : 'transition duration-1000'}`}>
            <li className="py-4 px-12 font-bold">{auth?.currentUser?.email}</li>
            <li ><NavLink to="projects"
                className="block py-2 px-12 font-semibold hover:bg-teal-200 cursor-pointer"
            >Projects</NavLink></li>
            <li ><NavLink to="queue"
                className="block py-2 px-12 font-semibold hover:bg-teal-200 cursor-pointer">Queue</NavLink></li>
            <li ><NavLink to="stash"
                className="block py-2 px-12 font-semibold hover:bg-teal-200 cursor-pointer">Stash</NavLink></li>
            <li ><NavLink to="notes"
                className="block py-2 px-12 font-semibold hover:bg-teal-200 cursor-pointer">Notes</NavLink></li>
            <li className="py-4 px-12">
                <button
                    className='mt-1 px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5'
                    onClick={logout}
                >Logout</button></li>
        </ul>
    )
}
export default Menu