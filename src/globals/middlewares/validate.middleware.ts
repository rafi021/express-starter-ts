import { NextFunction, Request, Response } from "express";
import { Schema, ValidationErrorItem } from "joi";

const formatJoiMessage = (joiMessage: ValidationErrorItem[]) => {
    return joiMessage.map(msgObject => msgObject.message.replace(/['"]+/g, ''));
}

export const validateSchema = (schema: Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const message = formatJoiMessage(error.details);
            // show all validation errors
            res.status(422).json({ error: message });
            return;
        }
        next();
    }
}