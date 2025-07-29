import { userController } from "./userController.js";
import { Request, Response } from "express";

// Mock the userService module that the controller imports
jest.mock("./userService", () => ({
    userService: {
        getUserById: jest.fn(),
        createUser: jest.fn(),
    },
}));

// Import the mocked service to access the mock functions
import { userService } from "./userService.js";

describe("userController", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        req = {
            params: {},
            body: {},
        };

        res = {
            json: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis(),
        };
    });

    describe("getUser", () => {
        it("should return user when found", async () => {
            // Arrange
            const userId = 1;
            const mockUser = { id: 1, name: "John Doe" };

            req.params = { id: userId.toString() };
            (userService.getUserById as jest.Mock).mockResolvedValue(mockUser);

            // Act
            await userController.getUser(req as Request, res as Response);

            // Assert
            expect(userService.getUserById).toHaveBeenCalledWith(userId);
            expect(res.json).toHaveBeenCalledWith(mockUser);
        });

        it("should return 404 when user not found", async () => {
            // Arrange
            req.params = { id: "999" };
            (userService.getUserById as jest.Mock).mockRejectedValue(
                new Error("User not found")
            );

            // Act
            await userController.getUser(req as Request, res as Response);

            // Assert
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
        });

        it("should return 500 on unexpected error", async () => {
            // Arrange
            req.params = { id: "1" };
            (userService.getUserById as jest.Mock).mockRejectedValue(
                new Error("DB error")
            );

            // Act
            await userController.getUser(req as Request, res as Response);

            // Assert
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                error: "Internal server error",
            });
        });
    });

    describe("createUser", () => {
        it("should return 201 and created user", async () => {
            // Arrange
            const newUser = { name: "Alice" };
            const createdUser = { id: 1, name: "Alice" };

            req.body = newUser;
            (userService.createUser as jest.Mock).mockResolvedValue(
                createdUser
            );

            // Act
            await userController.createUser(req as Request, res as Response);

            // Assert
            expect(userService.createUser).toHaveBeenCalledWith(newUser);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(createdUser);
        });

        it("should return 400 on creation error", async () => {
            // Arrange
            req.body = { name: "" };
            (userService.createUser as jest.Mock).mockRejectedValue(
                new Error("Invalid input")
            );

            // Act
            await userController.createUser(req as Request, res as Response);

            // Assert
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "Invalid input" });
        });
    });
});
