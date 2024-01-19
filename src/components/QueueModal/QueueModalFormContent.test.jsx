import { describe, vi, it, expect } from "vitest";
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from "react";
import QueueModalFormContent from './QueueModalFormContent'



describe('Queue modal testing', () => {
    it('queue modal form is displayed', async () => {
        render(<QueueModalFormContent />)
        expect(screen.getByText('Notes')).toBeDefined()
        expect(screen.getByLabelText('Project name')).toBeInTheDocument()
        expect(screen.getByLabelText('Notes')).toBeInTheDocument()
    })

    it('queue modal from props are displayed when passed from location.state', () => {
        const state = {
            button: 'edit',
            item: {
                name: 'new project',
                notes: 'blabla'
            }
        }

        const { container } = render(<QueueModalFormContent state={state} />)
        screen.debug()
        expect(container.querySelector('input[name="name"]')).toHaveValue('new project')
        expect(container.querySelector('textarea[name="notes"]')).toHaveValue('blabla')
        expect(screen.getByRole('button')).toHaveTextContent('Save changes')
    })

    it('edited item is saved when user clicks the form button', async () => {
        const user = userEvent.setup()
        const mockSubmit = vi.fn()
        const state = {
            button: 'edit',
            item: {
                name: 'new project',
                notes: 'blabla'
            }
        }
        render(<QueueModalFormContent state={state} onSubmit={mockSubmit} />)
        const formBtn = screen.getByText('Save changes')
        user.click(formBtn)
        await waitFor(() => {
            expect(mockSubmit).toHaveBeenCalledOnce()

        })
    })

})