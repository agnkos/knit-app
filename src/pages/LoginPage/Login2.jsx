import { test, expect, vi } from 'vitest'
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'
import LoginForm from './LoginForm'
import React from 'react'
import App from '../../App'

// import mockFirebase from './firebase.mock.js'; // Update the path accordingly


// Mock the entire Firebase module
// vi.mock('firebase/app', () => mockFirebase);
// vi.mock('firebase/auth', () => mockFirebase.auth);

vi.mock('firebase/auth', {
    signInWithEmailAndPassword: async (auth, email, password) => {
        // Your custom mock implementation here
        console.log('Mocked signInWithEmailAndPassword:', email, password);
        // Mocked success response
        return {
            auth: vi.fn().mockReturnThis(),
            signInWithEmailAndPassword: vi.fn(),
        };
    },
});

test('should handle email/password authentication', async () => {
    render(<LoginForm />);

    // Assuming your component has email and password input fields
    const emailInput = screen.querySelector('input[name="email"]')
    const passwordInput = screen.querySelector('input[name="password"]')
    const submitButton = screen.getByText('Logi in');

    // Fill in the input fields
    fireEvent.change(emailInput, { target: { value: 'tester@email.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testapp123' } });

    // Click the submit button
    fireEvent.click(submitButton);

    // Wait for the authentication process to complete
    await waitFor(() => {
        // Assuming you have some indication of successful authentication in your component
        expect(screen.getByText('Projects')).toBeInTheDocument();
    });
});
