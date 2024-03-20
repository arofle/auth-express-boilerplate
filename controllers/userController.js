import User from "../models/userModel.js";
import { verifyUserPassword } from "../services/userService.js";
import Response from "../utils/Response.js";
import ServerError from "../utils/ServerError.js";
import { hashPassword } from "../utils/passwordHashing.js";

export async function changeUserPassword(req, res) {
    try {
        const userId = req.token.userId
        const { password, new_password } = req.body

        const isPasswordValid = await verifyUserPassword(userId, password)
        if (!isPasswordValid) {
            return new Response(res, 400, "Password is not valid")
        }

        const newHashedPassword = await hashPassword(new_password)
        await User.update({ password: newHashedPassword }, { where: { id: userId } })

        return new Response(res, 200, "Password updated")
    } catch (err) {
        throw new ServerError(res, err)
    }
};


export async function deleteUser(req, res) {
    try {
        const userId = req.token.userId
        const { email, password } = req.body

        const user = await User.findOne({ where: { id: userId, email: email } })
        if (!user) {
            return new Response(res, 200, "Provided email doesn't belong to authenticated user")
        }

        const isPasswordValid = await verifyUserPassword(userId, password)
        if (!isPasswordValid) {
            return new Response(res, 400, "Password is not valid")
        }

        await user.destroy()
        new Response(res, 200, "User deleted")
    } catch (err) {
        throw new ServerError(res, err)
    }
};

export async function getMe(req, res, next) {
    const user = req.token

    new Response(res, 200, user)
}
