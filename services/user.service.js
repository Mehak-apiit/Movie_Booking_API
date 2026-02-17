import User from '../models/user.model.js';
import bcrypt from "bcryptjs";
const createUser = async (data) => {
    try {
        const hashpassword = bcrypt.hashSync(data.password, 10);
        data.password = hashpassword;
        const response = await User.create(data);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        if (error.name == 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            throw { err: err, code: 422 };
        }
        throw error;
    }
}
export default createUser;
