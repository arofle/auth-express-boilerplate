import Response from "../utils/Response.js";
import ServerError from "../utils/ServerError.js";

export default function validateDTOjoi(joiObject) {
    return (req, res, next) => {
        try {
            let respObj = joiObject.validate(req.body, { abortEarly: false });

            if (!respObj['error']) {
                next()
                return
            }

            //deleting not desirable json fields
            delete respObj.error._original
            respObj.error.details.filter(errObj => {
                delete errObj.path
                delete errObj.context
                delete errObj.type
            })
            respObj['errors'] = respObj.error.details
            delete respObj.error
            new Response(res, 422, respObj)
        } catch (error) {
            new ServerError(res, error)
        }
    };
}
