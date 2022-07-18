import Joi from "joi";

const credentialSchema = Joi.object({
    label: Joi.string().required(),
    url: Joi.string().uri().required(),
    name: Joi.string().required(),
    password: Joi.string().alphanum().required(),
});

export default credentialSchema;