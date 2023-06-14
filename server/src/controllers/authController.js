import User from '#root/src/models/userModel.js'
import { validateEmail, validateUsername, validatePassword } from '#root/src/util/utility.js'

import bcrypt from 'bcrypt';

const authController = {
    getLoginView: async (req, res) => {
        res.render('sign', { flag: "sign-in", created: true});
    },

    getRegisterView: async (req, res) => {
        res.render('sign', { flag: "sign-up" });
    },

    createAccount: async (req, res) => {
        try {
            const {
                email,
                username,
                password,
                firstname,
                lastname,
                address,
                phone,
            } = req.body;
            
            // validate fields
            if (!validateEmail(email)) {
                return res.status(400).json({ error: 'Incorrect email.' });
            }
            if (!validateUsername(username)) {
                return res.status(400).json({ error: 'Username must be at least 6 characters long.' });
            }
            if (!validatePassword(password)) {
                return res.status(400).json({ error: 'The password must have at least 8 characters, one capital letter and one number' });
            }


            // check if user exists
            const existingUser = await User.findOne({ $or: [{ email }, { username }] });
            if (existingUser) {
                if (existingUser.email === email) {
                    return res.status(400).json({ error: 'User with given email address already exists.' });
                } else if (existingUser.username === username) {
                    return res.status(400).json({ error: 'User with given email address already exists.' });
                }
            }

            // hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // create new user
            const user = new User({
                firstname,
                lastname,
                email,
                phone,
                address,
                username,
                password: hashedPassword,
            });

            await user.save();

            res.render('sign', { flag: "sign-in", created: true });
        } catch (error) {
            res.status(500).json({ error: 'Register error.' });
        }
    },

    signIn: async (req, res) => {
        try {
            const { username, password } = req.body;

            const user = await User.findOne({ username });

            // check if user exists
            if (!user) {
                return res.status(400).json({ error: 'Cannot find an account with that email address and password' });
            }

            // compare passwords
            const passwordMatch = await bcrypt.compare(password, user.password);

            // check password
            if (!passwordMatch) {
                return res.status(400).json({ error: 'Cannot find an account with that email address and password' });
            }

            if (user.type === "user") {
                res.redirect("/user");
            } else if (user.type === "admin") {
                res.redirect("/admin");
            }
            // return res.status(200).json({ error: 'User with this email and password exists' });
            // // Wygenerowanie tokena JWT
            // const token = jwt.sign({ userId: user._id }, 'secret-key'); // Zmień 'secret-key' na swoje własne tajne hasło

            // res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ error: 'Sign in error.' });
        }
    }
};

export default authController;