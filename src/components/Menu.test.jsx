import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import React from 'react';
import Menu from './Menu'

describe('Menu tests', () => {
    it('Menu is displayed', () => {
        render(<Menu />)
        screen.debug()
    })
})