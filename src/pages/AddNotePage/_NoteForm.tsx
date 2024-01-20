import { useSubmit } from "react-router-dom"
import NoteFormContent from "./NoteFormContent"

const _NoteForm = () => {
    const submitForm = useSubmit()
    return <NoteFormContent onSubmit={submitForm} />
}
export default _NoteForm