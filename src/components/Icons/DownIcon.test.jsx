import { test, vi, expect } from "vitest";
import { render, waitFor } from '@testing-library/react';
import React from "react";
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import DownIcon from "./DownIcon";

test('When user clicks on down arrow icon, changePosition function is called with proper arguments', async () => {
    const item = {
        "name": "sweater",
        "notes": "blabla",
        "createdAt": Date.now(),
        "position": 1,
        "queuedItemId": 123
    }

    const user = userEvent.setup()
    const mockCallback = vi.fn()
    const { getByTestId } = render(<DownIcon item={item} changePosition={() => mockCallback(item.queuedItemId, item.position, 'down')} />, { wrapper: BrowserRouter })
    const downIcon = getByTestId('down-icon')
    user.click(downIcon)
    await waitFor(() => {
        expect(mockCallback).toHaveBeenCalledWith(123, 1, 'down')
    })
})