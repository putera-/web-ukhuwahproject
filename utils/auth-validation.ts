import Joi from "joi"
export const isLogin = Joi.object({
    email: isEmail.required(),
    password: isPassword.required()
});

export const isRegister = Joi.object({
    name: isString.required(),
    email: isEmail.required(),
    phone: isPhone.required(),
    password: isPassword.required(),
    confirm_password: isPassword.required()
        .valid(Joi.ref('password'))
        .label('Password Confirm')
        .options({
            messages: {
                'any.only': '{{#label}} is not match'
            }
        })
});

export const changePassword = Joi.object({
    old_password: isPassword.required().label('Password'),
    password: isPassword.required().label('Password'),
    confirm_password: isPassword.required()
        .valid(Joi.ref('password'))
        .label('Password Confirm')
        .options({
            messages: {
                'any.only': '{{#label}} is not match'
            }
        })
});