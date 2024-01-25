import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSubmit } from "react-router-dom";
import * as Yup from "yup";

const StashForm = () => {
    const submit = useSubmit()

    const initialValues = {
        name: '',
        skeins: '',
        colorway: '',
        dyelot: '',
        purchased: ''
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('Yarn name is required')
    })
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => submit(values, { method: "post" })}
        >

            {() => (<Form>
                <div className="my-2">
                    <label>Yarn name</label>
                    <Field
                        // required
                        type="text"
                        name="name"
                        className='my-1 px-3 py-1 border block'
                    />
                    <ErrorMessage name="name" component="div" className="text-sm text-red-600" />
                </div>
                <div className="my-2">
                    <label>Skeins</label>
                    <Field
                        type="text"
                        name="skeins"
                        className='my-1 px-3 py-1 border block'
                    />
                </div>
                <div className="my-2">
                    <label>Colorway</label>
                    <Field
                        type="text"
                        name="colorway"
                        className='my-1 px-3 py-1 border block'
                    />
                </div>
                <div className="my-2">
                    <label>Dye lot</label>
                    <Field
                        type="text"
                        name="dyelot"
                        className='my-1 px-3 py-1 border block'
                    />
                </div>
                <div className="my-2">
                    <label>Purchased at</label>
                    <Field
                        type="text"
                        name="purchased"
                        className='my-1 px-3 py-1 border block'
                    />
                </div>
                <button
                    type="submit"
                    className='mt-1 px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5'
                >Add yarn</button>
            </Form>)}
        </Formik>
    )
}
export default StashForm