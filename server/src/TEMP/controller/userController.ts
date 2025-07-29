import { Request, Response } from "express";
import { userService } from "./userService.js";

export const userController = {
    async getUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await userService.getUserById(parseInt(id));
            res.json(user);
        } catch (error: any) {
            if (error.message === "User not found") {
                return res.status(404).json({ error: "User not found" });
            }
            res.status(500).json({ error: "Internal server error" });
        }
    },

    async createUser(req: Request, res: Response) {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    },
};
