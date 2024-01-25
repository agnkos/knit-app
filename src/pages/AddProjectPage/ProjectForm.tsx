import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSubmit } from "react-router-dom";
import * as Yup from "yup";

const ProjectForm = () => {
    const submit = useSubmit()

    const initialValues = {
        name: '',
        pattern: '',
        size: '',
        yarn: '',
        needles: ''
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('Project name is required'),
    })

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values) => submit(values, { method: "post" })}
            validationSchema={validationSchema}
        >
            {() =>
            (<Form>
                <div className="my-2">
                    <label>Project name</label>
                    <Field
                        // required
                        type="text"
                        name="name"
                        className='my-1 px-3 py-1 border block'
                    />
                    <ErrorMessage name="name" component="div" className="text-sm text-red-600" />
                </div>
                <div className="my-2">
                    <label>Pattern</label>
                    <Field
                        type="text"
                        name="pattern"
                        className='my-1 px-3 py-1 border block'
                    />
                </div>
                <div className="my-2">
                    <label>Size</label>
                    <Field
                        type="text"
                        name="size"
                        className='my-1 px-3 py-1 border block'
                    />
                </div>
                <div className="my-2">
                    <label>Yarn</label>
                    <Field
                        type="text"
                        name="yarn"
                        className='my-1 px-3 py-1 border block'
                    />
                </div>
                <div className="my-2">
                    <label>Needles</label>
                    <Field
                        type="text"
                        name="needles"
                        className='my-1 px-3 py-1 border block'
                    />
                </div>
                <button
                    type="submit"
                    className='mt-1 px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5'
                >Create project</button>
            </Form>)}
        </Formik>
    )
}

export default ProjectForm