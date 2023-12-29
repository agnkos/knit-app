import { expect, test, describe, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import React from 'react';
import App from '../../App'
// import {  RouterProvider} from 'react-router';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, redirect } from 'react-router-dom';
import { routes } from '../../App';
import LoginForm from './LoginForm';


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
        // const mockAction = vi.fn(() => redirect('/projects'))
        const user = userEvent.setup()

        const button = container.querySelector('button')
        const nameInput = container.querySelector('input[name="email"]')
        const passwordInput = container.querySelector('input[name="password"]')

        await user.type(nameInput, 'tester@email.com')
        expect(screen.getByDisplayValue('tester@email.com')).toBeInTheDocument()
        await user.type(passwordInput, 'testapp123')
        await user.click(button)

        // expect(mockAction).toHaveBeenCalledOnce();
        // expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Projects')

        // screen.debug(button)

        // expect(screen.getByText('Projects')).toBeInTheDocument()
    })

    it('user should log in with correct login and password 2', async () => {
        // const mockAction = vi.fn()
        const mockAction = vi.fn(() => redirect('/projects'))
        const { container } = render(<RouterProvider router={createBrowserRouter(createRoutesFromElements(routes), {
            initialEntries: ['/'], waitForData: true
        })} > <LoginForm handleSubmit={mockAction} /> </RouterProvider>)
        const user = userEvent.setup()
        const login = vi.spyOn(user, 'click')

        const button = container.querySelector('button')
        const nameInput = container.querySelector('input[name="email"]')
        const passwordInput = container.querySelector('input[name="password"]')

        await user.type(nameInput, 'tester@email.com')
        expect(screen.getByDisplayValue('tester@email.com')).toBeInTheDocument()
        await user.type(passwordInput, 'testapp123')
        await user.click(button)
        expect(login).toHaveBeenCalledTimes(1)
        fireEvent.submit(button)
        // expect(mockAction).toHaveBeenCalledTimes(1)
        //  expect(mockAction).toHaveBeenCalledOnce();
        // expect(screen.getByText('Projects')).toBeInTheDocument()
        screen.debug()
    })

});
