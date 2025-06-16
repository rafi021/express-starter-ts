import Joi from "joi";

export const userSchemaCreate = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    avatar: Joi.string().optional()
});