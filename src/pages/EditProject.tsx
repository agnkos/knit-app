import { Form, useLoaderData, Await } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { redirect } from "react-router-dom";
import { Suspense } from "react";
import imgPlaceholder from '../img/knit-black.png';
import { Project } from "../types";

export async function action({ params, request }: any) {
    const formData = await request.formData();
    const name = formData.get('name');
    const pattern = formData.get('pattern');
    const size = formData.get('size');
    const yarn = formData.get('yarn');
    const needles = formData.get('needles');
    const notes = formData.get('notes');

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

    const data = useLoaderData() as LoaderData;

    return (
        <div>
            <h1 className="text-2xl font-bold">Edit Project</h1>
            <Suspense fallback={<h3>loading details...</h3>}>
                <Await resolve={data.projectDetail}>
                    {/* {project => (

                        <Form action={`/projects/${project.projectId}/edit`} method="post">
                            <div className="my-2">
                                <label>Project name</label>
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    className='my-1 px-3 py-1 border block'
                                    defaultValue={project.name}
                                />
                            </div>
                            <div className="my-2">
                                <label>Pattern</label>
                                <input
                                    type="text"
                                    name="pattern"
                                    className='my-1 px-3 py-1 border block'
                                    defaultValue={project.pattern}
                                />
                            </div>
                            <div className="my-2">
                                <label>Size</label>
                                <input
                                    type="text"
                                    name="size"
                                    className='my-1 px-3 py-1 border block'
                                    defaultValue={project.size}
                                />
                            </div>
                            <div className="my-2">
                                <label>Yarn</label>
                                <input
                                    type="text"
                                    name="yarn"
                                    className='my-1 px-3 py-1 border block'
                                    defaultValue={project.yarn}
                                />
                            </div>
                            <div className="my-2">
                                <label>Needles</label>
                                <input
                                    type="text"
                                    name="needles"
                                    className='my-1 px-3 py-1 border block'
                                    defaultValue={data.needles}
                                />
                            </div>
                            <button
                                className='mt-1 px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5'
                            >Save</button>
                        </Form>
                    )} */}
                    {
                        project => (
                            <Form action={`/projects/${project.projectId}/edit`} method="post">
                                <div className='p-4 sm:flex sm:gap-6 sm:items-start'>
                                    <div className='my-2 p-4 border border-zinc-950 bg-slate-100 sm:w-[200px]'>
                                        <img src={imgPlaceholder}
                                            alt="Wool icon created by Darius Dan - Flaticon"
                                            className=' opacity-30'
                                        />
                                    </div>
                                    <div className="max-w-[500px] sm:grow">
                                        {/* <div className="mb-3 flex justify-between items-center"> */}
                                        <p className='text-2xl font-bold'>
                                            <input
                                                required
                                                type="text"
                                                name="name"
                                                className='my-1 px-3 py-1 border block w-full'
                                                defaultValue={project.name}
                                            /></p>

                                        {/* <button
                                                className="flex gap-1 items-center mt-1 px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                                </svg>

                                                <span>
                                                    edit
                                                </span>
                                            </button> */}

                                        {/* </div> */}
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
                                            className='mt-1 mb-4 px-3 py-1 border block resie-none w-full'
                                            defaultValue={project.notes}
                                        />
                                    </div>
                                    <button
                                        className='mt-1 ml-auto block px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5'
                                    >Save</button>
                                </div>
                            </Form>
                        )
                    }



                </Await>
            </Suspense>
        </div>
    )
}
export default EditProject