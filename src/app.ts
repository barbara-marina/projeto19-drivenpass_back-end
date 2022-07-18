import cors from "cors";
import express, { json } from "express";
import "express-async-errors";
import dotenv from "dotenv";

import router from "./routes/index.js";
import errorHandlerMiddleware from "./middlewares/errorMiddleware.js";
import chalk from "chalk";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());
app.use(router);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(chalk.bold.magentaBright(`Server is up and running on port ${PORT}.`));
});