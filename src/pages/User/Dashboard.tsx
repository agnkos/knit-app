import { useState } from 'react';
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Menu from "../../components/Menu";

const Dashboard = () => {
    const [toggle, setToggle] = useState(false);

    const toggleMenu = () => {
        setToggle(!toggle)
    }

    const closeMenu = () => {
        setToggle(false)
    }

    return (
        <div className='min-h-screen flex flex-col '>
            <Navbar toggleMenu={toggleMenu} />
            <div className='flex min-h-screen'>
                <Menu toggle={toggle} closeMenu={closeMenu} />
                <div className='mt-16 p-4 flex flex-col grow'>
                    <button onClick={() => methodDoesNotExist()}>Break the world</button>;
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
export default Dashboard