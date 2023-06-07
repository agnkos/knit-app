import { deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { QueuedItemType } from "../types";
import { TrashIcon, PencilIcon, ArrowDownCircleIcon, ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

type QueuedItemProps = {
    item: QueuedItemType,
    index: number
}

const QueuedItem = ({ item, index }: QueuedItemProps) => {

    const navigate = useNavigate();

    const deleteQueuedItem = (id: string) => {
        const itemRef = doc(db, "users", `${auth?.currentUser?.uid}`, "queue", `${id}`);
        deleteDoc(itemRef);
        console.log('item deleted', id)
        navigate('/queue');
    }

    return (
        <div className="mb-4 flex gap-4 items-start" >
            <div className="flex gap-1">
                {/* <ArrowUpCircleIcon className="w-6 h-6" /> */}
                <p className="px-2 border">{index + 1}</p>
                {/* <ArrowDownCircleIcon className="w-6 h-6" /> */}
            </div>
            <div className="w-full">
                <div className="flex items-center">
                    <p className="font-bold">{item.name}</p>
                    <Link to="add" className="ml-auto" state={{ button: "edit", item: item }}>
                        <PencilIcon
                            className="w-4 h-4 cursor-pointer" />
                    </Link>
                    <TrashIcon
                        onClick={() => deleteQueuedItem(item.queuedItemId)}
                        className="w-4 h-4 mx-4 cursor-pointer" />
                </div>
                <p>{item.notes}</p>
            </div>
        </div>
    )
}
export default QueuedItem