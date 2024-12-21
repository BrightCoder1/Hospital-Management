import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./router/messageRouter.js";
import {errorMiddleware} from "./middleware/errorMiddleware.js"
import userRouter from "./router/userRouter.js";
const app = express();


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp/",
    })
)

app.use("/api/v1/message",messageRouter);
app.use("/api/v1/user",userRouter);


dbConnection();
app.use(errorMiddleware);
export default app;