// const istruthy = Joi.boolean().truthy();
// const isID = Joi.number().positive().required();

// istruthy,
// isID,
import Joi from 'joi';

const phoneRegex = /^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/;

const isEmail = Joi.string().email({ tlds: { allow: false } }).max(100).trim().label("Email");
const isPassword = Joi.string().min(6).max(100).trim().label("Password");
const isString = Joi.string().min(1).max(100).trim();
const isURLText = Joi.string().trim().uri();
const isText = Joi.string().trim();
const isPhone = Joi.string().trim().min(10).regex(phoneRegex).message("Invalid phone number").label('Nomor Telpon');

export {
    isEmail,
    isPassword,
    isString,
    isText,
    isURLText,
    isPhone
};
