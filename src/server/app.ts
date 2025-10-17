import express from "express";
import morgan from "morgan";
import checkHealthStatus from "./middleware/checkHealthStatus/checkHealthStatus.js";
import handleErrors from "./middleware/hanldeErrors/handleErrors.js";

const app = express();

app.use(morgan("dev"));

app.get("/", checkHealthStatus);

app.use(handleErrors);

export default app;
