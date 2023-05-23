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