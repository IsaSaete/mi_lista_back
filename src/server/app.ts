/* eslint-disable no-console */
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import checkHealthStatus from "./middleware/checkHealthStatus/checkHealthStatus.js";
import handleErrors from "./middleware/hanldeErrors/handleErrors.js";
import handleEndpointNotFound from "./middleware/handleEndpointNotFound/handleEndpointNotFound.js";
import shoppingListRouter from "../menu/router/shoppingListRouter.js";
import handleCors from "./middleware/handleCors/handleCors.js";

console.log("✅ Starting app.ts...");
console.log(
  "🔹 CONNECTION_TO_DATABASE exists:",
  !!process.env.CONNECTION_TO_DATABASE,
);
console.log(
  "🔹 ALLOWED_ORIGIN_PATTERNS exists:",
  !!process.env.ALLOWED_ORIGIN_PATTERNS,
);

const app = express();

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(handleCors);

app.use(express.json());

app.get("/", checkHealthStatus);

app.use("/shopping-list", shoppingListRouter);

app.use(handleEndpointNotFound);

app.use(handleErrors);

export default app;
