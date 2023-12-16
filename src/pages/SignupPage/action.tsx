import { ActionFunctionArgs, redirect } from 'react-router-dom';
import { auth, db } from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export async function action({ request }: any) {
    console.log(request)
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');
    const username = formData.get('username');


    try {
        const data = await createUserWithEmailAndPassword(auth, email, password);
        localStorage.setItem('loggedUser', JSON.stringify(data.user.uid))
        await setDoc(doc(db, "users", `${data.user.uid}`), {
            username: username,
            useremail: email,
            userId: data.user.uid,
        })
        return redirect('/projects')

    } catch (err: any) {
        console.log(err)
        return {
            error: err.message
        }
    }

}