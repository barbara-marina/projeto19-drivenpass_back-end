import Joi from "joi";

const wifiSchema = Joi.object({
    lable: Joi.string().required(),
    network: Joi.string().required(),
    password: Joi.string().required(),
});

export default wifiSchema;