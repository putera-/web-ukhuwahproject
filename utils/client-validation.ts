import Joi from "joi"
export const isUpdateclient = Joi.object({
    name: isString.min(1).max(255).required().label("Nama"),
    nick: isString.min(1).max(20).required().label("Singkatan"),
    slogan: isString.allow(null, '').max(100).label("Slogan"),
    phone: isPhone.allow(null, '').label("No Telpon"),
    youtube: Joi.string().trim().max(100).allow(null, '').label("Youtube"),
    instagram: Joi.string().trim().max(100).allow(null, '').label("Instagram"),
    facebook: Joi.string().trim().max(100).allow(null, '').label("Facebook"),
    twitter: Joi.string().trim().max(100).allow(null, '').label("Twitter")
});