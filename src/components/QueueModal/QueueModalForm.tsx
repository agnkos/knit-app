import { Form } from 'react-router-dom'
import _QueueModalForm from './_QueueModalForm'
import { QueueModalFormProps } from '../../types'

const QueueModalForm = ({ state }: QueueModalFormProps) => {
    return (
        <Form action='/queue/add' method='post'>
            <_QueueModalForm state={state} />
        </Form>
    )
}
export default QueueModalForm