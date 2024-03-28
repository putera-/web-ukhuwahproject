// const istruthy = Joi.boolean().truthy();
// const isID = Joi.number().positive().required();

// istruthy,
// isID,
import Joi from 'joi';

const isEmail = Joi.string().email({ tlds: { allow: false } }).max(100).trim().label("Email");
const isPassword = Joi.string().min(6).max(100).trim().label("Password");
const isString = Joi.string().min(1).max(100).trim();
const isURL = Joi.string().trim().uri();
const isText = Joi.string().trim();

export {
    isEmail,
    isPassword,
    isString,
    isText,
    isURL
};
