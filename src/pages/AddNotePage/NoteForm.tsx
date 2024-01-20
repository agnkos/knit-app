import { Form } from "react-router-dom";
import _NoteForm from "./_NoteForm";

const NoteForm = () => {
    return (
        <Form action="/addnote" method="post" className="w-full sm:w-8/12">
            <_NoteForm />
        </Form>
    )
}
export default NoteForm