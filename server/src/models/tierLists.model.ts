import { ResultSetHeader, RowDataPacket } from "mysql2";
import {
    CompleteTierList,
    NewTierList,
    RowTierList,
    TierList,
} from "../types/tierLists";
import database from "./db_model";
import { NewListItem } from "../types/listItem";

export async function findAllTierLists(): Promise<TierList[]> {
    const [rows] = await database.query<TierList[]>(
        `SELECT tierlist_id, title FROM tierlist`
    );
    return rows;
}

export async function findTierListById(
    id: number
): Promise<RowTierList[] | null> {
    const [rows] = await database.query<RowTierList[]>(
        `
    SELECT
        tl.tierlist_id,
        tl.title,
        tl.creation_date,
        li.listitem_id,
        li.option_value
    FROM tierlist AS tl
    LEFT JOIN listitem AS li ON tl.tierlist_id = li.tierlist_id
    WHERE tl.tierlist_id = ?`, // ADD ORDER BY DATE
        [id]
    );
    if (rows.length === 0) return null;
    return rows;
}

export async function insertTierList({
    title,
    listItems,
}: NewTierList): Promise<RowTierList[] | null> {
    const [resultTierList] = await database.query<ResultSetHeader>(
        `INSERT INTO tierlist (title) VALUES (?)`,
        [title]
    );
    const newTierListId: number = resultTierList.insertId;

    const connectingElement = listItems.map(() => "(?,?)").join(",");

    const values: (string | number)[] = [];
    for (const item of listItems) {
        values.push(item.option_value);
        values.push(newTierListId);
    }

    const [resultListItems] = await database.query<ResultSetHeader>(
        `INSERT INTO listitem (option_value, tierlist_id) VALUES ${connectingElement}`,
        values
    );

    console.log("resultListItems: ", resultListItems);

    const [rows] = await database.query<RowTierList[]>(
        `
    SELECT
        tl.tierlist_id,
        tl.title,
        tl.creation_date,
        li.listitem_id,
        li.option_value
    FROM tierlist AS tl
    LEFT JOIN listitem AS li ON tl.tierlist_id = li.tierlist_id
    WHERE tl.tierlist_id = ?`, // ADD ORDER BY DATE
        [newTierListId]
    );
    if (rows.length === 0) return null;

    return rows;
}

export async function deleteTierList(id: number): Promise<number> {
    const [result] = await database.query<ResultSetHeader>(
        "DELETE FROM tierlist WHERE tierlist_id = ?",
        [id]
    );

    return result.affectedRows;
}
