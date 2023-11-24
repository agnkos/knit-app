import { defer, useLoaderData, Await, Form, redirect, Link } from "react-router-dom";
import { Suspense } from "react";
import { auth, db } from "../../config/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { getNoteDetail } from "../../config/firebase";
import { Note } from "../../types";
import { TrashIcon, CheckIcon, ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

export function loader({ params }: any) {
    return defer({ noteDetail: getNoteDetail(params.id) })
}

type LoaderData = {
    noteDetail: Note
}

export async function action({ params, request }: any): Promise<Response | { error: any }> {
    const formData = await request.formData();
    const title = formData.get('title');
    const content = formData.get('content');
    const date = new Date();

    try {
        const noteRef = doc(db, "users", `${auth?.currentUser?.uid}`, "notes", `${params.id}`);
        await updateDoc(noteRef, {
            noteId: noteRef.id,
            title: title,
            content: content,
            date: date.toLocaleDateString()
        })
        return redirect(`/notes/${noteRef.id}`)
    } catch (err: any) {
        return {
            error: err.message
        }
    }
}

const NoteDetail = () => {
    const loaderData = useLoaderData() as LoaderData;

    return (
        <div>
            <Link to="/notes" className="flex gap-2 items-center mb-4">
                <ArrowLeftCircleIcon className="w-5 h-5" />
                <p className="border-b border-white hover:border-b hover:border-zinc-950">Back to notes</p>
            </Link>
            <Suspense fallback={<h3>Loading...</h3>}>
                <Await resolve={loaderData.noteDetail}>
                    {(note: Note) => (
                        <Form action={`/notes/${note.noteId}`} method="post">
                            <div key={note.noteId} className='flex flex-col gap-1 mb-4 pb-4'>
                                <div className='flex justify-between'>
                                    <input
                                        type="text"
                                        name="title"
                                        className='font-bold text-xl'
                                        defaultValue={note.title} />
                                    <div className='flex gap-2 items-center'>
                                        <button className="block">
                                            <CheckIcon className='w-5 h-5 cursor-pointer hover:text-teal-600 transition-colors duration-300' />
                                        </button>
                                        <TrashIcon className='w-5 h-5 cursor-pointer hover:text-teal-600 transition-colors duration-300' />
                                    </div>
                                </div>
                                <p className='text-sm'>{note.date?.toString()}</p>
                                <textarea
                                    required
                                    name="content"
                                    className='mt-1 mb-4 py-1 block resize-none w-full h-32'
                                    defaultValue={note.content}
                                />
                            </div>
                        </Form>
                    )}
                </Await>
            </Suspense>
        </div>
    )
}
export default NoteDetail