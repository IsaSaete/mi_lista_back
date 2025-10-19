import "dotenv/config";
import startServer from "./server/startServer.js";
import connectToDatabase from "./database/connectToDatabase.js";

const databaseString = process.env.CONNECTION_TO_DATABASE;

await connectToDatabase(databaseString);

const port = process.env.PORT ?? 4000;

startServer(Number(port));
