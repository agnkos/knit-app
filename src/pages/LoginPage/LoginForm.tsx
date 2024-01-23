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

    const submit = useSubmit()
    const formik = useFormik<LogInFormData>({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => submit(values, { method: "post" })
        // submit(values, { method: "post" })

        // setStatus('sent')

        // {
        //     console.log('login values', values)
        //     try {
        //       const response =  await submit(values, { method: "post" })
        //         if (!response.ok) {
        //             const errorData = await response.json();
        //             throw new Error(errorData.message);
        //           }
        //     } catch (error) {
        //         console.log('error submit', error)
        //         setStatus({ error: 'login errror' })

        //     }
        // }
    })

    return (
        // < Form action="/" method="post"
        < Form onSubmit={formik.handleSubmit}
            className='flex flex-col items-center max-w-sm gap-4 ' >
            <input
                type="email"
                {...formik.getFieldProps('email')}
                required
                placeholder='Email adress'
                className='px-3 py-1'
            />
            {data?.error === 'auth/user-not-found' && (<pre className='text-red-600'>wrong user</pre>)}
            {formik.touched.email && formik.errors.email ?
                (
                    <div className='text-sm text-red-600'>{formik.errors.email}</div>
                )
                : null}
            <input
                type="password"
                {...formik.getFieldProps('password')}
                required
                placeholder='Password'
                className='px-3 py-1'
            />
            {data?.error === 'auth/wrong-password' && (<pre className='text-red-600'>wrong password</pre>)}
            {formik.touched.password && formik.errors.password ? (
                <div className='text-sm text-red-600'>{formik.errors.password}</div>
            ) : null}
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