import { test, vi, expect } from "vitest";
import { render, waitFor } from '@testing-library/react';
import React from "react";
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import DeleteIcon from "./DeleteIcon";

test('When user clicks on trash icon, deleteQueuedItem function is called with proper argument', async () => {
    const item = {
        "name": "sweater",
        "notes": "blabla",
        "createdAt": Date.now(),
        "position": 1,
        "queuedItemId": 123
    }

    const user = userEvent.setup()
    const mockCallback = vi.fn()
    const { getByTestId } = render(<DeleteIcon item={item} deleteItem={() => mockCallback(item.queuedItemId)} />, { wrapper: BrowserRouter })
    const trashIcon = getByTestId('trash-icon')
    user.click(trashIcon)
    await waitFor(() => {
        expect(mockCallback).toHaveBeenCalledWith(123)
    })
})
