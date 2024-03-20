
export default function getTokenFromHeaders(req, res, next) {
    let accessToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        accessToken = req.headers.authorization.split(' ')[1];
    }

    if (!accessToken) {
        return null
    }

    return accessToken
}