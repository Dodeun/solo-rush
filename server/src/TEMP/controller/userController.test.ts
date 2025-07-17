import { userController } from "./userController.js";
// import { Request, Response } from "express";

describe("userController", () => {
    let req, res, mockUserService;

    beforeEach(() => {
        mockUserService = {
            getUserById: jest.fn(),
            createUser: jest.fn(),
        };

        req = {
            params: {},
            body: {},
            userService: mockUserService,
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
            req.params.id = userId.toString();
            mockUserService.getUserById.mockResolvedValue(mockUser);

            // Act
            await userController.getUser(req, res);

            // Assert
            expect(mockUserService.getUserById).toHaveBeenCalledWith(userId);
            expect(res.json).toHaveBeenCalledWith(mockUser);
        });

        it("should return 404 when user not found", async () => {
            // Arrange
            req.params.id = "999";
            mockUserService.getUserById.mockRejectedValue(
                new Error("User not found")
            );

            // Act
            await userController.getUser(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
        });

        it("should return 500 for other errors", async () => {
            // Arrange
            req.params.id = "1";
            mockUserService.getUserById.mockRejectedValue(
                new Error("Database error")
            );

            // Act
            await userController.getUser(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                error: "Internal server error",
            });
        });
    });
});
