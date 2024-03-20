import Response from '../utils/Response.js';
import ServerError from '../utils/ServerError.js';
import getTokenFromHeaders from '../utils/token.js';
import jwt from 'jsonwebtoken'

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = getTokenFromHeaders(req)

        if (!token) {
            return new Response(res, 401, 'You are not logged in. Provide bearer token in authorization header')
        }
        const payload = jwt.verify(token, process.env.SECRET)
        req.token = payload
        next()
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