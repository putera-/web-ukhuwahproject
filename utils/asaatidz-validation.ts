import Joi from 'joi';

export const isAsaatidz = Joi.object({
    name: isString,
    profile: isString
})