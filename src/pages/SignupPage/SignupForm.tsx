import { Form } from 'react-router-dom';

const SignupForm = () => {
  return (
    <Form action="/signup" method="post"
    className='flex flex-col items-center max-w-sm gap-4 '>
    <input
        name="username"
        type="text"
        required
        placeholder='Username'
        className='px-3 py-1'
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
    >Create an account</button>
</Form>
  )
}
export default SignupForm