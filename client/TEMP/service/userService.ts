import axios from "axios";

interface User {
	[key: string]: any;
}

export class UserService {
	constructor(private apiUrl: string) {
		this.apiUrl = apiUrl;
	}

	async getUserById(id: number): Promise<User> {
		try {
			const response = await axios.get(`${this.apiUrl}/users/${id}`);
			return response.data;
		} catch (error: any) {
			if (error.response?.status === 404) {
				throw new Error("User not found");
			}
			throw new Error("Failed to fetch user");
		}
	}

	async createUser(userData: any): Promise<User> {
		try {
			const response = await axios.post(`${this.apiUrl}/users`, userData);
			return response.data;
		} catch (error: any) {
			throw new Error("Failed to fetch user");
		}
	}
}
