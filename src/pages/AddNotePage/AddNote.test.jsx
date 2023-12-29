import { test } from "vitest";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { AddNote } from "./AddNote";
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { routes } from "../../App";
import React from "react";

test('note is added', async () => {
    const { container } = render(<RouterProvider router={createBrowserRouter(createRoutesFromElements(routes), {
        initialEntries: ['/addnote'], waitForData: true
    })}><AddNote /></RouterProvider>)
    const user = userEvent.setup()

    const button = container.querySelector('button')
    await user.click(button)
    // expect(screen.getByText('Notes')).toBeDefined
    screen.debug(button)
}
)