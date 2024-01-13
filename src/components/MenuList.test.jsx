import { describe, it, expect, vi } from "vitest";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import MenuList from './MenuList';


describe('MenuList tests', () => {

    it('Menu list is displayed', () => {
        const { container } = render(<MenuList />, { wrapper: BrowserRouter })
        const projectLink = container.querySelector('a[href="/projects"]')
        const stashLink = container.querySelector('a[href="/stash"]')
        expect(projectLink).toBeDefined()
        expect(stashLink).toBeDefined()
    })

    it('Menu is closing after clicking links', async () => {
        const user = userEvent.setup()
        const mockCallback = vi.fn()
        const { container } = render(<MenuList closeMenu={mockCallback} />, { wrapper: BrowserRouter })
        const stashLink = container.querySelector('a[href="/stash"]')
        await user.click(stashLink)
        expect(mockCallback).toHaveBeenCalledOnce()
    })

    it('User should log out when clicking logout button', async () => {
        const user = userEvent.setup()
        const mockCallback = vi.fn()
        render(<MenuList logout={mockCallback} />, { wrapper: BrowserRouter })
        const logoutBtn = screen.getByText('Logout')
        await user.click(logoutBtn)
        expect(mockCallback).toHaveBeenCalledOnce()
    })


})