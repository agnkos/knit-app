import { Link } from "react-router-dom";
import NoteForm from "./NoteForm";

export const AddNote = () => {
    return (
        <div>
            <div className="flex gap-2 items-center">
                <h1 className="text-2xl font-bold">New Note</h1>
                <Link to='/notes'>
                    <button
                        className='px-2 bg-teal-200 text-md  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5'
                    >cancel</button>
                </Link>
            </div>
            <NoteForm />
        </div >
    )
}
