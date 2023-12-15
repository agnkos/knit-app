import { useSubmit, Form } from 'react-router-dom';
import { useFormik, ErrorMessage } from 'formik';
import * as Yup from "yup";

type SignUpFormData = {
    username: string,
    email: string,
    password: string,
    repeatPassword: string
}
const emailRegex = new RegExp(/^\S+@\S+\.\S+$/)

const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required').matches(emailRegex, "Invalid email"),
    password: Yup.string().required('Password is required').min(6, 'Password must be 6 characters long or more'),
    repeatPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords don't match").required('Repeat password'),
})

// validationSchema
//     .validate({
//         email: 'eric@fgfg.com'
//     })
//     .catch((err) => {
//         console.log(err.name)
//         console.log(err.errors)
//     })

const SignupForm = () => {
    const submit = useSubmit();
    const formik = useFormik<SignUpFormData>({
        initialValues: {
            username: '',
            email: '',
            password: '',
            repeatPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log('values', values)
            submit(values, { method: "post" })
        },
    })

    return (
        <Form onSubmit={formik.handleSubmit}
            className='flex flex-col items-center max-w-sm gap-4 '>
            <div className='flex flex-col items-center'>
                <input
                    type="text"
                    {...formik.getFieldProps('username')}
                    placeholder='Username'
                    className='px-3 py-1'
                />
                {formik.touched.username && formik.errors.username ? (
                    <div className='text-sm text-red-600'>{formik.errors.username}</div>
                ) : null}
            </div>
            <div className='flex flex-col items-center'>
                <input
                    type="email"
                    {...formik.getFieldProps('email')}
                    placeholder='Email adress'
                    className='px-3 py-1'
                />
                {formik.touched.email && formik.errors.email ?
                    (
                        <div className='text-sm text-red-600'>{formik.errors.email}</div>
                    )
                    : null}
            </div>
            <div className='flex flex-col items-center'>
                <input
                    type="password"
                    {...formik.getFieldProps('password')}
                    placeholder='Password'
                    className='px-3 py-1'
                />
                {formik.touched.password && formik.errors.password ? (
                    <div className='text-sm text-red-600'>{formik.errors.password}</div>
                ) : null}
            </div>
            <div className='flex flex-col items-center'>
                <input
                    type="password"
                    {...formik.getFieldProps('repeatPassword')}
                    placeholder='Repeat password'
                    className='px-3 py-1'
                />
                {formik.touched.repeatPassword && formik.errors.repeatPassword ? (
                    <div className='text-sm text-red-600'>{formik.errors.repeatPassword}</div>
                ) : null}
            </div>
            <button
                className='mt-1 px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5'
                type="submit"
            >Create an account</button>
        </Form>
    )
}
export default SignupForm