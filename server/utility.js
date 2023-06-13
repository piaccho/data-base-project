import bcrypt from "bcryptjs";

export async function validateAccountData(data, res) {
    const { firstname, lastname, address, phone, email, username, password } = data;

    // Walidacja danych wejściowych
    if (
        !firstname ||
        !lastname ||
        !address ||
        !phone ||
        !email ||
        !username ||
        !password
    ) {
        return res.status(400).send("Please provide all required fields");
    }


    // Walidacja imienia i nazwiska
    if (!/^[a-zA-Z\-]+$/i.test(firstname) || !/^[a-zA-Z\-]+$/i.test(lastname)) {
        return res.status(400).send("Invalid firstname or lastname");
    }

    // // Walidacja adresu
    // if (!/^[a-zA-Z0-9\s\-\,]+$/i.test(address)) {
    //     return res.status(400).send("Invalid address" );
    // }

    // // Walidacja numeru telefonu
    // if (!/^\+[0-9]{1,3}\s?[0-9]{9,}$/i.test(phone)) {
    //     return res.status(400).send("Invalid phone number" );
    // }

    // Walidacja adresu e-mail
    if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/.test(email)) {
        return res.status(400).send("Invalid email address");
    }

    // Walidacja usernameu (co najmniej 5 znaków)
    if (username.length < 5) {
        return res.status(400).send("Invalid username");
    }

    // Walidacja hasła (co najmniej 8 znaków i zawierało co najmniej jedną dużą literę i cyfrę)
    if (
        password.length < 8 ||
        !/[A-Z]/.test(password) ||
        !/[0-9]/.test(password)
    ) {
        return res.status(400).send("Invalid password");
    }

    const usernamesOrPhoneNumbers = await db.collection('users').find({ $or: [ { username: username }, { phone: phone } ] }).toArray();
    if (usernamesOrPhoneNumbers.length === 0) {
        return res.status(400).send("Username or phone number exists");
    }
}

export function hashPassword(password) {
    // ustawić dyskretne hashowanie
    return bcrypt.hashSync(password, 8);
}

export function checkPassword(password, db) {
    return bcrypt.compareSync(password, hash);
}