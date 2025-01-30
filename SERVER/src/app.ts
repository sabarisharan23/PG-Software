import cors from "cors";
import express from "express";
import http from "http";
import userRouter from "./user/router";
import path from "path";


const app = express();
app.use(cors({ origin: "*",preflightContinue:true }));

const httpServer = http.createServer(app);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");
app.use(express.static("assets"));

app.use("/user",userRouter)


export default httpServer;