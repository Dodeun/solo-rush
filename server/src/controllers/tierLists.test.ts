import {
	getAllTierLists,
	getTierListById,
	createTierList,
	removeTierListById,
	updateTierListById,
} from "./tierLists.controller.js";

import { NextFunction, Request, Response } from "express";

jest.mock("../models/tierLists.model.ts", () => ({
	findAllTierLists: jest.fn(),
	findTierListById: jest.fn(),
	insertTierList: jest.fn(),
	deleteTierList: jest.fn(),
	updateTierList: jest.fn(),
}));

import {
	findAllTierLists,
	findTierListById,
	insertTierList,
	deleteTierList,
	updateTierList,
} from "../models/tierLists.model.js";

describe("getAllTierLists", () => {
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

	it("should return all tier lists when found", async () => {
		// Arrange
		const mockTierlists = [
			{
				tierlist_id: 1,
				title: "First tierlist",
				creation_date: "2024-07-18T15:30:00Z",
			},
			{
				tierlist_id: 2,
				title: "Second tierlist",
				creation_date: "2025-07-18T15:30:00Z",
			},
			{
				tierlist_id: 6,
				title: "Sixth tierlist",
				creation_date: "2025-07-18T15:30:00Z",
			},
		];

		(findAllTierLists as jest.Mock).mockRejectedValue(mockTierlists);

		// Act
		await getAllTierLists(
			req as Request,
			res as Response,
			next as NextFunction
		);
	});
});
