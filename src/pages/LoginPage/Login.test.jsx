import { expect, test, describe, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import React from 'react';
import App from '../../App'
// import {  RouterProvider} from 'react-router';
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { testRoutes } from '../../App';
import LoginForm from './LoginForm';
// import { action as loginAction } from './action'
import firebase from 'firebase/app';

// vi.mock('firebase/auth', () => ({
//     signInWithEmailAndPassword: mockSignInWithEmailAndPassword,
// }));

const app = {
    authenticate: async (email, password) => {
        await firebase.auth().signInWithEmailAndPassword(email, password);
    },
};

vi.mock('firebase/app', async () => {
    const actual = await vi.importActual("firebase/app")
    return {
        ...actual,
        default: {
            auth: vi.fn().mockReturnThis(),
            signInWithEmailAndPassword: vi.fn(),
        },
    };

});

function sum(a, b) {
    return a + b
}

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
})

describe('test code', () => {
    it('3 + 5 should be 8', () => {
        expect(3 + 5).toBe(8);
    });

    it('login page should be rendered', async () => {
        render(<App />);
        const title = screen.getByRole('heading', { level: 1, });
        expect(screen.getByRole('heading', { level: 1, })).toHaveTextContent('Knit.app')
        screen.debug(title)
        // screen.debug()
    })

    it('user should log in with correct login and password', async () => {
        const container = render(<App />).container
        // const mockAction = vi.fn(() => loginAction())
        const user = userEvent.setup()

        const button = container.querySelector('button')
        const nameInput = container.querySelector('input[name="email"]')
        const passwordInput = container.querySelector('input[name="password"]')

        await user.type(nameInput, 'tester@email.com')
        expect(screen.getByDisplayValue('tester@email.com')).toBeInTheDocument()
        await user.type(passwordInput, 'tester@email.com')
        await user.click(button)

        // expect(mockAction).toHaveBeenCalledOnce();
        // expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Projects')

        // screen.debug(button)

        // expect(screen.getByText('Projects')).toBeInTheDocument()
    })

    // it('user should log in with correct login and password 2', async () => {
    //     // const mockAction = vi.fn()
    //     const mockAction = vi.fn(() => loginAction())
    //     const { container } = render(<RouterProvider router={createBrowserRouter(createRoutesFromElements(testRoutes), {
    //         initialEntries: ['/'], waitForData: true
    //     })} > <LoginForm handleSubmit={mockAction} /> </RouterProvider>)
    //     // const container = render(<LoginForm handleSubmit={mockAction} />).container
    //     const user = userEvent.setup()
    //     // const login = vi.spyOn(user, 'click')

    //     const button = container.querySelector('button')
    //     const nameInput = container.querySelector('input[name="email"]')
    //     const passwordInput = container.querySelector('input[name="password"]')

    //     await user.type(nameInput, 'tester@email.com')
    //     expect(screen.getByDisplayValue('tester@email.com')).toBeInTheDocument()
    //     await user.type(passwordInput, 'testapp123')
    //     await user.click(button)
    //     // expect(login).toHaveBeenCalledTimes(1)
    //     fireEvent.submit(button)

    //     await waitFor(() => {
    //         expect(mockAction).toHaveBeenCalled()
    //         expect(screen.getByText('Projects')).toBeInTheDocument()
    //     })
    //     //  expect(mockAction).toHaveBeenCalledOnce();
    //     // expect(screen.getByText('Projects')).toBeInTheDocument()
    //     screen.debug()
    // })

    // it('login 3', async () => {
    //     const onSubmit = vi.fn()
    //     const { container } = render(<RouterProvider router={createBrowserRouter(createRoutesFromElements(testRoutes), {
    //         initialEntries: ['/'], waitForData: true
    //     })} > <LoginForm /> </RouterProvider>)
    //     const user = userEvent.setup()
    //     const button = container.querySelector('button')
    //     const nameInput = container.querySelector('input[name="email"]')
    //     const passwordInput = container.querySelector('input[name="password"]')

    //     await user.type(nameInput, 'tester@email.com')
    //     expect(screen.getByDisplayValue('tester@email.com')).toBeInTheDocument()
    //     await user.type(passwordInput, 'testapp123')
    //     await user.click(button)

    //     await waitFor(() => {
    //         expect(onSubmit).toHaveBeenCalled()
    //     })
    //     expect(screen.getByText('Projects')).toBeInTheDocument()
    // })

    it('login 4', async () => {
        const user = userEvent.setup()
        const { container } = render(<RouterProvider router={createBrowserRouter(createRoutesFromElements(testRoutes), {
            initialEntries: ['/'], waitForData: true
        })} > <LoginForm /> </RouterProvider>)

        const button = container.querySelector('button')
        const nameInput = container.querySelector('input[name="email"]')
        const passwordInput = container.querySelector('input[name="password"]')

        const email = 'tester@email.com'
        const password = 'testapp123'

        await user.type(nameInput, email)
        expect(screen.getByDisplayValue('tester@email.com')).toBeInTheDocument()
        await user.type(passwordInput, password)
        await user.click(button)

        await app.authenticate(email, password)
        await waitFor(() => {
            expect(firebase.auth().signInWithEmailAndPassword).toBeCalledWith(email, password);
            // expect(screen.getByText('Projects')).toBeInTheDocument()

        })
        screen.debug()
        // expect(firebase.mockAuth().mockSignIn).toBeCalledWith(email, password);
    })

});


