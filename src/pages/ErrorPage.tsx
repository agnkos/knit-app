import { NavLink } from "react-router-dom";
// import { useRouteError } from "react-router-dom";
import knitLogo from "../img/art-and-design.png";

const ErrorPage = () => {
    // const error = useRouteError();
    const logged = localStorage.getItem('loggedUser')

    return (
        <div className="p-8 h-screen w-screen flex items-center justify-center">
            <div className="flex items-center max-sm:flex-col">
                <img src={knitLogo}
                    alt="Wool icon created by Darius Dan - Flaticon"
                    className='w-60 mb-4 max-sm:w-40'
                />
                <div>
                    <p className="mb-2 text-4xl max-sm:text-3xl max-[400px]:text-xl font-semibold">Ups! The page was not found.</p>
                    {/* <p className="text-xl max-[400px]:text-sm text-right">{(error as Error).message}
                    </p> */}
                    {/* <pre>{(error as { status?: string }).status} - {(error as { statusText?: string }).statusText}</pre> */}
                    <NavLink to={logged ? "/projects" : "/"}>
                        <button
                            className='ml-auto block mt-4 px-3 py-1 bg-teal-200 hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5'
                        >{logged ? "Go to the dashboard" : "Go to login page"}</button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
export default ErrorPage