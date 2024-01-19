import { Form } from 'react-router-dom'
import _QueueModalForm from './_QueueModalForm'
import { QueueModalFormProps } from '../../types'

const QueueModalForm = ({ state }: QueueModalFormProps) => {
    return (
        <Form action='/queue/add' method='post'>
            <_QueueModalForm state={state} />
            {/* <label className='text-sm'>Project name</label>
            <input
                required
                type='text'
                name='name'
                className='my-1 px-3 py-1 border block'
                defaultValue={state?.item?.name}
            />
            <label className='text-sm'>Notes</label>
            <textarea
                name='notes'
                defaultValue={state?.item?.notes}
                className='mt-1 mb-4 px-3 py-1 h-24 border block resize-none w-full'
            />
            <input type='hidden' name='id' value={state?.item?.queuedItemId} />
            <button className='block ml-auto px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5'>
                {state?.button === 'edit' ? 'Save changes' : 'Add to queue'}
            </button> */}
        </Form>
    )
}
export default QueueModalForm