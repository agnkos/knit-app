import { Await, defer, useLoaderData } from "react-router-dom";
import { getProjectDetail } from "../../config/firebase";
import { Suspense } from "react";
import imgPlaceholder from '../../img/knit-black.png';
import { Link } from "react-router-dom";
import { Project } from "../../types";
import { PencilIcon } from "@heroicons/react/24/outline";

type LoaderData = {
    projectDetail: Project
}
// Partial<Project> ?

type Object = {
    params: Params
}

type Params = {
    id: string
}

export function loader(obj: Object) {
    return defer({ projectDetail: getProjectDetail(obj.params.id) })
}

const ProjectDetail = () => {
    const loaderData = useLoaderData() as LoaderData;

    return (
        <>
            <Suspense fallback={<h3>loading details...</h3>}>
                <Await resolve={loaderData.projectDetail}>
                    {project => (
                        <div className='p-4 sm:flex sm:gap-6 sm:items-start'>
                            <div className='my-2 p-4 border border-zinc-950 bg-slate-100 sm:w-[200px]'>
                                <img src={imgPlaceholder}
                                    alt="Wool icon created by Darius Dan - Flaticon"
                                    className=' opacity-30'
                                />
                            </div>
                            <div className="max-w-[500px] sm:grow">
                                <div className="mb-3 flex justify-between items-center">
                                    <p className='text-2xl font-bold'>{project.name}</p>
                                    <Link to="edit">
                                        <button
                                            className="flex gap-1 items-center mt-1 px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5"
                                        >
                                            <PencilIcon className="w-4 h-4" />
                                            <span>
                                                edit
                                            </span>
                                        </button>
                                    </Link>
                                </div>
                                <p className="text-lg font-bold">Project info</p>
                                <div className="grid grid-cols-4 py-1 border-b border-zinc-700">
                                    <p className="col-start-1 text-zinc-700 ">Pattern</p>
                                    <p className="col-start-2 col-span-3">{project.pattern}</p>
                                </div>
                                <div className="grid grid-cols-4 py-1 border-b border-zinc-700 mb-3">
                                    <p className="col-start-1 text-zinc-700">Size</p>
                                    <p className="col-start-2 col-span-3">{project.size}</p>
                                </div>

                                <p className="text-lg font-bold">Needles & yarn</p>
                                <div className="grid grid-cols-4 py-1 border-b border-zinc-700">
                                    <p className="col-start-1 text-zinc-700">Needle</p>
                                    <p className="col-start-2 col-span-3">{project.needles}</p>
                                </div>
                                <div className="grid grid-cols-4 py-1 border-b border-zinc-700 mb-3">
                                    <p className="col-start-1 text-zinc-700 ">Yarn</p>
                                    <p className="col-start-2 col-span-3">{project.yarn}</p>
                                </div>
                                <p className="text-lg font-bold">Notes</p>
                                <p>{project.notes}</p>
                            </div>
                        </div>
                    )}
                </Await>
            </Suspense >
        </>
    )
}
export default ProjectDetail