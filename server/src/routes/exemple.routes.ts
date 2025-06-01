import express from "express";
import exemple from "../controllers/exemple.controller";
import {
    createExempleValidationRules,
    validate,
} from "../middlewares/exemple-validation";

const router = express.Router();

router.get("/", exemple.getAllForms);
router.post("/", createExempleValidationRules, validate, exemple.createExemple);
// other routes, patch delete etc

export default router;
