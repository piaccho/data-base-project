// email validation
export function validateEmail(email) {
    // Prosta walidacja struktury adresu email
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
}

// username validation
export function validateUsername(username) {
    return username.length >= 6;
}

// password validation
export function validatePassword(password) {
    const lengthCheck = password.length >= 8;
    // const uppercaseCheck = /[A-Z]/.test(password);
    const uppercaseCheck = true;
    const digitCheck = /[0-9]/.test(password);
    return lengthCheck && uppercaseCheck && digitCheck;
}
