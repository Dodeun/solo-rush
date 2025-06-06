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
        `SELECT tierlist_id, title, creation_date FROM tierlist`
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

export async function updateTierList({
    tierlist_id,
    title,
    listItems,
}): Promise<RowTierList[] | null> {
    // 1. Update the title
    await database.query(
        `UPDATE tierlist SET title = ? WHERE tierlist_id = ?`,
        [title, tierlist_id]
    );

    // 2. Delete existing listItems
    await database.query(`DELETE FROM listitem WHERE tierlist_id = ?`, [
        tierlist_id,
    ]);

    // 3. Insert the new listItems
    if (listItems.length > 0) {
        const connectingElement = listItems.map(() => "(?, ?)").join(",");
        const values: (string | number)[] = [];

        for (const item of listItems) {
            values.push(item.option_value);
            values.push(tierlist_id);
        }

        await database.query(
            `INSERT INTO listitem (option_value, tierlist_id) VALUES ${connectingElement}`,
            values
        );
    }

    // 4. Return the updated list
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
        WHERE tl.tierlist_id = ?
        `,
        [tierlist_id]
    );

    if (rows.length === 0) return null;

    return rows;
}
