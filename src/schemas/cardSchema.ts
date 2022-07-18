import Joi from "joi";
import DateExtension from "@joi/date";
import JoiImport from "joi";

const joiDate = JoiImport.extend(DateExtension) as typeof JoiImport;

const cardSchema = Joi.object({
    label: Joi.string().required(),
    number: Joi.string().creditCard().required(),
    name: Joi.string().required(),
    cvv: Joi.string().max(3).min(3).required(),
    expirationDate: joiDate.date().format('MM/YY').required(),
    password: Joi.number().min(4).required(),
    isVirtual: Joi.boolean().required(),
    type: Joi.valid('credit', 'debit', 'both').required(),
});

export default cardSchema;
