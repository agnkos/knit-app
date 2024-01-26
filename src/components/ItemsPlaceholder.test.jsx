import { expect, test } from "vitest";
import { render, screen } from '@testing-library/react';
import React from 'react';
import ItemsPlaceholder from './ItemsPlaceholder'

test('Items placeholder is displayed', async () => {
    render(<ItemsPlaceholder />)
    const image = await screen.findByRole('img')
    expect(image).toHaveAttribute('alt', 'Knitting icon created by iconixar - Flaticon')
})