import createUser from '../services/user.service.js';
import { successResponseBody, errorResponseBody } from '../utils/responsebody.js';
const signup = async (req, res,next) => {
    try {
        const response = await createUser(req.body);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully registration a user";
        return res.status(201).json(successResponseBody);
    } catch (error) {
        console.log(error);
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody);
    }
}
export default signup;