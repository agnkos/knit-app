import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import QueuedItem from './QueuedItem'


describe('QuededItem tests', () => {
    it('Queued item and its props are properly displayed', () => {
        const item = {
            "name": "sweater",
            "notes": "blabla",
            "createdAt": Date.now(),
            "position": 1,
            "queuedItemId": 123
        }
        const index = 0

        render(<QueuedItem item={item} index={index} />, { wrapper: BrowserRouter })
        expect(screen.getByTestId('item-name')).toHaveTextContent('sweater')
        expect(screen.getByTestId('item-index')).toHaveTextContent('1')
        expect(screen.getByTestId('item-notes')).toHaveTextContent('blabla')
    })

    it('When user clicks on down arrow icon, changePosition function is called with proper arguments', async () => {
        const item = {
            "name": "sweater",
            "notes": "blabla",
            "createdAt": Date.now(),
            "position": 1,
            "queuedItemId": 123
        }
        const index = 0
        const user = userEvent.setup()
        const mockCallback = vi.fn()
        const { getByTestId } = render(<QueuedItem item={item} index={index} onClickCallback={() => mockCallback(item.queuedItemId, item.position, 'down')} />, { wrapper: BrowserRouter })
        const downIcon = getByTestId('down-icon')
        await user.click(downIcon)
        waitFor(() => {
            expect(mockCallback).toHaveBeenCalledWith('123', 1,
                'down')
        })
    })
    it('When user clicks on up arrow icon, changePosition function is called with proper arguments', async () => {
        const item = {
            "name": "sweater",
            "notes": "blabla",
            "createdAt": Date.now(),
            "position": 1,
            "queuedItemId": 123
        }
        const index = 0
        const user = userEvent.setup()
        const mockCallback = vi.fn()
        const { getByTestId } = render(<QueuedItem item={item} index={index} onClickCallback={() => mockCallback(item.queuedItemId, item.position, 'up')} />, { wrapper: BrowserRouter })
        const upIcon = getByTestId('up-icon')
        await user.click(upIcon)
        waitFor(() => {
            expect(mockCallback).toHaveBeenCalledWith('123', 1,
                'up')
        })
    })
    it('When user clicks on trash icon, deleteQueuedItem function is called with proper argument', async () => {
        const item = {
            "name": "sweater",
            "notes": "blabla",
            "createdAt": Date.now(),
            "position": 1,
            "queuedItemId": 123
        }
        const index = 0
        const user = userEvent.setup()
        const mockCallback = vi.fn()
        const { getByTestId } = render(<QueuedItem item={item} index={index} onClickCallback={() => mockCallback(item.queuedItemId)} />, { wrapper: BrowserRouter })
        const trashIcon = getByTestId('trash-icon')
        await user.click(trashIcon)
        waitFor(() => {
            expect(mockCallback).toHaveBeenCalledWith('123', 1,
                'up')
        })
    })
})