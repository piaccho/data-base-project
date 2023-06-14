import User from '#root/src/models/userModel.js'
import bcrypt from 'bcrypt';

// email validation
export function validateEmail(email) {
    // Prosta walidacja struktury adresu email
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
}

// username validation
export function validateUsername(username) {
    return username.length >= 5;
}

// password validation
export function validatePassword(password) {
    const lengthCheck = password.length >= 8;
    // const uppercaseCheck = /[A-Z]/.test(password);
    const uppercaseCheck = true;
    const digitCheck = /[0-9]/.test(password);
    return lengthCheck && uppercaseCheck && digitCheck;
}

export const isTokenValid = (token) => {
    const BEARER = 'Bearer'
    if (token[0] !== BEARER) {
        return { valid: false, userid: null};
    }
    jwt.verify(AUTHORIZATION_TOKEN[1], TOKEN_SECRET_JWT, (err, decoded) => {
        if (err) {
            return { valid: false, userid: null };
        }
        return { valid: true, userid: decoded._id };
    });
    // const decoded = jwt.verify(token, TOKEN_SECRET_JWT);
    // if (decoded.rol !== "user" && decoded.rol !== "admin") {
    //     return false;
    // }
    // return true
};

export const signinUser = async (username, password) => {
    const user = await User.findOne({ username, password });

    // check if user exists
    if (!user) {
        return null;
    }

    // // compare passwords
    // const passwordMatch = await bcrypt.compare(password, user.password);

    // // check password
    // if (!passwordMatch) {
    //     return null;
    // }

    return user;
}

export const signinUserId = async (id) => {
    const user = await User.findById(id);

    // check if user exists
    if (!user) {
        return null;
    }

    return user;
}