import Joi from "joi"
export const isLogin = Joi.object({
    email: isEmail,
    password: isPassword
})