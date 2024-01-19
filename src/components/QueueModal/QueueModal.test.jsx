import { describe, vi, it, expect, shallow } from "vitest";
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import React from "react";
import QueueModal from './QueueModal'
import { testRoutes } from "../../App";

const TestComponent = () => {
    <BrowserRouter initialEntries={['/add']}>
        <Routes>
            <Route
                path='/add'
                element={<QueueModal />}
                state={{ button: 'edit' }}
            />
        </Routes>
    </BrowserRouter>
}


describe('Queue modal testing', () => {
    // it('queue modal is displayed', async () => {
    //     // const item = {
    //     //     "name": "sweater",
    //     //     "notes": "blabla",
    //     //     "createdAt": Date.now(),
    //     //     "position": 1,
    //     //     "queuedItemId": 123
    //     // }
    //     // const state = { button: 'edit', item: item }
    //     render(<QueueModal />, { wrapper: BrowserRouter })
    //     // render(<BrowserRouter initialEntries={[{ pathname: '/add', state: { button: 'edit' } }]}>
    //     //     <QueueModal />
    //     // </BrowserRouter>)
    //     // render(<QueueModal />)
    //     // render(<TestComponent />)
    //     screen.debug()
    //     // screen.getByText('edit').toBeInTheDocument()
    // })
    it('queue modal is displayed', async () => {
        // render(<BrowserRouter initialEntries={[{ pathname: '/add', state: { button: 'edit' } }]}>
        //     <QueueModal />
        // </BrowserRouter>)

        const { container } = render(<RouterProvider router={createBrowserRouter(createRoutesFromElements(testRoutes), {
            initialEntries:[{ pathname: '/add', state: { button: 'edit' } }], waitForData: true
        })} > <QueueModal /> </RouterProvider>)

        screen.debug(container)
    })
})
