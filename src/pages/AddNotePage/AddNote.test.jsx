import { describe, it } from "vitest";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NoteFormContent from './NoteFormContent'
import React from 'react';

describe('NoteForm tests', () => {
    it('NoteForm is displayed', () => {
        render(<NoteFormContent />, { wrapper: BrowserRouter })
        screen.debug()
    })
})