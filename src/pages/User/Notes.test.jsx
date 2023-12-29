import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import React from 'react';
import Notes from './Notes';
import { routes } from '../../App';


describe('notes page', () => {
    it('notes page should be rendered', async () => {
        render(
            <RouterProvider router={createBrowserRouter(createRoutesFromElements(routes), {
                initialEntries: ['/notes'], waitForData: true
            })}>
                <Notes />
            </RouterProvider>
        )
        screen.debug()
    })
})