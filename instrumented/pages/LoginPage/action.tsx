import { redirect, ActionFunctionArgs } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));

    try {
        const data = await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem('loggedUser', JSON.stringify(data.user.uid))
        return redirect('/projects')

    } catch (error) {
        if (error instanceof Error) return { error: error.message }
        return String(error)
    }
}