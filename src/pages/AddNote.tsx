import { redirect, Form, Link } from "react-router-dom";
import { doc, collection, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";

export async function action({ request }: any): Promise<Response | {
    error: any;
}> {
    const formData = await request.formData();
    const title = formData.get('title');
    const content = formData.get('content');
    const date = new Date();

    try {
        const noteRef = doc(collection(db, "users", `${auth?.currentUser?.uid}`, "notes"))
        await setDoc(noteRef, {
            noteId: noteRef.id,
            title: title,
            content: content,
            date: date.toLocaleDateString()
        })
        return redirect('/notes')
    } catch (err: any) {
        return {
            error: err.message
        }
    }
}

const AddNote = () => {
    return (
        <div>
            <div className="flex gap-2 items-center">
                <h1 className="text-2xl font-bold">New Note</h1>
                <Link to='/projects'>
                    <button
                        className='px-2 bg-teal-200 text-md  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5'
                    >cancel</button>
                </Link>
            </div>
            <Form action="/addnote" method="post" className="w-full sm:w-8/12">
                <div className="my-2">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        className='my-1 px-3 py-1 border block w-full'
                    />
                </div>
                <div className="my-2">
                    <label>Content</label>
                    <textarea
                        required
                        name="content"
                        className='mt-1 mb-4 px-3 py-1 border block resize-none w-full h-32'
                    />
                </div>
                <button
                    className='mt-1 px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5'
                >Create note</button>
            </Form></div >
    )
}
export default AddNote