import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoginForm from './../Components/LoginForm.jsx';

test('renders LoginForm correctly', () => {
    render(<LoginForm />);
    expect(screen.getByText('Sähköposti')).toBeInTheDocument();
});

