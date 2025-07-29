import {
    getAllTierLists,
    getTierListById,
    createTierList,
    removeTierListById,
    updateTierListById,
} from "./tierLists.controller.js";
import { NextFunction, Request, Response } from "express";

jest.mock("../models/tierLists.model.js", () => ({
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
import {
    CompleteTierList,
    NewTierList,
    PartialCompleteTierList,
} from "../types/tierLists.js";

describe("getAllTierLists", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {};
        res = {
            json: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis(),
        };
        next = jest.fn() as NextFunction;
        jest.clearAllMocks();
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
        (findAllTierLists as jest.Mock).mockResolvedValue(mockTierlists);

        // Act
        await getAllTierLists(req as Request, res as Response, next);

        // Assert
        expect(findAllTierLists).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockTierlists);
    });

    it("should call the error handling middleware", async () => {
        // Arrange
        const mockError = new Error("Database connection failed");
        (findAllTierLists as jest.Mock).mockRejectedValue(mockError);

        // Act
        await getAllTierLists(req as Request, res as Response, next);

        // Assert
        expect(findAllTierLists).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(mockError);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
});

describe("getTierListById", () => {
    let req: Request<{ id: string }>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {
            params: { id: "" },
        } as Request<{ id: string }>;
        res = {
            json: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis(),
        };
        next = jest.fn() as NextFunction;
        jest.clearAllMocks();
    });

    it("should return tierlist when found", async () => {
        // Arrange
        const tierlistId = "1";
        const mockTierlist = [
            {
                tierlist_id: 1,
                title: "First tierlist",
                creation_date: "2024-07-18T15:30:00Z",
                listitem_id: 1,
                option_value: "High-rated option",
            },
            {
                tierlist_id: 1,
                title: "First tierlist",
                creation_date: "2024-07-18T15:30:00Z",
                listitem_id: 2,
                option_value: "Middle-rated option",
            },
            {
                tierlist_id: 1,
                title: "First tierlist",
                creation_date: "2024-07-18T15:30:00Z",
                listitem_id: 3,
                option_value: "Low-rated option",
            },
        ];
        const expectedResponse = {
            tierlist_id: 1,
            title: "First tierlist",
            creation_date: "2024-07-18T15:30:00Z",
            listItems: [
                {
                    listitem_id: 1,
                    option_value: "High-rated option",
                    tierlist_id: 1,
                },
                {
                    listitem_id: 2,
                    option_value: "Middle-rated option",
                    tierlist_id: 1,
                },
                {
                    listitem_id: 3,
                    option_value: "Low-rated option",
                    tierlist_id: 1,
                },
            ],
        };
        req.params.id = tierlistId;
        (findTierListById as jest.Mock).mockResolvedValue(mockTierlist);

        // Act
        await getTierListById(req, res as Response, next);

        // Assert
        expect(findTierListById).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });

    it("should return 400 for invalid ID", async () => {
        // Arrange
        req.params.id = "invalid";

        // Act
        await getTierListById(req, res as Response, next);

        // Assert
        expect(findTierListById).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "ID invalid" });
    });

    it("should return 404 when tierlist not found", async () => {
        // Arrange
        req.params.id = "999";
        (findTierListById as jest.Mock).mockResolvedValue(null);

        // Act
        await getTierListById(req, res as Response, next);

        // Assert
        expect(findTierListById).toHaveBeenCalledWith(999);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: "Tier list not found" });
    });

    it("should call error handling middleware on remaining errors", async () => {
        // Arrange
        const mockError = new Error("Error");
        req.params.id = "1";
        (findTierListById as jest.Mock).mockRejectedValue(mockError);

        // Act
        await getTierListById(req, res as Response, next);

        // Assert
        expect(findTierListById).toHaveBeenCalledWith(1);
        expect(next).toHaveBeenCalledWith(mockError);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
});

describe("createTierList", () => {
    // Arrange
    let req: Request<any, CompleteTierList | { error: string }, NewTierList>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {
            body: {
                title: "XXXXX tierlist",
                listItems: [
                    { option_value: "1" },
                    { option_value: "2" },
                    { option_value: "3" },
                ],
            },
        } as Request;
        res = {
            json: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis(),
        };
        next = jest.fn() as NextFunction;
        jest.clearAllMocks();
    });

    it("Should return Tierlist when created", async () => {
        // Arrange
        const mockTierlist = [
            {
                tierlist_id: 1,
                title: "XXXXX tierlist",
                creation_date: "2024-07-21T15:30:00Z",
                listitem_id: 1,
                option_value: "1",
            },
            {
                tierlist_id: 1,
                title: "XXXXX tierlist",
                creation_date: "2024-07-21T15:30:00Z",
                listitem_id: 2,
                option_value: "2",
            },
            {
                tierlist_id: 1,
                title: "XXXXX tierlist",
                creation_date: "2024-07-21T15:30:00Z",
                listitem_id: 3,
                option_value: "3",
            },
        ];
        const expectedResponse = {
            tierlist_id: 1,
            title: "XXXXX tierlist",
            creation_date: "2024-07-21T15:30:00Z",
            listItems: [
                {
                    listitem_id: 1,
                    option_value: "1",
                    tierlist_id: 1,
                },
                {
                    listitem_id: 2,
                    option_value: "2",
                    tierlist_id: 1,
                },
                {
                    listitem_id: 3,
                    option_value: "3",
                    tierlist_id: 1,
                },
            ],
        };
        (insertTierList as jest.Mock).mockResolvedValue(mockTierlist);

        // Act
        await createTierList(req, res as Response, next);

        // Assert
        expect(insertTierList).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expectedResponse);
        expect(next).not.toHaveBeenCalled();
    });

    it("should return 404 when tierlist not found", async () => {
        // Arrange
        (insertTierList as jest.Mock).mockResolvedValue(null);

        // Act
        await createTierList(req, res as Response, next);

        // Assert
        expect(insertTierList).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: "Tier list not found" });
        expect(next).not.toHaveBeenCalled();
    });

    it("should call error handling middleware on remaining errors", async () => {
        // Arrange
        const mockError = new Error("Error");
        (insertTierList as jest.Mock).mockRejectedValue(mockError);

        // Act
        await createTierList(req, res as Response, next);

        // Assert
        expect(insertTierList).toHaveBeenCalledWith(req.body);
        expect(next).toHaveBeenCalledWith(mockError);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalledWith();
    });
});

describe("removeTierListById", () => {
    let req: Request<{ id: string }>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {
            params: { id: "" },
        } as Request<{ id: string }>;
        res = {
            json: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis(),
            sendStatus: jest.fn(),
        };
        next = jest.fn() as NextFunction;
        jest.clearAllMocks();
    });

    it("should return 204 when tierlist is deleted", async () => {
        // Arrange
        req.params.id = "1";
        const mockAffectedRows = 1;
        (deleteTierList as jest.Mock).mockResolvedValue(mockAffectedRows);

        // Act
        await removeTierListById(req, res as Response, next);

        // Assert
        expect(deleteTierList).toHaveBeenCalledWith(1);
        expect(res.sendStatus).toHaveBeenCalledWith(204);
        expect(next).not.toHaveBeenCalled();
    });

    it("should return 400 for invalid ID type", async () => {
        // Arrange
        req.params.id = "abcd";

        // Act
        await removeTierListById(req, res as Response, next);

        // Assert
        expect(deleteTierList).not.toHaveBeenCalledWith();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenLastCalledWith({ error: "ID invalid" });
        expect(next).not.toHaveBeenCalled();
    });

    it("Should return 404 when tierlist not found", async () => {
        // Arrange
        req.params.id = "1";
        const mockAffectedRows = 0;
        (deleteTierList as jest.Mock).mockResolvedValue(mockAffectedRows);

        // Act
        await removeTierListById(req, res as Response, next);

        // Assert
        expect(deleteTierList).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            error: "Tier list not found",
        });
        expect(next).not.toHaveBeenCalled();
    });

    it("should call error handling middleware on remaining errors", async () => {
        // Arrange
        const mockError = new Error("Error");
        req.params.id = "1";
        (deleteTierList as jest.Mock).mockRejectedValue(mockError);

        // Act
        await removeTierListById(req, res as Response, next);

        // Assert
        expect(deleteTierList).toHaveBeenCalledWith(1);
        expect(next).toHaveBeenCalledWith(mockError);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
});

describe("updateTierListById", () => {
    let req: Request<
        { id: string },
        CompleteTierList | { error: string },
        PartialCompleteTierList
    >;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {
            params: { id: "1" },
            body: {
                title: "XXXXX tierlist",
                listItems: [
                    { option_value: "1" },
                    { option_value: "2" },
                    { option_value: "3" },
                ],
            },
        } as Request<
            { id: string },
            CompleteTierList | { error: string },
            PartialCompleteTierList
        >;
        res = {
            json: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis(),
        };
        next = jest.fn() as NextFunction;
        jest.clearAllMocks();
    });

    it("should return tierlist when updated", async () => {
        // Arrange
        const mockTierlist = [
            {
                tierlist_id: 1,
                title: "XXXXX tierlist",
                creation_date: "2024-07-21T15:30:00Z",
                listitem_id: 1,
                option_value: "1",
            },
            {
                tierlist_id: 1,
                title: "XXXXX tierlist",
                creation_date: "2024-07-21T15:30:00Z",
                listitem_id: 2,
                option_value: "2",
            },
            {
                tierlist_id: 1,
                title: "XXXXX tierlist",
                creation_date: "2024-07-21T15:30:00Z",
                listitem_id: 3,
                option_value: "3",
            },
        ];
        const expectedResponse = {
            tierlist_id: 1,
            title: "XXXXX tierlist",
            creation_date: "2024-07-21T15:30:00Z",
            listItems: [
                {
                    listitem_id: 1,
                    option_value: "1",
                    tierlist_id: 1,
                },
                {
                    listitem_id: 2,
                    option_value: "2",
                    tierlist_id: 1,
                },
                {
                    listitem_id: 3,
                    option_value: "3",
                    tierlist_id: 1,
                },
            ],
        };
        (updateTierList as jest.Mock).mockResolvedValue(mockTierlist);

        // Act
        await updateTierListById(req, res as Response, next);

        // Assert
        expect(updateTierList).toHaveBeenCalledWith({
            tierlist_id: 1,
            title: req.body.title,
            listItems: req.body.listItems,
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expectedResponse);
        expect(next).not.toHaveBeenCalled();
    });

    it("Should return 404 when tierlist not found", async () => {
        // Arrange
        (updateTierList as jest.Mock).mockResolvedValue(null);

        // Act
        await updateTierListById(req, res as Response, next);

        // Assert
        expect(updateTierList).toHaveBeenCalledWith({
            tierlist_id: 1,
            title: req.body.title,
            listItems: req.body.listItems,
        });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: "Tier list not found" });
        expect(next).not.toHaveBeenCalled();
    });

    it("should call error handling middleware on remaining errors", async () => {
        // Arrange
        const mockError = new Error("Error");
        (updateTierList as jest.Mock).mockRejectedValue(mockError);

        // Act
        await updateTierListById(req, res as Response, next);

        // Assert
        expect(updateTierList).toHaveBeenCalledWith({
            tierlist_id: 1,
            title: req.body.title,
            listItems: req.body.listItems,
        });
        expect(next).toHaveBeenCalledWith(mockError);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
});
