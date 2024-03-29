import { redirect, ActionFunctionArgs } from "react-router-dom";
import { auth, db } from "../../config/firebase";
import { doc, collection, setDoc } from "firebase/firestore";

export async function action({ request }: ActionFunctionArgs) {
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
            needles: needles,
            imageUrl: ""
        })

        return redirect('/projects')

    } catch (error) {
        if (error instanceof Error) return { error: error.message }
        return String(error)
    }
}