import { redirect } from "react-router-dom";
import { doc, collection, setDoc } from "firebase/firestore";
import { Form } from "react-router-dom";
import { auth, db } from "../config/firebase";


export async function action({ request }: any): Promise<Response | {
    error: any;
}> {
    const formData = await request.formData();
    const name = formData.get('name');
    const pattern = formData.get('pattern');
    const size = formData.get('size');
    const yarn = formData.get('yarn');
    const needles = formData.get('needles');

    try {
        const projectRef = doc(collection(db, "users", `${auth?.currentUser?.uid}`, "projects"))
        await setDoc(projectRef, {
            projectId: projectRef.id,
            name: name,
            pattern: pattern,
            size: size,
            yarn: yarn,
            needles: needles
        })

        return redirect('/projects')

    } catch (err: any) {
        return {
            error: err.message
        }
    }
}

const AddProject = () => {

    return (
        <div>
            <h1 className="text-2xl font-bold">New Project</h1>
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
        </div>
    )
}
export default AddProject