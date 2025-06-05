import express from "express";
import {
    createTierList,
    getAllTierLists,
    getTierListById,
    removeTierListById,
} from "../controllers/tierLists.controller";

const router = express.Router();

router.get("/", getAllTierLists);
router.get("/:id", getTierListById);
router.post("/", createTierList);
router.delete("/:id", removeTierListById);

export default router;
