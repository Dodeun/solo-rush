import express from "express";
import cors from "cors";
import "dotenv/config";
import tierListsRouter from "./routes/tierLists.routes";
import { logErrors } from "./middlewares/logErrors";

export const app = express();

console.log(process.env);
// Use cors to allow our client url (in env variables) to query our back
if (process.env.CLIENT_URL != null) {
	app.use(cors({ origin: process.env.CLIENT_URL }));
}

app.use(express.json());

app.use("/api/tierlists", tierListsRouter);

// Mount the logErrors middleware globally
app.use(logErrors);
