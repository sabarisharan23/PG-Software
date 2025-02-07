import cors from "cors";
import express from "express";
import http from "http";
import userRouter from "./user/router";
import path from "path";
import { errorHandler } from "./errorHandler";
import roomRouter from "./Services/Rooms/router";
import pgRouter from "./Services/PG/router";
import roomTenantRouter from "./Services/RoomTenant/router";
import adminAssignmentRouter from "./Services/pgAdminAssignment/router";
import requestRouter from "./Services/TenantRequest/router";


const app = express();
app.use(cors({ origin: "*",preflightContinue:true }));

const httpServer = http.createServer(app);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");
app.use(express.static("assets"));

app.use("/user",userRouter);
app.use("/room",roomRouter);
app.use("/PG",pgRouter);
app.use("/roomTenant",roomTenantRouter);
app.use("/adminAssignment",adminAssignmentRouter);
app.use("/request",requestRouter);

app.use(errorHandler);

export default httpServer;