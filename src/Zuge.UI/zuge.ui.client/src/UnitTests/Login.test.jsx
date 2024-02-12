import { expect, test, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './../Components/Login.jsx';
import { 
    emailLocalPartAcceptable,
    emailLocalPartNotAcceptable,
    emailDomainPartAcceptable,
    emailDomainPartNotAcceptable,
} from "./../assets/EmailsPasswords.jsx";

// RENDERING TESTS:

vi.mock('react-router-dom', () => ({
    ...vi.importActual('react-router-dom'),
    useNavigate: vi.fn(),
    Link: vi.fn(),
}));

test('renders password text correctly', () => {
    render(<Login />);
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
    expect(screen.getByText(/\bRekisteröidy\b/i));
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

test('does not show "Invalid email" when first rendered', async () => {
    expect(screen.queryByText(/Invalid email address/i)).toBeNull();
});

test('does not show "Invalid password" when first rendered', () => {
    expect(screen.queryByText(/Invalid password/i)).toBeNull();
});

// FUNCTIONALITY TESTS:

for (let i = 0; i < 50; i++) {
    const email = emailLocalPartAcceptable[Math.floor(Math.random() * 
        emailLocalPartAcceptable.length)] + "@" + 
        emailDomainPartAcceptable[Math.floor(Math.random() * 
            emailDomainPartAcceptable.length)];

    test('email field accepts email: ' + email, () => {
        const emailField = screen.getByRole('textbox');
        fireEvent.change(emailField, { target: { value: email } });

        expect(screen.queryByText(/Invalid email address/i)).toBeNull();

    });
}

for (let i = 0; i < 30; i++) {
    const email = emailLocalPartNotAcceptable[Math.floor(Math.random() * 
        emailLocalPartNotAcceptable.length)] + "@" +
     emailDomainPartNotAcceptable[Math.floor(Math.random() * 
        emailDomainPartNotAcceptable.length)];

    test('email field does not accept email: ' + email, () => {
        const emailField = screen.getByRole('textbox');
        fireEvent.change(emailField, { target: { value: email } });

        expect(screen.queryByText(/Invalid email address/i)).not.toBeNull();

    });
}

for (let i = 0; i < 30; i++) {
    const email = emailLocalPartAcceptable[Math.floor(Math.random() * 
        emailLocalPartAcceptable.length)] + "@" +
     emailDomainPartNotAcceptable[Math.floor(Math.random() * 
        emailDomainPartNotAcceptable.length)];

    test('email field does not accept email: ' + email, () => {
        const emailField = screen.getByRole('textbox');
        fireEvent.change(emailField, { target: { value: email } });

        expect(screen.queryByText(/Invalid email address/i)).not.toBeNull();

    });
}

for (let i = 0; i < 30; i++) {
    const email = emailLocalPartNotAcceptable[Math.floor(Math.random() * 
        emailLocalPartNotAcceptable.length)] + "@" +
     emailDomainPartAcceptable[Math.floor(Math.random() * 
        emailDomainPartAcceptable.length)];

    test('email field does not accept email: ' + email, () => {
        const emailField = screen.getByRole('textbox');
        fireEvent.change(emailField, { target: { value: email } });

        expect(screen.queryByText(/Invalid email address/i)).not.toBeNull();

    });
}