import { useState } from 'react';
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Menu from "../../components/Menu";

const Dashboard = () => {
    const [toggle, setToggle] = useState(false);

    const toggleMenu = () => {
        setToggle(!toggle)
        // if (toggle) return;
        // setToggle(true);
    }

    const closeMenu = () => {
        setToggle(false)
    }

    return (
        <div className='min-h-screen flex flex-col '>
            <Navbar toggleMenu={toggleMenu} />
            <Menu toggle={toggle} closeMenu={closeMenu} />
            <div className='p-4 flex flex-col grow'>
                <Outlet />
            </div>
        </div>
    )
}
export default Dashboard