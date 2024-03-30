import Joi from "joi"
export const isUpdateclient = Joi.object({
    name: isString.min(1).max(255).required().label("Nama"),
    nick: isString.min(1).max(20).required().label("Singkatan"),
    slogan: isString.allow(null, '').max(100).label("Slogan"),
    phone: isPhone.allow(null, '').label("No Telpon"),
    youtube: isURLText.allow(null, '').label("Youtube"),
    instagram: isURLText.allow(null, '').label("Instagram"),
    facebook: isURLText.allow(null, '').label("Facebook"),
    twitter: isURLText.allow(null, '').label("Twitter")
});