import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import React from 'react';
import NoteFormContent from "./NoteFormContent";

describe('NoteForm tests', () => {
    it('note form is displayed', () => {
        render(<NoteFormContent />)
        screen.debug()
        expect(screen.getByLabelText('Title')).toBeInTheDocument()
        expect(screen.getByLabelText('Content')).toBeInTheDocument()
        expect(screen.getByRole('button')).toHaveTextContent('Create note')
    })

    it('user can fill in the form', async () => {
        const { container } = render(<NoteFormContent />)
        const user = userEvent.setup()
        const titleInput = container.querySelector('input[name="title"]')
        const contentInput = container.querySelector('textarea[name="content"]')
        await user.type(titleInput, 'new title')
        expect(screen.getByDisplayValue('new title')).toBeInTheDocument()
        await user.type(contentInput, 'this is a new note')
        expect(screen.getByDisplayValue('this is a new note')).toBeInTheDocument()
    })
    it('user can click on Create note button and save note', async () => {
        const mockSubmit = vi.fn()
        const user = userEvent.setup()
        render(<NoteFormContent onSubmit={mockSubmit} />)
        const formBtn = screen.getByText('Create note')
        user.click(formBtn)
        await waitFor(() => {
            expect(mockSubmit).toHaveBeenCalledOnce()

        })
    })
})