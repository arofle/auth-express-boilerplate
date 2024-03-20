import User from "../models/userModel.js";
import Response from "../utils/Response.js";
import ServerError from "../utils/ServerError.js";
import { comparePasswords, hashPassword } from "../utils/passwordHashing.js";
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { sendRegistrationVerificationEmail } from "../utils/mail/mailEngine.js";
import sequelize from "../db/db.js";

export async function registerUser(req, res) {
    const transaction = await sequelize.transaction()

    try {
        const { email, password } = req.body;
        const stringForRegistrationConfirmation = crypto.randomBytes(64).toString('hex')
        const hashedPassword = await hashPassword(password)

        await User.create({
            email: email,
            password: hashedPassword,
            stringForRegistrationConfirmation: stringForRegistrationConfirmation,
        }, { transaction });

        await sendRegistrationVerificationEmail(email, stringForRegistrationConfirmation)

        await transaction.commit()

        new Response(res, 201, { msg: 'A verification code has been sent to your email' });
    } catch (err) {
        await transaction.rollback()
        if (err.name == "SequelizeUniqueConstraintError" || err.name == "SequelizeValidationError") {
            new Response(res, 400, err.errors[0].message)
        } else {
            new ServerError(res, err)
        }
    }

};

export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            return new Response(res, 400, 'Invalid email or password')
        }

        const hashedPassword = user.dataValues.password
        const isTruePassword = await comparePasswords(password, hashedPassword)

        if (!isTruePassword) {
            return new Response(res, 400, 'Invalid email or password')
        }

        if (!user.emailConfirmed) {
            return new Response(res, 403, 'Confirm your email before login, following a link that was sent to your email')
        }

        const userId = user.dataValues.id
        const token = jwt.sign({ userId: userId }, process.env.SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION });

        await user.update({ refreshToken: token, emailConfirmed: true })

        new Response(res, 200, { token: token })
    } catch (err) {
        throw new ServerError(res, err)
    }
};

export async function confirmEmail(req, res) {
    try {
        const stringForRegistrationConfirmation = req.params.str

        const user = await User.findOne({ where: { stringForRegistrationConfirmation } })

        if (!user) {
            return new Response(res, 400, 'Invalid email confirmation string')
        }

        if (user.emailConfirmed) {
            return new Response(res, 400, 'Email already confirmed')
        }

        user.update({ emailConfirmed: true })

        new Response(res, 200, "Email successfully confirmed")
    } catch (error) {
        new ServerError(res, error)
    }
}


export async function refreshAccessToken(req, res) {
    try {
        const userId = req.token.userId
        const newRefreshToken = jwt.sign({ userId }, process.env.SECRET)
        await User.update({ refreshToken: newRefreshToken }, { where: { id: userId } })

        new Response(res, 200, { token: newRefreshToken })
    } catch (err) {
        if (err.name == 'JsonWebTokenError') {
            new Response(res, 401, 'JWT is not valid')
        } else if (err.name == 'TokenExpiredError') {
            new Response(res, 401, 'JWT is expired')
        } else {
            throw new ServerError(res, err)
        }

    }
};


