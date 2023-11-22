import { Form, useLoaderData, Await, redirect, useNavigate, Link } from "react-router-dom";
import { useState, Suspense } from "react";
import { auth, db } from "../config/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from "../config/firebase";
import imgPlaceholder from '../img/knit-black.png';
import { Project } from "../types";
import DeleteModal from "../components/DeleteModal";

export async function action({ params, request }: any) {
    const formData = await request.formData();
    const name = formData.get('name');
    const pattern = formData.get('pattern');
    const size = formData.get('size');
    const yarn = formData.get('yarn');
    const needles = formData.get('needles');
    const notes = formData.get('notes');
    console.log('params project', params.id)

    try {
        const projectRef = doc(db, "users", `${auth?.currentUser?.uid}`, "projects", `${params.id}`)
        await updateDoc(projectRef, {
            projectId: projectRef.id,
            name: name,
            pattern: pattern,
            size: size,
            yarn: yarn,
            needles: needles,
            notes: notes
        })
        console.log('refresh: file added')

        return redirect(`/projects/${projectRef.id}`)

    } catch (err: any) {
        return {
            error: err.message
        }
    }
}

type LoaderData = {
    projectDetail: Project
}

const EditProject = () => {
    const [imageUpload, setImageUpload] = useState<File | undefined>();
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
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
                        // setImageUrl(url)
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

    const deleteImage = (id: string) => {
        const imageFolderRef = ref(storage, `${auth?.currentUser?.uid}/${id}`);
        const projectRef = doc(db, "users", `${auth?.currentUser?.uid}`, "projects", `${id}`);
        deleteObject(imageFolderRef);
        updateDoc(projectRef, {
            imageUrl: ""
        })
        navigate(`/projects/${id}/edit`);
    }

    const showModal = () => {
        setShowDeleteModal(true);
        console.log('delete project?', data.projectDetail.projectId)
    }

    const closeModal = () => {
        setShowDeleteModal(false);
    }

    const deleteProject = (id: string, url: string) => {
        const projectRef = doc(db, "users", `${auth?.currentUser?.uid}`, "projects", `${id}`);
        deleteDoc(projectRef);
        if (url) {
            const imageFolderRef = ref(storage, `${auth?.currentUser?.uid}/${id}`);
            deleteObject(imageFolderRef);
        }
        console.log('project deleted', id)
        closeModal();
        navigate('/projects');
    }

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
                                <Form action={`/projects/${project.projectId}/edit`} method="post">
                                    <div className='p-4 sm:flex sm:gap-6 sm:items-start'>
                                        <div>
                                            {(!project.imageUrl || project.imageUrl === "") && (
                                                <div className='my-2 p-4 border border-zinc-950 bg-slate-100 sm:w-[200px] sm:mx-auto'>
                                                    <img src={imgPlaceholder}
                                                        alt="Wool icon created by Darius Dan - Flaticon"
                                                        className=' opacity-30'
                                                    />
                                                </div>)
                                            }
                                            {project.imageUrl && (
                                                <div className="my-2 mx-auto border border-zinc-950 max-w-[500px] h-[80vw] w-[80vw] sm:w-[200px] sm:h-[200px]">
                                                    <img src={project.imageUrl}
                                                        alt={`project photo`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )
                                            }
                                            <input
                                                type="file"
                                                id="file"
                                                className='my-1 p-1 border sm:max-w-[250px]'
                                                onChange={handleChange}
                                            // hidden
                                            />
                                            {/* <label htmlFor="file"> */}
                                            <div className="flex justify-end gap-4 sm:max-w-[250px]">
                                                <div
                                                    onClick={() => uploadImage(project.projectId)}
                                                    className=' my-4 max-w-fit px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer'
                                                >Add Photo</div>
                                                <div
                                                    onClick={() => deleteImage(project.projectId)}
                                                    className=' my-4 max-w-fit px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer'
                                                >Remove Photo</div>
                                                {/* </label> */}
                                            </div>
                                        </div>
                                        <div className="max-w-[500px] sm:grow">
                                            <p className='text-2xl font-bold'>
                                                <input
                                                    required
                                                    type="text"
                                                    name="name"
                                                    className='my-1 px-3 py-1 border block w-full'
                                                    defaultValue={project.name}
                                                /></p>
                                            <p className="text-lg font-bold">Project info</p>
                                            <div className="grid grid-cols-4 py-1 border-b border-zinc-700">
                                                <p className="col-start-1 text-zinc-700 ">Pattern</p>
                                                <p className="col-start-2 col-span-3">
                                                    <input
                                                        type="text"
                                                        name="pattern"
                                                        className='my-1 px-3 py-1 border block'
                                                        defaultValue={project.pattern}
                                                    />
                                                </p>
                                            </div>
                                            <div className="grid grid-cols-4 py-1 border-b border-zinc-700 mb-3">
                                                <p className="col-start-1 text-zinc-700">Size</p>
                                                <p className="col-start-2 col-span-3">
                                                    <input
                                                        type="text"
                                                        name="size"
                                                        className='my-1 px-3 py-1 border block'
                                                        defaultValue={project.size}
                                                    />
                                                </p>
                                            </div>

                                            <p className="text-lg font-bold">Needles & yarn</p>
                                            <div className="grid grid-cols-4 py-1 border-b border-zinc-700">
                                                <p className="col-start-1 text-zinc-700">Needle</p>
                                                <p className="col-start-2 col-span-3">
                                                    <input
                                                        type="text"
                                                        name="needles"
                                                        className='my-1 px-3 py-1 border block'
                                                        defaultValue={project.needles}
                                                    />
                                                </p>
                                            </div>
                                            <div className="grid grid-cols-4 py-1 border-b border-zinc-700 mb-3">
                                                <p className="col-start-1 text-zinc-700 ">Yarn</p>
                                                <p className="col-start-2 col-span-3">
                                                    <input
                                                        type="text"
                                                        name="yarn"
                                                        className='my-1 px-3 py-1 border block'
                                                        defaultValue={project.yarn}
                                                    />
                                                </p>
                                            </div>
                                            <p className="text-lg font-bold">Notes</p>
                                            <textarea
                                                name="notes"
                                                className='mt-1 mb-4 px-3 py-1 border block resize-none w-full'
                                                defaultValue={project.notes}
                                            />
                                            <div className="flex gap-4 items-center justify-end">
                                                <div
                                                    onClick={showModal}
                                                    className=' my-4  max-w-fit px-3 py-1 bg-red-400  hover:bg-red-600 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer'
                                                >Delete Project</div>
                                                <button
                                                    className='block px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5'
                                                >Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                                {showDeleteModal && <DeleteModal closeModal={closeModal} deleteItem={() => deleteProject(project.projectId, project.imageUrl)} item='project' />}
                            </>
                        )
                    }
                </Await>
            </Suspense>
        </div>
    )
}
export default EditProject