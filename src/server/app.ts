import "dotenv/config";
import express from "express";
import morgan from "morgan";
import checkHealthStatus from "./middleware/checkHealthStatus/checkHealthStatus.js";
import handleErrors from "./middleware/hanldeErrors/handleErrors.js";
import shoppingListRouter from "../menu/router/shoppingListRouter.js";
import handleEndpointNotFound from "./middleware/handleEndpointNotFound/handleEndpointNotFound.js";
import handleCors from "./middleware/handleCors/handleCors.js";

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
