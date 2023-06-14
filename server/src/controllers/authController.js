import User from '#root/src/models/userModel.js'
import { validateEmail, validateUsername, validatePassword } from '#root/src/util/utility.js'

import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import { TOKEN_SECRET_JWT } from '#root/config.js'

// Generate token 
const generateTokens = (req, user) => {
    const ACCESS_TOKEN = jwt.sign({
        sub: user._id,
        rol: user.role,
        type: 'ACCESS_TOKEN'
    },
        TOKEN_SECRET_JWT, {
        expiresIn: 120
    });
    const REFRESH_TOKEN = jwt.sign({
        sub: user._id,
        rol: user.role,
        type: 'REFRESH_TOKEN'
    },
        TOKEN_SECRET_JWT, {
        expiresIn: 480
    });
    return {
        accessToken: ACCESS_TOKEN,
        refreshToken: REFRESH_TOKEN
    }
}

const authController = {
    getLoginView: async (req, res) => {
        res.render('sign', { flag: "sign-in" });
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
            // const hashedPassword = await bcrypt.hash(password, 10);

            // create new user
            const user = new User({
                firstname,
                lastname,
                email,
                phone,
                address,
                username,
                // password: hashedPassword,
                password,
            });

            await user.save();

            res.render('sign', { flag: "sign-in", created: true });
            // res.status(200).json({ status: `Account created.` })
        } catch (error) {
            res.status(500).json({ error: "Register error: " + error });
        }
    },

    signIn: async (req, res) => {
        try {
            const { username, password } = req.body;

            // const user = await User.findOne({ username });
            const user = await User.findOne({ username: username, password: password });

            // check if user exists
            if (!user) {
                return res.status(400).json({ error: 'Cannot find an account with that username and password' });
            }

            // // compare passwords
            // const passwordMatch = await bcrypt.compare(password, user.password);

            // // check password
            // if (!passwordMatch) {
            //     return res.status(400).json({ error: 'Cannot find an account with that username and password' });
            // }

            // NORMALNIE BYŚMY UŻYWALI TOKENÓW JWT
            // res.json(generateTokens(req, user));

            const query = `?username=${username}&password=${password}`;
            if (user.role === "user") {
                res.redirect("/" + query);
            } else if (user.role === "admin") {
                res.redirect("/admin" + query);
            }
            // return res.status(200).json({ error: 'User with this email and password exists' });
        } catch (error) {
            res.status(500).json({ error: 'Sign in error: ' + error });
        }
    },

    accessTokenVerifyAdmin: async (req, res, next) => {
        if (!req.headers.authorization) {
            return res.status(401).json({
                error: 'Token is missing'
            });
        }
        const BEARER = 'Bearer'
        const AUTHORIZATION_TOKEN = req.headers.authorization.split(' ')
        if (AUTHORIZATION_TOKEN[0] !== BEARER) {
            return res.status(401).json({
                error: "Token is not complete"
            })
        }
        jwt.verify(AUTHORIZATION_TOKEN[1], TOKEN_SECRET_JWT, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    error: "Token is invalid"
                });
            }

            if (decoded.rol !== 'admin') {
                return res.status(403).json({
                    error: 'User is not authorized'
                });
            }

            next();
        });
    },

    accessTokenVerify: async (req, res, next) => {
        if (!req.headers.authorization) {
            return res.status(401).json({
                error: 'Token is missing'
            });
        }
        const BEARER = 'Bearer'
        const AUTHORIZATION_TOKEN = req.headers.authorization.split(' ')
        if (AUTHORIZATION_TOKEN[0] !== BEARER) {
            return res.status(401).json({
                error: "Token is not complete"
            })
        }
        jwt.verify(AUTHORIZATION_TOKEN[1], TOKEN_SECRET_JWT, (err) => {
            if (err) {
                return res.status(401).json({
                    error: "Token is invalid"
                });
            }
            next();
        });
    },

    refreshTokenVerify: (req, res, next) => {
        if (!req.body.refreshToken) {
            res.status(401).json({
                message: "Token refresh is missing"
            })
        }
        const BEARER = 'Bearer'
        const REFRESH_TOKEN = req.body.refreshToken.split(' ')
        if (REFRESH_TOKEN[0] !== BEARER) {
            return res.status(401).json({
                error: "Token is not complete"
            })
        }
        jwt.verify(REFRESH_TOKEN[1], TOKEN_SECRET_JWT, function (err, payload) {
            if (err) {
                return res.status(401).json({
                    error: "Token refresh is invalid"
                });
            }
            User.findById(payload.sub, function (err, user) {
                if (!user) {
                    return res.status(401).json({
                        error: 'User not found'
                    });
                }
                return res.json(generateTokens(req, user));
            });
        });
    },
};

export default authController;