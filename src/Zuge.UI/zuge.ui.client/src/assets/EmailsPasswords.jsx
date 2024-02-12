export const emailLocalPartAcceptable = [
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
    "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789." +
    "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    "_tommy",
    "5tommy7",
    "9tommy",
    "8tommy.niemi",
    "tommy.niem1",
    "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789." +
    "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789." +
    "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789." +
    "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    ".tommy",
    "  tommy",
];

export const emailLocalPartNotAcceptable = [
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

export const emailDomainPartAcceptable = [
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

export const emailDomainPartNotAcceptable = [
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

export const passwordsAcceptable = [
    "aE1!22",
    "abC123!?",
    "OOOooo123!!!$$$",
    "£££eeeEEE122",
    "536rT@@",
    "aaaaaaaaaaaaaaabbbbbbbbbbbbeeeeeeeeeeeeeeeeeCCCCCCCCCCCCCCCCCCCC" +
    "123456789!?????????????????????????",
    "abcdefghijklmnopqrstuvwxyzåäöABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ" +
    "1234567890!?@£$#.-_",
    " kjkdj12!?JJ",
    "aB/c12!?"
];

export const passwordsNotAcceptable = [
    "aE1!2",
    "lllooo123!!!$$$",
    "£££eeeEEE&&&",
    "536rt@@",
    "aaaBBB123",
    "aaaaaaaaaaaaaaabbbbbbbbbbbbeeeeeeeeeeeeeeeeeCCCCCCCCCCCCCCCCCCCC" +
    "123456789!???????????????????????????",
    "aaaaaaaaaaaaaaabbbbbbbbbbbbeeeeeeeeeeeeeeeeeCCCCCCCCCCCCCCCCCCCC" +
    "123456789!???????????????????????????aaaaaaaaaaaaaaabbbbbbbbbbbb" +
    "eeeeeeeeeeeeeeeeeCCCCCCCCCCCCCCCCCCCC123456789" +
    "!???????????????????????????",
]
