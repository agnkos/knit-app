import { Await, defer, useLoaderData } from "react-router-dom";
import { getProjectDetail } from "../../config/firebase";
import { Suspense } from "react";
import imgPlaceholder from '../../img/knit-black.png';

export function loader(obj) {
    // console.log(obj)
    return defer({ projectDetail: getProjectDetail(obj.params.id) })
}

const ProjectDetail = () => {
    const loaderData = useLoaderData();

    // type Project = {
    //     name: string,
    //     needles: string,
    //     pattern: string,
    //     projectId: string,
    //     size: string,
    //     yarn: string
    // }

    return (
        <>

            <Suspense fallback={<h3>loading details...</h3>}>
                <Await resolve={loaderData.projectDetail}>
                    {project => (
                        <div className='p-4'>
                            <div className='my-2 p-4 border border-zinc-950 bg-slate-100 sm:w-[200px]'>
                                <img src={imgPlaceholder}
                                    alt="Wool icon created by Darius Dan - Flaticon"
                                    className=' opacity-30'
                                />
                            </div>
                            <div className="max-w-[500px]">
                                <div className="mb-3 flex justify-between items-center">
                                    <p className='text-2xl font-bold'>{project.name}</p>
                                    <button
                                        className="flex gap-1 items-center mt-1 px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                        </svg>

                                        <span className="">
                                            edit
                                        </span>
                                    </button>
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
                            </div>
                        </div>
                    )}
                    {/* {renderProjectDetail} */}
                </Await>
            </Suspense >
        </>
    )
}
export default ProjectDetail