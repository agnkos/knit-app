import { useSubmit } from "react-router-dom";
import QueueModalFormContent from "./QueueModalFormContent";
import { QueueModalFormProps } from '../../types'

const _QueueModalForm = ({ state }: QueueModalFormProps) => {
    const submitForm = useSubmit()
    return <QueueModalFormContent onSubmit={submitForm} state={state} />
}
export default _QueueModalForm