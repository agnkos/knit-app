import { XCircleIcon } from "@heroicons/react/24/outline";
import { doc, collection, setDoc, updateDoc, getDocs } from "firebase/firestore";
import { Form, redirect, useLocation, useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";

export async function action({ request }: any) {
    const formData = await request.formData();
    const name = formData.get('name');
    const notes = formData.get('notes');
    const id = formData.get('id')
    console.log('edit id', id)
    try {
        if (id !== "") {
            console.log('edit id is', id)
            const itemRef = doc(db, "users", `${auth?.currentUser?.uid}`, "queue", id);
            await updateDoc(itemRef, {
                name: name,
                notes: notes
            })
        } else {
            const queueItemRef = doc(collection(db, "users", `${auth?.currentUser?.uid}`, "queue"));
            const q = collection(db, "users", `${auth?.currentUser?.uid}`, "queue");
            const querySnapshot = await getDocs(q);
            const dataArr = querySnapshot.docs.map(doc => ({
                ...doc.data(),
            }));
            // console.log('dataarr length', dataArr.length)
            await setDoc(queueItemRef, {
                queuedItemId: queueItemRef.id,
                name: name,
                notes: notes,
                createdAt: Date.now(),
                position: dataArr.length + 1
            });
        }
        // console.log('added new item to queue')
        // console.log('edit id', id)
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
    const { state } = useLocation();
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
                <p className="text-center font-bold">{state.button === "edit" ? "Edit item" : "Add new project to queue:"}</p>
                <Form action="/queue/add" method="post">
                    <label className="text-sm">Project name</label>
                    <input
                        required
                        type="text"
                        name="name"
                        className='my-1 px-3 py-1 border block'
                        defaultValue={state?.item?.name}
                    />
                    <label className="text-sm">Notes</label>
                    <textarea
                        name="notes"
                        defaultValue={state?.item?.notes}
                        className='mt-1 mb-4 px-3 py-1 h-24 border block resize-none w-full'
                    />
                    <input type="hidden" name="id" value={state?.item?.queuedItemId} />
                    <button
                        className='block ml-auto px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5'
                    >{state.button === "edit" ? "Save changes" : "Add to queue"}</button>
                </Form>
            </div>
        </div>
    )
}
export default QueueModal