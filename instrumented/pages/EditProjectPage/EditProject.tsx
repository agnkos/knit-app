import { useLoaderData, Await, useNavigate } from "react-router-dom";
import { useState, Suspense, useContext } from "react";
import { auth, db } from "../../config/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from "../../config/firebase";
import { Project } from "../../types";
import DeleteModal from "../../components/DeleteModal";
import DeleteModalContext from '../../context/DeleteModalContext';
import ProjectForm from "./ProjectForm";

type LoaderData = {
    projectDetail: Project
}

export const EditProject = () => {
    const [imageUpload, setImageUpload] = useState<File | undefined>();
    const { deleteModal, deleteModalDispatch } = useContext(DeleteModalContext);
    const data = useLoaderData() as LoaderData;
    const navigate = useNavigate();

    const uploadImage = async (id: string) => {
        if (!imageUpload) return;
        const projectRef = doc(db, "users", `${auth?.currentUser?.uid}`, "projects", `${id}`)
        const imageFolderRef = ref(storage, `${auth?.currentUser?.uid}/${id}`);
        try {
            await uploadBytes(imageFolderRef, imageUpload)
                .then(snapshot => {
                    getDownloadURL(snapshot.ref).then(url => {
                        console.log(url)
                        updateDoc(projectRef, {
                            imageUrl: url
                        })
                    })
                })
        } catch (err) {
            console.log(err);
        }
        navigate(`/projects/${id}/edit`);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];
        console.log('file added')
        setImageUpload(file);
    }

    const deleteImage = async (id: string) => {
        const imageFolderRef = ref(storage, `${auth?.currentUser?.uid}/${id}`);
        const projectRef = doc(db, "users", `${auth?.currentUser?.uid}`, "projects", `${id}`);
        await deleteObject(imageFolderRef);
        await updateDoc(projectRef, {
            imageUrl: ""
        })
        navigate(`/projects/${id}/edit`);
    }

    const deleteProject = async (id: string, url: string) => {
        const projectRef = doc(db, "users", `${auth?.currentUser?.uid}`, "projects", `${id}`);
        await deleteDoc(projectRef);
        if (url) {
            const imageFolderRef = ref(storage, `${auth?.currentUser?.uid}/${id}`);
            deleteObject(imageFolderRef);
        }
        console.log('project deleted', id)
        deleteModalDispatch({ type: 'HIDE' })
        navigate('/projects');
    }

    const showModal = () => deleteModalDispatch({ type: 'SHOW' })
    const hideModal = () => deleteModalDispatch({ type: 'HIDE' })

    return (
        <div>
            <div className="flex gap-2 items-center">
                <h1 className="text-2xl font-bold">Edit Project</h1>
                <button
                    className='px-2 bg-teal-200 text-md  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5'
                    onClick={() => navigate(-1)}
                >cancel</button>
            </div>
            <Suspense fallback={<h3>loading details...</h3>}>
                <Await resolve={data.projectDetail}>
                    {
                        (project: Project) => (
                            <>
                                <ProjectForm
                                    project={project}
                                    showModal={showModal}
                                    handleChange={handleChange}
                                    uploadImage={uploadImage}
                                    deleteImage={deleteImage}
                                />
                                {deleteModal && <DeleteModal closeModal={hideModal} deleteItem={() => deleteProject(project.projectId, project.imageUrl)} item='yarn' />}
                            </>
                        )
                    }
                </Await>
            </Suspense>
        </div>
    )
}
// export default EditProject