import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoginForm from './../Components/LoginForm.jsx';

vi.mock('react-router-dom', () => ({
    ...vi.importActual('react-router-dom'),
    useNavigate: vi.fn(),
    Link: vi.fn(),
}));

test('renders password text correctly', () => {
    render(<LoginForm />);
    expect(screen.getByText('Salasana'));
});

test('renders email text correctly', () => {
    expect(screen.getByText('Sähköposti'));
});

test('renders new user text correctly', () => {
    expect(screen.getByText('Uusi käyttäjä? Rekisteröidy tästä:'));
});

test('renders Sign in text correctly', () => {
    expect(screen.getByText('Kirjaudu'));
});

test('renders cancel text correctly', () => {
    expect(screen.getByText('Peruuta'));
});

test('renders Register text correctly', () => {
    expect(screen.getByText('Rekisteröidy'));
});

test('renders email textfield correctly', () => {
    expect(screen.getByRole('textbox', { type: "email" }));
});

test('renders password textfield correctly', () => {
    expect(screen.getByRole('textbox', { type: "password" }));
});

test('does not show "Sign in failed text" when first rendered', () => {
    expect(screen.queryByText('Kirjautuminen epäonnistui.')).toBeInTheDocument();
    expect(screen.queryByText('Kirjautuminen epäonnistui.')).not.toBeVisible();
});
