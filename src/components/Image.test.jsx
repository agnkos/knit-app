import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import React from 'react';
import Image from './Image';

describe('Image component', () => {
    it('Image component is shown', async () => {
        render(<Image />)
        const image = await screen.findByRole('img')
        expect(image).toBeInTheDocument()
    })

    it('Image component receives props - src and alt', async () => {
        render(<Image url='./src/image.jpg' alt='project photo' />)
        const image = await screen.findByRole('img')
        expect(image).toHaveAttribute('src', './src/image.jpg')
        expect(image).toHaveAttribute('alt', 'project photo')
    })
})