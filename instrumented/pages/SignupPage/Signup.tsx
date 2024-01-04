import knitLogo from "../../img/art-and-design.png";
import SignupForm from "./SignupForm";

export const Signup = () => {
    return (
        <div className='flex flex-col justify-center items-center h-screen bg-teal-50'>
            <div className='p-8 flex flex-col gap-6 items-center bg-zinc-100 shadow-[3px_3px_0_0] shadow-zinc-800'>
                <h1 className='m-2 text-4xl text-rose-500 font-logo'>Knit.app</h1>
                <img src={knitLogo}
                    alt="Wool icon created by Darius Dan - Flaticon"
                    className='w-40'
                />
                <SignupForm />
            </div>
        </div >

    )
}


