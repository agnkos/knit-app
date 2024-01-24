// import { Form } from "react-router-dom";
// import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSubmit } from "react-router-dom";
// import * as Yup from "yup";
import NoteFormContent from "./NoteFormContent";

const NoteForm = () => {
    const submit = useSubmit()

    // const initialValues = {
    //     title: '',
    //     content: ''
    // }

    // const validationSchema = Yup.object({
    //     title: Yup.string(),
    //     content: Yup.string().required('Content is required')
    // })
    // action="/addnote" method="post"
    return (
        <NoteFormContent onSubmit={submit}/>
        // <Formik
        //     initialValues={initialValues}
        //     validationSchema={validationSchema}
        //     onSubmit={(values) => submit(values, { method: "post" })}
        // // onSubmit={onSubmit}
        // >
        //     {(values) => {
        //         console.log(values)
        //         return (
        //             <Form className="w-full sm:w-8/12">
        //                 <div className="my-2">
        //                     <label>Title</label>
        //                     <Field
        //                         type="text"
        //                         name="title"
        //                         className='my-1 px-3 py-1 border block w-full'
        //                     />
        //                 </div>
        //                 <div className="my-2">
        //                     <label>Content</label>
        //                     <Field
        //                         // required
        //                         component="textarea"
        //                         name="content"
        //                         className='mt-1 mb-2 px-3 py-1 border block resize-none w-full h-32'
        //                     />
        //                     <ErrorMessage name="content" component="div" className="text-sm text-red-600" />
        //                 </div>
        //                 <button
        //                     type="submit"
        //                     className='mt-1 px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5'
        //                 >Create note</button>
        //             </Form>)
        //     }
        //     }
        // </Formik >
    )
}
export default NoteForm