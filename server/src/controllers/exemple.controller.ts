import type { Request, RequestHandler, Response, NextFunction } from "express";
import exempleModel from "../models/exemple.model";
import { Exemple } from "../types/exemple";

// The B of BREAD - Browse (Read All) operation
const getAllForms: RequestHandler = async (req, res, next) => {
    try {
        const forms = await exempleModel.findAllExemple();
        res.json(forms);
    } catch (err) {
        next(err);
    }
};

// The R of BREAD - Read operation

// The E of BREAD - Edit operation

// The A of BREAD - Add operation

const createExemple: RequestHandler = async (
    req: Request<{}, {}, Exemple>,
    res: Response<Exemple | { error: string }>,
    next: NextFunction
) => {
    console.log("Body:", req.body);
    const { message } = req.body;

    try {
        const newExemple = await exempleModel.insertExemple({ message });
        console.log("New Message:", newExemple);
        res.status(201).json(newExemple);
    } catch (err) {
        if (err.code === "ER_DUP_ENTRY") {
            // Format doesnt match express-validator errors
            res.status(409).json({
                error: `Adresse mail déjà utilisée`,
            });
            return;
        }
        next(err);
    }
};

// The D of BREAD - Delete operation

export default { getAllForms, createExemple };
