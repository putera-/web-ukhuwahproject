import Joi from "joi"
export const isJoinItikaf = Joi.object({
    "man": Joi.number().min(0),
    "woman": Joi.number().min(0),
    "vehicle_type": isString.valid('Motor', 'Mobil', ''),
    "vehicle_no": isString.allow('')
});

export const isItikaf = Joi.object({
    contact_person_name: isString.allow(''),
    contact_person_phone: isPhone.allow(''),
    description: isString
})
