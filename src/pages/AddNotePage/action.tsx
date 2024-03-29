import { auth, db } from "../../config/firebase";
import { doc, collection, setDoc, Timestamp } from "firebase/firestore";
import { redirect } from "react-router-dom";
import type { ActionFunctionArgs } from 'react-router-dom';

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const title = formData.get('title');
    const content = formData.get('content');
    const date = new Date();

    try {
        const noteRef = doc(collection(db, "users", `${auth?.currentUser?.uid}`, "notes"))
        await setDoc(noteRef, {
            noteId: noteRef.id,
            title: title || 'untitled',
            content: content,
            date: date.toLocaleDateString(),
            added: Timestamp.now()
        })
        return redirect('/notes')
    } catch (error) {
        if (error instanceof Error) return { error: error.message }
        return String(error)
    }
}
