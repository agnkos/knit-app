import { expect, test } from "vitest";
import { render, screen } from '@testing-library/react';
import React from 'react';
import ImagePlaceholder from './ImagePlaceholder'

test('Image placeholder is displayed', async () => {
    render(<ImagePlaceholder />)
    const image = await screen.findByRole('img')
    expect(image).toHaveAttribute('alt', 'Wool icon created by Darius Dan - Flaticon')
})