import bcrypt from "bcryptjs";

export function validateAccountData(data, res) {
    const { firstname, lastname, address, phone, email, login, password } = data;

    // Walidacja danych wejściowych
    if (
        !firstname ||
        !lastname ||
        !address ||
        !phone ||
        !email ||
        !login ||
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

    // Walidacja loginu (co najmniej 5 znaków)
    if (login.length < 5) {
        return res.status(400).send("Invalid login");
    }

    // Walidacja hasła (co najmniej 8 znaków i zawierało co najmniej jedną dużą literę i cyfrę)
    if (
        password.length < 8 ||
        !/[A-Z]/.test(password) ||
        !/[0-9]/.test(password)
    ) {
        return res.status(400).send("Invalid password");
    }
}

export async function hashedPassword(data, res) {
    async function hashPassword(password) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            return hashedPassword;
        } catch (error) {
            throw new Error("Błąd podczas haszowania hasła");
        }
    }

    return await hashPassword(data.password)
        .then((hashedPassword) => {
            console.log("Hasło zahaszowane:", hashedPassword);
            return hashPassword;
        })
        .catch((error) => {
            console.error("Wystąpił błąd:", error);
            return null;
        });
}
