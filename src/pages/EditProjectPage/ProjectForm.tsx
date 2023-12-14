import { Form } from "react-router-dom";
import { Project } from "../../types";
import ImagePlaceholder from "../../components/ImagePlaceholder";
import Image from "../../components/Image";

type FormProps = {
    project: Project,
    uploadImage: (id: string) => void,
    deleteImage: (id: string) => void,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    showModal: () => void
}

const ProjectForm = ({ project, uploadImage, deleteImage, handleChange, showModal }: FormProps) => {
    return (
        <Form action={`/projects/${project.projectId}/edit`} method="post">
            <div className='p-4 sm:flex sm:gap-6 sm:items-start'>
                <div>
                    {(!project.imageUrl || project.imageUrl === "") && <ImagePlaceholder />}
                    {project.imageUrl &&
                        <Image url={project.imageUrl} alt="project photo" />
                    }
                    <input
                        type="file"
                        id="file"
                        className='my-1 p-1 border sm:max-w-[250px]'
                        onChange={handleChange}
                    />
                    <div className="flex justify-end gap-4 sm:max-w-[250px]">
                        <div
                            onClick={() => uploadImage(project.projectId)}
                            className=' my-4 max-w-fit px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer'
                        >Add Photo</div>
                        <div
                            onClick={() => deleteImage(project.projectId)}
                            className=' my-4 max-w-fit px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer'
                        >Remove Photo</div>
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
                    <div className="grid grid-cols-[100px_minmax(100px,300px)] gap-2 py-1 border-b border-zinc-700">
                        <p className="text-zinc-700 ">Pattern</p>
                        <p className="">
                            <input
                                type="text"
                                name="pattern"
                                className='my-1 px-3 py-1 border block'
                                defaultValue={project.pattern}
                            />
                        </p>
                    </div>
                    <div className="grid grid-cols-[100px_minmax(100px,300px)] gap-2 py-1 border-b border-zinc-700 mb-3">
                        <p className="text-zinc-700">Size</p>
                        <p className="">
                            <input
                                type="text"
                                name="size"
                                className='my-1 px-3 py-1 border block'
                                defaultValue={project.size}
                            />
                        </p>
                    </div>

                    <p className="text-lg font-bold">Needles & yarn</p>
                    <div className="grid grid-cols-[100px_minmax(100px,300px)] gap-2 py-1 border-b border-zinc-700">
                        <p className="text-zinc-700">Needle</p>
                        <p className="">
                            <input
                                type="text"
                                name="needles"
                                className='my-1 px-3 py-1 border block'
                                defaultValue={project.needles}
                            />
                        </p>
                    </div>
                    <div className="grid grid-cols-[100px_minmax(100px,300px)] gap-2 py-1 border-b border-zinc-700 mb-3">
                        <p className="text-zinc-700 ">Yarn</p>
                        <p className="">
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
    )
}
export default ProjectForm