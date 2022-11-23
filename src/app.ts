import "reflect-metadata";
import express from "express";
import "express-async-errors";
import handleErrorMiddleware from "./middlewares/handleError.middleware";
import AppRoutes from "./routes";

const app = express();

app.use(express.json());

AppRoutes(app);

app.use(handleErrorMiddleware);

export default app;
