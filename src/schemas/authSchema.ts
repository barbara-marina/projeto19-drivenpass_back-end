import Joi from "joi";

const authSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).alphanum().required(),
});

export default authSchema;