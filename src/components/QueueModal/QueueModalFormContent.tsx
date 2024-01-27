import { Formik, Form, Field, ErrorMessage } from "formik";
import { QueuedItemType } from "../../types"
import * as Yup from "yup";

type QueueModalFormContentProps = {
    state: {
        button: string,
        item: QueuedItemType
    }
    onSubmit: (values: { name: string; notes: string; }, options: { action?: '/queue/add', method?: 'post' }) => void;
}


const QueueModalFormContent = ({ state, onSubmit }: QueueModalFormContentProps) => {
    const initialValues = {
        name: state?.item?.name || '',
        notes: state?.item?.notes || '',
        id: state?.item?.queuedItemId || ''
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        notes: Yup.string()
    })

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => onSubmit(values, { action: '/queue/add', method: "post" })}
        >
            {() => (
                <Form>
                    <label className='text-sm' id="name">Project name</label>
                    <Field
                        type='text'
                        name='name'
                        className='my-1 px-3 py-1 border block'
                        aria-labelledby="name"
                        data-testid="name"
                    />
                    <ErrorMessage name="name" component="div" className="text-sm text-red-600" />
                    <label className='text-sm' id='notes'>Notes</label>
                    <Field
                        component="textarea"
                        name='notes'
                        className='mt-1 mb-4 px-3 py-1 h-24 border block resize-none w-full'
                        aria-labelledby="notes"
                        data-testid="notes"
                    />
                    <Field type='hidden' name='id' value={state?.item?.queuedItemId} />
                    <button
                        type="submit"
                        className='block ml-auto px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5'>
                        {state?.button === 'edit' ? 'Save changes' : 'Add to queue'}
                    </button>
                </Form>
            )}
        </Formik>
    )
}
export default QueueModalFormContent