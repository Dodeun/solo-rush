import express from "express";
import {
	createTierList,
	getAllTierLists,
	getTierListById,
	removeTierListById,
	updateTierListById,
} from "../controllers/tierLists.controller.js";

const router = express.Router();

router.get("/", getAllTierLists);
router.get("/:id", getTierListById);
router.post("/", createTierList);
router.delete("/:id", removeTierListById);
router.put("/:id", updateTierListById);

export default router;
