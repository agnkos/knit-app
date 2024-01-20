import { expect, describe, it } from "vitest";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from "react";
import AddNoteHeader from "./AddNoteHeader";

describe('AddNote header tests', () => {
    it('AddNote page header is displayed', () => {
        render(<AddNoteHeader />, { wrapper: BrowserRouter })
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('New Note')
        expect(screen.getByRole('button')).toHaveTextContent('cancel')
    })
})