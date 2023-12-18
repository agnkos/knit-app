import { Form } from "react-router-dom";

const ProjectForm = () => {
    return (
        <Form action="/addproject" method="post">
            <div className="my-2">
                <label>Project name</label>
                <input
                    required
                    type="text"
                    name="name"
                    className='my-1 px-3 py-1 border block'
                />
            </div>
            <div className="my-2">
                <label>Pattern</label>
                <input
                    type="text"
                    name="pattern"
                    className='my-1 px-3 py-1 border block'
                />
            </div>
            <div className="my-2">
                <label>Size</label>
                <input
                    type="text"
                    name="size"
                    className='my-1 px-3 py-1 border block'
                />
            </div>
            <div className="my-2">
                <label>Yarn</label>
                <input
                    type="text"
                    name="yarn"
                    className='my-1 px-3 py-1 border block'
                />
            </div>
            <div className="my-2">
                <label>Needles</label>
                <input
                    type="text"
                    name="needles"
                    className='my-1 px-3 py-1 border block'
                />
            </div>
            <button
                className='mt-1 px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5'
            >Create project</button>
        </Form>
    )
}

export default ProjectForm