import { Form, NavLink, redirect } from 'react-router-dom';
import knitLogo from "../img/art-and-design.png";
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export async function action({ request }: any) {
    console.log(request)
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const data = await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem('loggedUser', JSON.stringify(data.user.uid))
        console.log('user logged in', email, password);
        // console.log(data.user);
        return redirect('/projects')

    } catch (err: any) {
        console.log(err)
        return {
            error: err.message
        }
    }
}

const Login = () => {

    return (
        <div className='flex flex-col justify-center items-center gap-4 h-screen bg-teal-50'>
            <Form action="/" method="post"
                className='flex flex-col items-center max-w-sm bg-zinc-100 py-6 px-8 gap-4 shadow-[3px_3px_0_0] shadow-zinc-800'>
                <h1 className='m-2 text-4xl text-rose-500 font-logo'>Knit.app</h1>
                <img src={knitLogo}
                    alt="Wool icon created by Darius Dan - Flaticon"
                    className='w-40'
                />
                <input
                    name="email"
                    type="email"
                    required
                    placeholder='Email adress'
                    className='px-3 py-1'
                />
                <input
                    name="password"
                    type="password"
                    required
                    placeholder='Password'
                    className='px-3 py-1'
                />
                <button
                    className='mt-1 px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5'
                >Log in</button>
                <p
                    className='text-sm'
                >If you don't have an account,
                    <NavLink to="/signup"
                        className="text-teal-500 hover:text-teal-700"
                    > sign up.</NavLink></p>
            </Form>
        </div>
    )
}
export default Login

