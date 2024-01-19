import { describe, it, vi, expect } from "vitest";
import { render, screen, waitFor } from '@testing-library/react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import React from 'react';
import LoginForm from './LoginForm'
import { testRoutes } from "../../App";
import userEvent from '@testing-library/user-event';

describe('login form tests', () => {
    it('Login form display', async () => {
        const mockAction = vi.fn()
        const user = userEvent.setup()
        // render(
        //     <BrowserRouter>
        //         <Routes>
        //             <Route
        //                 path='/'
        //                 element={<LoginForm action={mockAction} />}
        //             />
        //         </Routes>
        //     </BrowserRouter>
        // )
        const { container } = render(<RouterProvider router={createBrowserRouter(createRoutesFromElements(testRoutes), {
            initialEntries: ['/'], waitForData: true
        })} > <LoginForm action={mockAction} /> </RouterProvider>)
        screen.debug(container)
        const btn = screen.getByRole('button')
        const nameInput = container.querySelector('input[name="email"]')
        const passwordInput = container.querySelector('input[name="password"]')

        const email = 'tester@email.com'
        const password = 'testapp123'

        await user.type(nameInput, email)
        expect(screen.getByDisplayValue('tester@email.com')).toBeInTheDocument()
        await user.type(passwordInput, password)
        await user.click(btn)
        // await waitFor(() => {
        //     expect(mockAction).toHaveBeenCalledOnce()
        // })
    })
})
