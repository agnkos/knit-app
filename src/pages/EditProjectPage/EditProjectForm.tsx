import { Project } from "../../types";
import ImagePlaceholder from "../../components/ImagePlaceholder";
import Image from "../../components/Image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSubmit } from "react-router-dom";
import * as Yup from "yup";

type FormProps = {
    project: Project,
    uploadImage: (id: string) => void,
    deleteImage: (id: string) => void,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    showModal: () => void
}

const ProjectForm = ({ project, uploadImage, deleteImage, handleChange, showModal }: FormProps) => {
    const submit = useSubmit()
    const initialValues = {
        name: project.name,
        pattern: project.pattern,
        size: project.size,
        yarn: project.yarn,
        needles: project.needles,
        notes: project.notes
    }
    const validationSchema = Yup.object({
        name: Yup.string().required('Project name is required')
    })

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => submit(values, { action: `/projects/${project.projectId}/edit`, method: "post" })}
        >
            {() => (
                <Form>
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
                            <p className='text-2xl font-bold my-1'>
                                <Field
                                    type="text"
                                    name="name"
                                    className='px-3 py-1 border block w-full'
                                />
                                <ErrorMessage name="name" component="span" className="text-sm font-normal text-red-600" />
                            </p>
                            <p className="text-lg font-bold">Project info</p>
                            <div className="grid grid-cols-[100px_minmax(100px,300px)] gap-2 py-1 border-b border-zinc-700">
                                <p className="text-zinc-700 ">Pattern</p>
                                <p className="">
                                    <Field
                                        type="text"
                                        name="pattern"
                                        className='my-1 px-3 py-1 border block'
                                    />
                                </p>
                            </div>
                            <div className="grid grid-cols-[100px_minmax(100px,300px)] gap-2 py-1 border-b border-zinc-700 mb-3">
                                <p className="text-zinc-700">Size</p>
                                <p className="">
                                    <Field
                                        type="text"
                                        name="size"
                                        className='my-1 px-3 py-1 border block'
                                    />
                                </p>
                            </div>

                            <p className="text-lg font-bold">Needles & yarn</p>
                            <div className="grid grid-cols-[100px_minmax(100px,300px)] gap-2 py-1 border-b border-zinc-700">
                                <p className="text-zinc-700">Needle</p>
                                <p className="">
                                    <Field
                                        type="text"
                                        name="needles"
                                        className='my-1 px-3 py-1 border block'
                                    />
                                </p>
                            </div>
                            <div className="grid grid-cols-[100px_minmax(100px,300px)] gap-2 py-1 border-b border-zinc-700 mb-3">
                                <p className="text-zinc-700 ">Yarn</p>
                                <p className="">
                                    <Field
                                        type="text"
                                        name="yarn"
                                        className='my-1 px-3 py-1 border block'
                                    />
                                </p>
                            </div>
                            <p className="text-lg font-bold">Notes</p>
                            <Field
                                component="textarea"
                                name="notes"
                                className='mt-1 mb-4 px-3 py-1 border block resize-none w-full'
                            />
                            <div className="flex gap-4 items-center justify-end">
                                <div
                                    onClick={showModal}
                                    className=' my-4  max-w-fit px-3 py-1 bg-red-400  hover:bg-red-600 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer'
                                >Delete Project</div>
                                <button
                                    type="submit"
                                    className='block px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5'
                                >Save</button>
                            </div>
                        </div>
                    </div>
                </Form>)}
        </Formik>
    )
}
export default ProjectForm