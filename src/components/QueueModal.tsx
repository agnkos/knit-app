import { XCircleIcon } from "@heroicons/react/24/outline";
import { doc, collection, setDoc } from "firebase/firestore";
import { Form, redirect, useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";

export async function action({ request }: any) {
    const formData = await request.formData();
    const name = formData.get('name');
    const notes = formData.get('notes');

    try {
        const queueItemRef = doc(collection(db, "users", `${auth?.currentUser?.uid}`, "queue"));
        await setDoc(queueItemRef, {
            queuedItemId: queueItemRef.id,
            name: name,
            notes: notes
        });
        console.log('added new item to queue')
        return redirect('/queue');
    } catch (err: any) {
        return { error: err.message };
    }
}

// type QueueModalProps = {
//     closeQueueModal: () => void;
// }

const QueueModal = () => {
    const navigate = useNavigate();

    const closeQueueModal = () => navigate(-1);

    return (
        <div
            className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-slate-400/75">
            <div className="max-w-sm p-6 flex flex-col gap-4 bg-slate-100 shadow-[3px_3px_0_0] shadow-zinc-800 z-50">
                <div>
                    <XCircleIcon
                        onClick={closeQueueModal}
                        className="w-6 h-6 ml-auto cursor-pointer " />
                </div>
                <p className="text-center font-bold">Add new project to queue:</p>
                <Form action="/queue/add" method="post">
                    <label className="text-sm">Project name</label>
                    <input
                        required
                        type="text"
                        name="name"
                        className='my-1 px-3 py-1 border block'
                    />
                    <label className="text-sm">Notes</label>
                    <textarea
                        name="notes"
                        className='mt-1 mb-4 px-3 py-1 h-24 border block resize-none w-full'
                    />
                    <button
                        className='block ml-auto px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5'
                    >Add to queue</button>
                </Form>
            </div>
        </div>
    )
}
export default QueueModal