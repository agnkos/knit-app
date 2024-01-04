import { auth, db } from "../../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { redirect, ActionFunctionArgs } from "react-router-dom";

export async function action({ params, request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const name = formData.get('name');
    const pattern = formData.get('pattern');
    const size = formData.get('size');
    const yarn = formData.get('yarn');
    const needles = formData.get('needles');
    const notes = formData.get('notes');
    console.log('params project', params.id)

    try {
        const projectRef = doc(db, "users", `${auth?.currentUser?.uid}`, "projects", `${params.id}`)
        await updateDoc(projectRef, {
            projectId: projectRef.id,
            name: name,
            pattern: pattern,
            size: size,
            yarn: yarn,
            needles: needles,
            notes: notes
        })
        console.log('refresh: file added')

        return redirect(`/projects/${projectRef.id}`)

    } catch (error) {
        if (error instanceof Error) return { error: error.message }
        return String(error)
    }
}