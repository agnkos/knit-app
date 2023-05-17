import { Await, defer, useLoaderData } from "react-router-dom";
import { getProjectDetail } from "../../config/firebase";
import { Suspense } from "react";
import knitPlaceholder from '../../img/knit-black.png';

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
                        <div className=''>
                            <div className='my-2 p-4 border border-zinc-950 bg-slate-100 sm:w-[200px]'>
                                <img src={knitPlaceholder}
                                    className=' opacity-30'
                                />
                            </div>
                            <div className="max-w-[500px]">
                                <p className='mb-2 text-xl font-bold'>{project.name}</p>

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