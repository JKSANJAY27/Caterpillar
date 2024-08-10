import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbConnection from "./database/dbConnection.js";
import {errorMiddleware} from "./middleware/error.js";
import fileupload from "express-fileupload";
import headerRouter from "./router/headerRouter.js";
import featureRouter from "./router/featuresRouter.js";

const app = express();
dotenv.config({path: "./config/config.env"});

app.use(cors());

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    createParentPath: true
}));

app.use("/headers", headerRouter);
app.use("/features", featureRouter);

dbConnection();
app.use(errorMiddleware);

export default app;