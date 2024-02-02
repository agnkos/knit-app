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

    const throwError = () => {
        throw new Error
    }


    return (
        <div className='min-h-screen flex flex-col '>
            <Navbar toggleMenu={toggleMenu} />
            <div className='flex min-h-screen'>
                <Menu toggle={toggle} closeMenu={closeMenu} />
                <div className='mt-16 p-4 flex flex-col grow'>
                    <Outlet />
                    <button onClick={() => throwError()} className='border border-red-600 p-4 rounded-md'>error</button>
                </div>
            </div>
        </div>
    )
}
export default Dashboard