import { Request, Response } from "express";

interface userRequest extends Request {
    params: { id: string };
    userService: any;
}

export const userController = {
    async getUser(req: userRequest, res: Response) {
        try {
            const { id } = req.params;
            const user = await req.userService.getUserById(parseInt(id));
            res.json(user);
        } catch (error) {
            if (error.message === "User not found") {
                return res.status(404).json({ error: "User not found" });
            }
            res.status(500).json({ error: "Internal server error" });
        }
    },

    async createUser(req: userRequest, res: Response) {
        try {
            const user = await req.userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
};
