import { useSubmit } from "react-router-dom";
import NoteFormContent from "./NoteFormContent";

const NoteForm = () => {
    const submit = useSubmit()

    return (
        <NoteFormContent onSubmit={submit} />
    )
}
export default NoteForm