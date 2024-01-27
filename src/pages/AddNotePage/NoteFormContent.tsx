import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

type SubmitFunctionType = {
    onSubmit: (values: { title: string; content: string; }, options: { method?: 'post' }) => void;
}


const NoteFormContent = ({ onSubmit }: SubmitFunctionType) => {
    const initialValues = {
        title: '',
        content: ''
    }

    const validationSchema = Yup.object({
        title: Yup.string(),
        content: Yup.string().required('Content is required')
    })
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => onSubmit(values, { method: "post" })}
        >
            {() => (
                <Form className="w-full sm:w-8/12">
                    <div className="my-2">
                        <label id="title">Title</label>
                        <Field
                            type="text"
                            name="title"
                            className='my-1 px-3 py-1 border block w-full'
                            aria-labelledby="title"
                            data-testid="title"
                        />
                    </div>
                    <div className="my-2">
                        <label id="content">Content</label>
                        <Field
                            component="textarea"
                            name="content"
                            className='mt-1 mb-2 px-3 py-1 border block resize-none w-full h-32'
                            aria-labelledby="content"
                            data-testid="content"
                        />
                        <ErrorMessage name="content" component="div" className="text-sm text-red-600" />
                    </div>
                    <button
                        type="submit"
                        className='mt-1 px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5'
                    >Create note</button>
                </Form>)
            }
        </Formik >
    )
}
export default NoteFormContent