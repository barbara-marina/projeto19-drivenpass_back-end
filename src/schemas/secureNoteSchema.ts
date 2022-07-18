import Joi from "joi";

const secureNoteSchema = Joi.object({
    title: Joi.string().max(50).required(),
    note: Joi.string().max(1000)
});

export default secureNoteSchema;