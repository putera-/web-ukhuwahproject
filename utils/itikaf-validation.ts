import Joi from "joi"
export const isJoinItikaf = Joi.object({
    "man": Joi.number().min(0),
    "woman": Joi.number().min(0),
    "vehicle_type": isString.valid('Motor', 'Mobil', ''),
    "vehicle_no": isString.allow('')
});

export const isItikaf = Joi.object({
    masjid: isString.allow(''),
    address: isString.allow(''),
    contact_person_name: isString.allow(''),
    contact_person_phone: isPhone.allow(''),
    description: isString
});

export const isScheduleItikaf = Joi.object({
    date: Joi.date().required().label('Tanggal'),
    day_index: Joi.number().min(1).required().label('Urutan Hari'),
    description: isString.required().label('Deskripsi')
});