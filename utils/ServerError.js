
export default class ServerError extends Error {
    constructor(res, err) {
        super(err.message);
        console.error(err)
        res.status(500).send('Internal server error')
    }
}