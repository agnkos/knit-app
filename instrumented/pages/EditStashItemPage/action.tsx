import { auth, db } from "../../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { redirect, ActionFunctionArgs } from "react-router-dom";

export async function action({ params, request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const name = formData.get('name');
    const skeins = formData.get('skeins');
    const colorway = formData.get('colorway');
    const dyelot = formData.get('dyelot');
    const purchased = formData.get('purchased');

    try {
        const itemRef = doc(db, "users", `${auth?.currentUser?.uid}`, "stash", `${params.id}`);
        await updateDoc(itemRef, {
            stashItemId: itemRef.id,
            name: name,
            skeins: skeins,
            colorway: colorway,
            dyelot: dyelot,
            purchased: purchased
        })
        return redirect(`/stash/${itemRef.id}`)
    } catch (error) {
        if (error instanceof Error) return { error: error.message }
        return String(error)
    }
}
