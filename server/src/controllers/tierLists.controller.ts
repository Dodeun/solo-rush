import { RequestHandler } from "express";
import {
    CompleteTierList,
    NewTierList,
    RowTierList,
    TierList,
} from "../types/tierLists";
import {
    deleteTierList,
    findAllTierLists,
    findTierListById,
    insertTierList,
    updateTierList,
} from "../models/tierLists.model";

export const getAllTierLists: RequestHandler<undefined, TierList[]> = async (
    req,
    res,
    next
) => {
    try {
        const tierLists: TierList[] = await findAllTierLists();
        console.log(tierLists);
        res.status(200).json(tierLists);
    } catch (err) {
        next(err);
    }
};

export const getTierListById: RequestHandler<
    { id: string },
    CompleteTierList | { error: string }
> = async (req, res, next) => {
    try {
        const parsedId: number = Number.parseInt(req.params.id);
        if (isNaN(parsedId)) {
            res.status(400).json({ error: "ID invalid" });
            return;
        }

        const rowsTierList: RowTierList[] | null = await findTierListById(
            parsedId
        );
        if (!rowsTierList) {
            res.status(404).json({ error: "Tier list not found" });
            return;
        }

        const tierList: CompleteTierList = {
            tierlist_id: rowsTierList[0].tierlist_id,
            title: rowsTierList[0].title,
            creation_date: rowsTierList[0].creation_date,
            listItems: rowsTierList.map((row: RowTierList) => ({
                listitem_id: row.listitem_id,
                option_value: row.option_value,
                tierlist_id: row.tierlist_id,
            })),
        };

        res.status(200).json(tierList);
    } catch (err) {
        next(err);
    }
};

export const createTierList: RequestHandler<
    NewTierList,
    CompleteTierList | { error: string }
> = async (req, res, next) => {
    const { title, listItems } = req.body;

    try {
        const newTierList: RowTierList[] | null = await insertTierList({
            title,
            listItems,
        });
        if (!newTierList) {
            res.status(404).json({ error: "Tier list not found" });
            return;
        }

        const tierList: CompleteTierList = {
            tierlist_id: newTierList[0].tierlist_id,
            title: newTierList[0].title,
            creation_date: newTierList[0].creation_date,
            listItems: newTierList.map((row: RowTierList) => ({
                listitem_id: row.listitem_id,
                option_value: row.option_value,
                tierlist_id: row.tierlist_id,
            })),
        };
        res.status(201).json(tierList);
    } catch (err) {
        next(err);
    }
};

export const removeTierListById: RequestHandler<
    { id: string },
    { error: string }
> = async (req, res, next) => {
    try {
        const parsedId = Number.parseInt(req.params.id);
        if (isNaN(parsedId)) {
            res.status(400).json({ error: "ID invalid" });
            return;
        }
        const deletedRows = await deleteTierList(parsedId);
        if (deletedRows === 0) {
            res.status(404).json({ error: "Tier list not found" });
            return;
        }
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
};

export const updateTierListById: RequestHandler = async (req, res, next) => {
    const parsedId: number = Number.parseInt(req.params.id);
    const { title, listItems } = req.body;

    try {
        const updatedTierList: RowTierList[] | null = await updateTierList({
            tierlist_id: parsedId,
            title,
            listItems,
        });

        if (!updatedTierList) {
            res.status(404).json({ error: "Tier list not found" });
            return;
        }

        const tierList: CompleteTierList = {
            tierlist_id: updatedTierList[0].tierlist_id,
            title: updatedTierList[0].title,
            creation_date: updatedTierList[0].creation_date,
            listItems: updatedTierList.map((row: RowTierList) => ({
                listitem_id: row.listitem_id,
                option_value: row.option_value,
                tierlist_id: row.tierlist_id,
            })),
        };

        res.status(200).json(tierList);
    } catch (err) {
        next(err);
    }
};
