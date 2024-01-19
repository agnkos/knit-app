import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
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

})