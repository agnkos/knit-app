import { redirect, ActionFunctionArgs  } from "react-router-dom";
import { doc, collection, setDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const name = formData.get('name');
    const skeins = formData.get('skeins');
    const colorway = formData.get('colorway');
    const dyelot = formData.get('dyelot');
    const purchased = formData.get('purchased');

    try {
        const stashItemRef = doc(collection(db, "users", `${auth?.currentUser?.uid}`, "stash"))
        await setDoc(stashItemRef, {
            stashItemId: stashItemRef.id,
            name: name,
            skeins: skeins,
            colorway: colorway,
            dyelot: dyelot,
            purchased: purchased
        })
        return redirect('/stash')
    } catch (error) {
        if (error instanceof Error) return { error: error.message }
        return String(error)
    }
}