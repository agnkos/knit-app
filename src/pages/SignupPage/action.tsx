import { redirect, ActionFunctionArgs } from 'react-router-dom';
import { auth, db } from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));
    const username = String(formData.get('username'));

    // await createUserWithEmailAndPassword(auth, email, password)
    //     .then((data) => {
    //         console.log(data)
    //         localStorage.setItem('loggedUser', JSON.stringify(data.user.uid))
    //         setDoc(doc(db, "users", `${data.user.uid}`), {
    //             username: username,
    //             useremail: email,
    //             userId: data.user.uid,
    //         })
    //         return redirect('/projects')
    //     })
    //     .catch((error) => {
    //         console.log(error.code)
    //         const errorCode = error.code
    //         const errorMessage = error.message
    //     })


    try {
        const data = await createUserWithEmailAndPassword(auth, email, password);

        localStorage.setItem('loggedUser', JSON.stringify(data.user.uid))
        await setDoc(doc(db, "users", `${data.user.uid}`), {
            username: username,
            useremail: email,
            userId: data.user.uid,
        })
        return redirect('/projects')

    } catch (error) {
        console.log('error occured', error)
        if (error instanceof Error) return { error: error.message }
        return String(error)
    }
}