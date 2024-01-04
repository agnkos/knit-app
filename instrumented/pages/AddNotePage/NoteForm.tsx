import { Form } from "react-router-dom";

const NoteForm = () => {
    return (
        <Form action="/addnote" method="post" className="w-full sm:w-8/12">
            <div className="my-2">
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    className='my-1 px-3 py-1 border block w-full'
                />
            </div>
            <div className="my-2">
                <label>Content</label>
                <textarea
                    required
                    name="content"
                    className='mt-1 mb-4 px-3 py-1 border block resize-none w-full h-32'
                />
            </div>
            <button
                className='mt-1 px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5'
            >Create note</button>
        </Form>
    )
}
export default NoteForm