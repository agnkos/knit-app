import { useState } from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Menu from "../../components/Menu";

const Dashboard = () => {
    const [toggle, setToggle] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setToggle(!toggle);
    }

    const logout = () => {
        console.log('log out')
        signOut(auth);
        navigate('/')
    }

    return (
        <div>
            <Navbar toggleMenu={toggleMenu} />
            <Menu toggle={toggle} />
            <Outlet />
            <h1>Dashboard</h1>
            <p>hello, <span>{auth?.currentUser?.email}</span></p>
            <button onClick={logout}>
                logout
            </button>
        </div>
    )
}
export default Dashboard