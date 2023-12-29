import { expect, test, describe, it } from 'vitest'
import { render, screen } from '@testing-library/react';
import AddNote from './AddNote'

export function sum(a, b) {
    return a + b
}

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
})

describe('test code', () => {
    it('3 + 5 should be 8', () => {
        expect(3 + 5).toBe(8);
    });

    // it('note page should be rendered', async () => {
    //     render(<AddNote />);

    //     expect(await screen.findByText('New Note')).toBeInTheDocument();
    // })
});