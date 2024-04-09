import Joi from "joi";
const youtubeUrlRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

export const isArticle = Joi.object({
    title: isString.required().label("Judul"),
    content: isText.allow(null, '').label("Konten"),
    youtube: Joi.string().regex(youtubeUrlRegex).allow(null, '').optional().label("Youtube URL")
});