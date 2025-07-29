import axios from "axios";
import { UserService } from "./userService";
import { beforeEach, describe, it, expect, vi } from "vitest";

// Mock axios
vi.mock("axios");
const mockedAxios = vi.mocked(axios, { deep: true });

describe("UserService", () => {
	let userService: UserService;

	beforeEach(() => {
		userService = vi.mocked(new UserService("http://localhost:3000/api"));
		vi.clearAllMocks();
	});

	describe("getUserById", () => {
		it("should return user data when user exists", async () => {
			// Arrange
			const userId = 1;
			const mockUser = {
				id: 1,
				name: "John Doe",
				email: "john@example.com",
			};
			mockedAxios.get.mockResolvedValue({ data: mockUser });

			// Act
			const result = await userService.getUserById(userId);

			// Assert
			expect(result).toEqual(mockUser);
			expect(mockedAxios.get).toHaveBeenCalledWith(
				"http://localhost:3000/api/users/1"
			);
		});

		it('should throw "User not found" when user does not exist', async () => {
			// Arrange
			mockedAxios.get.mockRejectedValue({
				response: { status: 404 },
			});

			// Act & Assert
			await expect(userService.getUserById(999)).rejects.toThrow(
				"User not found"
			);
		});

		it('should throw "Failed to fetch user" for other errors', async () => {
			// Arrange
			mockedAxios.get.mockRejectedValue({
				response: { status: 500 },
			});

			// Act & Assert
			await expect(userService.getUserById(1)).rejects.toThrow(
				"Failed to fetch user"
			);
		});
	});

	describe("createUser", () => {
		it("should create user successfully", async () => {
			// Arrange
			const userData = { name: "Jane Doe", email: "jane@example.com" };
			const mockResponse = { id: 2, ...userData };
			mockedAxios.post.mockResolvedValue({ data: mockResponse });

			// Act
			const result = await userService.createUser(userData);

			// Assert
			expect(result).toEqual(mockResponse);
			expect(mockedAxios.post).toHaveBeenCalledWith(
				"http://localhost:3000/api/users",
				userData
			);
		});
	});
});
