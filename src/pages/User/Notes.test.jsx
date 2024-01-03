import { describe, it, test, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, BrowserRouter, Routes, Route, MemoryRouter } from 'react-router-dom';
import React from 'react';
import Notes from './Notes';
import { testRoutes } from '../../App';

vi.mock('./Notes')


describe('notes page', () => {
    it('notes page should be rendered', async () => {
        render(
            <RouterProvider router={createBrowserRouter(createRoutesFromElements(testRoutes), {
                initialEntries: ['/notes'], waitForData: true
            })}>
                <Notes />
            </RouterProvider>
        )
        // screen.debug()
    })
})

test('full app rendering/navigating', async () => {

    // render(
    //     <RouterProvider router={createBrowserRouter(createRoutesFromElements(testRoutes), {
    //         initialEntries: ["/notes"], component: <Notes />
    //     })} />
    // )
    {/* <Routes>
            <Route path='/notes' element={<Notes />} />
        </Routes>
    </RouterProvider> */}
    // const user = userEvent.setup()
    render(
        <MemoryRouter initialEntries={['/notes']}>
            <Notes />
            {/* <Routes>
                <Route path='/notes' element={<Notes />} />
            </Routes> */}
        </MemoryRouter>
    )

    // verify page content for default route
    // expect(screen.getByText(/you are home/i)).toBeInTheDocument()
    // expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Notes')
    // verify page content for expected route after navigating
    // await user.click(screen.getByText(/about/i))
    screen.debug()
    // await waitFor(() => {
    //     expect(screen.getByText('Notes')).toBeInTheDocument();
    // })
    // const element = screen.getByText('Notes')
    // expect(element).toBeInTheDocument();
})
