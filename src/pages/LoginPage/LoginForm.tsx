import { Form, NavLink, useSubmit } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from "yup";

type LogInFormData = {
    email: string,
    password: string
}

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
})

const LoginForm = ({ data }: any) => {
    // const { error }: any = data
    const submit = useSubmit()
    const formik = useFormik<LogInFormData>({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, actions) => {
            console.log('login values', values)
            try {
                await submit(values, { method: "post" })

            } catch (error) {
                console.log(error)
                actions.setStatus
            }
        }
    })

    return (
        // < Form action="/" method="post"
        < Form onSubmit={formik.handleSubmit}
            className='flex flex-col items-center max-w-sm gap-4 ' >
            <input
                type="email"
                {...formik.getFieldProps('email')}
                // name="email"
                required
                placeholder='Email adress'
                className='px-3 py-1'
            />
            {data?.error === 'Firebase: Error (auth/user-not-found).' && (<pre className='text-red-600'>wrong user</pre>)}
            <input
                type="password"
                // name="password"
                {...formik.getFieldProps('password')}
                required
                placeholder='Password'
                className='px-3 py-1'
            />
            {data?.error === 'Firebase: Error (auth/wrong-password).' && (<pre className='text-red-600'>wrong password</pre>)}
            <button
                className='mt-1 px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5'
                type="submit"
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