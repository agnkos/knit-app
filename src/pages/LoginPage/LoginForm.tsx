import { NavLink, useSubmit } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { action } from './action'
import { useActionData } from 'react-router-typesafe';
import { useEffect } from 'react';
// import { useCallback } from 'react';

// type LogInFormData = {
//     email: string,
//     password: string
// }

// type FormikHelpers = {
//     setErrors: (fields: { [field: string]: string }) => void
// }

const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Invalid email address'
    ),
    password: Yup.string().required('Password is required')
})
const initialValues = {
    email: '',
    password: '',
}

const LoginForm = (props: { data: ReturnType<typeof useActionData<typeof action>> }) => {
    const submit = useSubmit()

    //1. props (useActionData) are received after submitting (errors), so setErrors(to actiondata) cannot be within onSubmit function
    //2. function submit (useSubmit) - only values and options can be passed as arguments, 

    // const onSubmit = async (values: LogInFormData, { setErrors }: FormikHelpers) => {
    //     await submit(values, { method: "post" })
    //     console.log('propps', props.data)
    //     if (typeof props.data === 'object' && props?.data?.error === 'auth/user-not-found') {
    //         console.log('status login errror', props?.data?.error)
    //         setErrors({ email: 'wrong email' })
    //     } else if (typeof props.data === 'object' && props.data?.error === 'auth/wrong-password') {
    //         console.log('status login errror', props?.data?.error)
    //         setErrors({ password: 'wrong password' })
    //     }
    // }

    useEffect(() => {
        console.log('props from useeff', props.data)
    }, [props.data])

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => submit(values, { method: "post" })}
        // onSubmit={onSubmit}
        >
            {() => {
                return (
                    < Form
                        className='flex flex-col items-center max-w-sm gap-4 ' >
                        <div className='text-center'>

                            <Field
                                type="email"
                                name="email"
                                required
                                placeholder='Email adress'
                                className='px-3 py-1 mb-1'
                            />
                            <ErrorMessage name="email" component="div" className="text-sm text-red-500" />
                            {/* {(typeof props.data === 'object' && props?.data?.error === 'auth/user-not-found') && <p className="text-sm text-red-500">Incorrect email</p>} */}
                        </div>
                        <div className='text-center'>
                            <Field
                                type="password"
                                name="password"
                                required
                                placeholder='Password'
                                className='px-3 py-1 mb-1'
                            />
                            <ErrorMessage name="password" component="div" className="text-sm text-red-500" />
                            {(typeof props.data === 'object' && props?.data?.error === 'auth/wrong-password') && <p className="text-sm text-red-500">Incorrect password</p>}
                        </div>
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
            }}
        </Formik>
    )
}
export default LoginForm