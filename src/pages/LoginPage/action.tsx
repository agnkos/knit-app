import { redirect } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export async function action({ request }: any) {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const data = await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem('loggedUser', JSON.stringify(data.user.uid))
        return redirect('/projects')

    } catch (err: any) {
        console.log(err)
        return {
            error: err.message
        }
    }
}