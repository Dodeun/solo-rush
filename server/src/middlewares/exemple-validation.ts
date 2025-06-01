import { RequestHandler } from "express";
import { body, validationResult } from "express-validator";

// Validation rules for the createExemple route
export const createExempleValidationRules = [
    body("message")
        .notEmpty()
        .withMessage("Champ message requis")
        .isLength({ max: 100 }),
];

// Middleware used after input validations that returns an array of errors if there are any
export const validate: RequestHandler = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
};
