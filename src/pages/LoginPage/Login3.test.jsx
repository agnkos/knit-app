
// YourComponent.test.jsx
import { mount, vi, describe, it, expect } from 'vitest';
import LoginForm from './LoginForm';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import firebase from 'firebase/app';
import React from 'react'
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { testRoutes } from '../../App';


// Mock the signInWithEmailAndPassword function from firebase/auth
// vi.mock('firebase/auth', {
//     signInWithEmailAndPassword: async (auth, email, password) => {
//         await firebase.auth().signInWithEmailAndPassword(email, password);
//         console.log('Mocked signInWithEmailAndPassword:', email, password);
//         // Mocked success response
//         return {
//             default: {
//                 auth: vi.fn().mockReturnThis(),
//                 signInWithEmailAndPassword: vi.fn(),
//             },
//         };
//     },
// });

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

describe('YourComponent', () => {
    it('should handle sign-in with email and password', async () => {
        const user = userEvent.setup()

        const { container } = render(<RouterProvider router={createBrowserRouter(createRoutesFromElements(testRoutes), {
            initialEntries: ['/'], waitForData: true
        })} > <LoginForm /> </RouterProvider>)

        // Simulate user input
        // wrapper.querySelector('input[type="email"]').element.value = 'tester@email.com';
        // wrapper.querySelector('input[type="email"]').trigger('input');

        // wrapper.querySelector('input[type="password"]').element.value = 'tester@email.com';
        // wrapper.querySelector('input[type="password"]').trigger('input');

        // Trigger the sign-in process
        // await wrapper.querySelector('button').trigger('click');

        const button = container.querySelector('button')
        const nameInput = container.querySelector('input[name="email"]')
        const passwordInput = container.querySelector('input[name="password"]')

        const email = 'tester@email.com'
        const password = 'testapp123'

        await user.type(nameInput, email)
        expect(screen.getByDisplayValue('tester@email.com')).toBeInTheDocument()
        await user.type(passwordInput, password)
        await user.click(button)

        // Assertions
        // Your assertions based on the mocked behavior
        await app.authenticate(email, password)
        await waitFor(() => {
            expect(firebase.auth().signInWithEmailAndPassword).toBeCalledWith(email, password);
            expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Projects')

        })
    });
});
