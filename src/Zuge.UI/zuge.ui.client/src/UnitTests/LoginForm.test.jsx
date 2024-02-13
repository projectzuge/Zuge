import { expect, test, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from './../Components/LoginForm.jsx';

// RENDERING TESTS:

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

const emailLocalPartAcceptable = [
    "Tommy",
    "tommy",
    "tOmMy",
    "TOMMY",
    "tommy.niemi",
    "tOmMy.NiEmI",
    "Tommy.Niemi",
    "TOMMY.NIEMI",
    "tommy.nie.mi",
    "tOMMy.nIE.MI",
    "TOMMY.NIE.MI",
    "123",
    "1Tommy",
    "Tomm1",
    "tOm3my",
    "34.tommy",
    "tommy.5",
    "tommy.678.niemi",
    "389.tommy.niemi",
    "12.tommy.13",
    "tom.23.14",
    "33.66.tom",
    "tommy_12",
    "34_tommy",
    "tom_my",
    "niemi_tommy",
    "tommy.nie_mi",
    "tommy_nie-mi",
    "tommy-niemi",
    "tommy_niemi",
    "tommy_nie_mi",
    "tommy-nie-mi",
    "abcdefghijklmnopqrstuvwxyz",
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    "_tommy",
    "5tommy7",
    "9tommy",
    "8tommy.niemi",
    "tommy.niem1",
    "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    ".tommy",
    "  tommy",
];

const emailLocalPartNotAcceptable = [
    "!tommy",
    "tom?my",
    "tom my",
    "tom!my.niemi",
    "tommy!",
    "tommy .niemi",
    "tommy.niemi ",
    "tömmy",
    "tommy_niömi",
    "abcdefghijklmnopqrstuvwxyzåäöABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    "",
    "",
    "",
    ""
];

const emailDomainPartAcceptable = [
    "gmail.com",
    "email.com",
    "email.org",
    "email.co.uk",
    "email.co",
    "email.fi",
    "email1.com",
    "em-ail.fi",
    "em4il.co.uk",
    "EMAIL.com",
    "Email.fi",
    "eMail.org",
    "em-M4IL.com",
    "-GMAIL.com",
    "em_ail.fi",
    "E_MAIL.co",
];

const emailDomainPartNotAcceptable = [
    ".email.com",
    "ema!l.com",
    ".gmail.com",
    "a",
    ".com",
    ".fi",
    "",
    "",
    "",
    "",
    ""
];

// const passwordsAcceptable = [
//     "aE1!22",
//     "abC123!?",
//     "OOOooo123!!!$$$",
//     "£££eeeEEE122",
//     "536rT@@",
//     "aaaaaaaaaaaaaaabbbbbbbbbbbbeeeeeeeeeeeeeeeeeCCCCCCCCCCCCCCCCCCCC123456789!?????????????????????????",
//     "abcdefghijklmnopqrstuvwxyzåäöABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ1234567890!?@£$#.-_",
//     " kjkdj12!?JJ",
//     "aB/c12!?"
// ];

// const passwordsNotAcceptable = [
//     "aE1!2",
//     "lllooo123!!!$$$",
//     "£££eeeEEE&&&",
//     "536rt@@",
//     "aaaBBB123",
//     "aaaaaaaaaaaaaaabbbbbbbbbbbbeeeeeeeeeeeeeeeeeCCCCCCCCCCCCCCCCCCCC123456789!???????????????????????????",
//     "aaaaaaaaaaaaaaabbbbbbbbbbbbeeeeeeeeeeeeeeeeeCCCCCCCCCCCCCCCCCCCC123456789!???????????????????????????aaaaaaaaaaaaaaabbbbbbbbbbbbeeeeeeeeeeeeeeeeeCCCCCCCCCCCCCCCCCCCC123456789!???????????????????????????",
// ]

for (let i = 0; i < 50; i++) {
    const email = emailLocalPartAcceptable[Math.floor(Math.random() * emailLocalPartAcceptable.length)] + "@" +
     emailDomainPartAcceptable[Math.floor(Math.random() * emailDomainPartAcceptable.length)];

    test('email field accepts email: ' + email, () => {
        const emailField = screen.getByRole('textbox');
        fireEvent.change(emailField, { target: { value: email } });

        expect(screen.queryByText(/Invalid email address/i)).toBeNull();

    });
}

for (let i = 0; i < 30; i++) {
    const email = emailLocalPartNotAcceptable[Math.floor(Math.random() * emailLocalPartNotAcceptable.length)] + "@" +
     emailDomainPartNotAcceptable[Math.floor(Math.random() * emailDomainPartNotAcceptable.length)];

    test('email field does not accept email: ' + email, () => {
        const emailField = screen.getByRole('textbox');
        fireEvent.change(emailField, { target: { value: email } });

        expect(screen.queryByText(/Invalid email address/i)).not.toBeNull();

    });
}

for (let i = 0; i < 30; i++) {
    const email = emailLocalPartAcceptable[Math.floor(Math.random() * emailLocalPartAcceptable.length)] + "@" +
     emailDomainPartNotAcceptable[Math.floor(Math.random() * emailDomainPartNotAcceptable.length)];

    test('email field does not accept email: ' + email, () => {
        const emailField = screen.getByRole('textbox');
        fireEvent.change(emailField, { target: { value: email } });

        expect(screen.queryByText(/Invalid email address/i)).not.toBeNull();

    });
}

for (let i = 0; i < 30; i++) {
    const email = emailLocalPartNotAcceptable[Math.floor(Math.random() * emailLocalPartNotAcceptable.length)] + "@" +
     emailDomainPartAcceptable[Math.floor(Math.random() * emailDomainPartAcceptable.length)];

    test('email field does not accept email: ' + email, () => {
        const emailField = screen.getByRole('textbox');
        fireEvent.change(emailField, { target: { value: email } });

        expect(screen.queryByText(/Invalid email address/i)).not.toBeNull();

    });
}