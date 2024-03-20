import UserServiceException from "../exceptions/UserServiceException.js"
import User from "../models/userModel.js"
import { comparePasswords } from "../utils/passwordHashing.js"

export async function verifyUserPassword(userId, password) {
    try {
        const user = await User.findByPk(userId)
        const isPasswordValid = await comparePasswords(password, user.dataValues.password)
        return isPasswordValid
    } catch (err) {
        throw new UserServiceException(err)
    }
}