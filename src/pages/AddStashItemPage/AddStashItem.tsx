import { Link } from "react-router-dom";
import StashForm from "./StashForm";

export const AddStashItem = () => {
    return (
        <div>
            <div className="flex gap-2 items-center">
                <h1 className="text-2xl font-bold">New Project</h1>
                <Link to='/stash'>
                    <button
                        className='px-2 bg-teal-200 text-md  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5'
                    >cancel</button>
                </Link>
            </div>
            <StashForm />
        </div>
    )
}
