export default class UserServiceException extends Error {
    constructor(err) {
        super(err.message)
    }
}