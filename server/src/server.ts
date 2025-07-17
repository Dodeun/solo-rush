import "dotenv/config";
import { app } from "./app.js";

// Get the port from the environment variables
const port = process.env.APP_PORT;
console.log("PORT:", port);

// Start the server and listen on the specified port
app.listen(port, () => {
	console.info(`Server is listening on port ${port}`);
}).on("error", (err: Error) => {
	console.error("Error:", err.message);
});
