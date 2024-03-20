
export default class Response {
    constructor(res, status, messageOrObj) {
        if (typeof messageOrObj === 'object') {
            res.status(status).json(messageOrObj)
        } else {
            res.status(status).json({ 'msg': messageOrObj })
        }
    }
}