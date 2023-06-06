import { XCircleIcon } from "@heroicons/react/24/outline";


type DeleteModalProps = {
    closeModal: () => void,
    deleteProject: () => void
}

const DeleteModal = ({ closeModal, deleteProject }: DeleteModalProps) => {
    return (
        <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-slate-400/75">
            <div className="max-w-xs p-6 flex flex-col gap-4 bg-slate-100 shadow-[3px_3px_0_0] shadow-zinc-800 z-50">
                <div
                    onClick={closeModal}><XCircleIcon className="w-6 h-6 ml-auto cursor-pointer " /></div>
                <p className="text-center">Are you sure you want to delete this project?</p>
                <div className="flex justify-between">
                    <button
                        onClick={deleteProject}
                        className='block px-3 py-1 bg-red-400  hover:bg-red-600 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5'
                    >Delete</button>
                    <button
                        onClick={closeModal}
                        className='block px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5'
                    >Cancel</button>
                </div>
            </div>
        </div>
    )
}
export default DeleteModal