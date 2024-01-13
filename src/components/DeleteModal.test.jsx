import { describe, vi, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from "react";
import DeleteModal from "./DeleteModal";

describe('delete modal testing', () => {

    it('delete modal is shown', () => {
        render(<DeleteModal />)
        screen.debug()
        expect(screen.getByText('Are you sure you want to delete this ?')).toBeInTheDocument()

    })
    it('delete modal props "item" is passed', () => {
        render(<DeleteModal item={'yarn'} />)
        expect(screen.getByText('Are you sure you want to delete this yarn?')).toBeInTheDocument()
        screen.debug()


    })
    it('delete modal can be closed', async () => {
        const user = userEvent.setup()
        const mockCallback = vi.fn()

        render(
            <DeleteModal item={'yarn'} closeModal={mockCallback} />
        )
        const icon = screen.getByTestId('close-icon')
        screen.debug(icon)
        await user.click(icon)

        expect(mockCallback).toHaveBeenCalledOnce()
    })
    it.only('delete modal can be cancel', async () => {
        const user = userEvent.setup()
        const mockCallback = vi.fn()

        render(
            <DeleteModal item={'yarn'} closeModal={mockCallback} />
        )
        const cancelBtn = screen.getByText('Cancel')
        screen.debug(cancelBtn)
        await user.click(cancelBtn)
        expect(mockCallback).toHaveBeenCalledOnce()
    })
    it.only('delete modal - user can confirm deleting an item', async () => {
        const user = userEvent.setup()
        const mockCallback = vi.fn()

        render(
            <DeleteModal item={'yarn'} deleteItem={mockCallback} />
        )
        const deleteBtn = screen.getByText('Delete')
        screen.debug(deleteBtn)
        await user.click(deleteBtn)
        expect(mockCallback).toHaveBeenCalledOnce()
    })
}
)