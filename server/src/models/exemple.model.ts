import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Exemple } from "../types/exemple";
import database from "./db_model.ts";

async function findAllExemple() {
    const [rows] = await database.query(`SELECT * FROM exemple`);
    return rows;
}

async function insertExemple({ message }): Promise<Exemple> {
    const fields = ["message"];
    const values = [message];

    const connectingElement = values.map(() => "?").join(",");
    const sqlQuery = `
        INSERT INTO exemple (${fields.join(",")})
        VALUES (${connectingElement})
    `;

    // Insert a new exemple into user table
    const [result] = await database.query<ResultSetHeader>(sqlQuery, values);

    // Select the id and message of the new message
    const [rows] = await database.query<Exemple[] & RowDataPacket[]>(
        `SELECT id, message FROM exemple WHERE id = ?`,
        [result.insertId]
    );

    if (rows.length === 0) {
        throw new Error("Utilisateur inséré mais ne semble pas être trouvé");
    }

    // Returns the new user without the password to the client
    return rows[0];
}

export default { findAllExemple, insertExemple };
