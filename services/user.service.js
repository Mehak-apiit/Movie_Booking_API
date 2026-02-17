import User from '../models/user.model.js';
import bcrypt from "bcryptjs";
import { USER_ROLE, USER_STATUS } from '../utils/constants.js';
const createUser = async (data) => {
    try {
        if (!data.userRole || data.userRole == USER_ROLE.customer) {
            if (data.userStatus && data.userStatus != USER_STATUS.approved) {
                throw {
                    err: "We cannot set any other status for customer",
                    code: 400
                }
            }
            if(data.userRole && data.userRole != USER_ROLE.customer){
                data.userStatus = USER_STATUS.pending;
            }
        }
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
