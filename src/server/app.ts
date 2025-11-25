import "dotenv/config";
import express from "express";
import morgan from "morgan";
import checkHealthStatus from "./middleware/checkHealthStatus/checkHealthStatus.js";
import handleErrors from "./middleware/hanldeErrors/handleErrors.js";
import handleEndpointNotFound from "./middleware/handleEndpointNotFound/handleEndpointNotFound.js";
import shoppingListRouter from "../menu/shoppingList/router/shoppingListRouter.js";
import handleCors from "./middleware/handleCors/handleCors.js";
import weeklyMenuRouter from "../menu/weeklyMenu/router/weeklyMenuRouter.js";
import authRouter from "../auth/router/authRouter.js";

const app = express();

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(handleCors);

app.use(express.json());

app.get("/", checkHealthStatus);

app.use("/shopping-list", shoppingListRouter);

app.use("/weekly-menu", weeklyMenuRouter);

app.use("/auth", authRouter);

app.use(handleEndpointNotFound);

app.use(handleErrors);

export default app;
