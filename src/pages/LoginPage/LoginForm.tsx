import { Form, NavLink } from 'react-router-dom';
import { action } from './action'
import { useActionData } from 'react-router-typesafe';


const LoginForm = (props: { data: ReturnType<typeof useActionData<typeof action>> }) => {
    return (
        < Form action="/" method="post"
            className='flex flex-col items-center max-w-sm gap-4 ' >
            <input
                name="email"
                type="email"
                required
                placeholder='Email adress'
                className='px-3 py-1'
            />
            {(typeof props.data === 'object' && props?.data?.error === 'auth/user-not-found') && <p className="text-sm text-red-500">Incorrect email</p>}
            <input
                name="password"
                type="password"
                required
                placeholder='Password'
                className='px-3 py-1'
            />
            {(typeof props.data === 'object' && props?.data?.error === 'auth/wrong-password') && <p className="text-sm text-red-500">Incorrect password</p>}
            <button
                className='mt-1 px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5'
            >Log in</button>
            <p
                className='text-sm'
            >If you don&apos;t have an account,
                <NavLink to="/signup"
                    className="text-teal-500 hover:text-teal-700"
                > sign up.</NavLink></p>
        </Form >

    )
}
export default LoginForm