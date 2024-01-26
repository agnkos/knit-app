import QueueModalFormContent from './QueueModalFormContent'
import { useSubmit } from 'react-router-dom'
import { QueueModalFormProps } from '../../types'

const QueueModalForm = ({ state }: QueueModalFormProps) => {
    const submit = useSubmit()

    return (
        <QueueModalFormContent onSubmit={submit} state={state} />

    )
}
export default QueueModalForm