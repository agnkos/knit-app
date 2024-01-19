import { test, vi, expect } from "vitest";
import { render, waitFor } from '@testing-library/react';
import React from "react";
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import UpIcon from "./UpIcon";

test('When user clicks on up arrow icon, changePosition function is called with proper arguments', async () => {
    const item = {
        "name": "sweater",
        "notes": "blabla",
        "createdAt": Date.now(),
        "position": 1,
        "queuedItemId": 123
    }
    const user = userEvent.setup()
    const mockCallback = vi.fn()
    const { getByTestId } = render(<UpIcon item={item} changePosition={() => mockCallback(item.queuedItemId, item.position, 'up')} />, { wrapper: BrowserRouter })
    const upIcon = getByTestId('up-icon')
    user.click(upIcon)
    await waitFor(() => {
        expect(mockCallback).toHaveBeenCalledWith(123, 1,
            'up')
    })
})