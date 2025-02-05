import express from "express";
import { createRoomTenantController, deleteRoomTenantController, getRoomTenantController, updateRoomTenantController } from "./controller";


const roomTenantRouter = express.Router();

roomTenantRouter.post("/createRoomTenant", createRoomTenantController);
roomTenantRouter.get("/getRoomTenant/:userId/:roomId", getRoomTenantController);
roomTenantRouter.put("/updateRoomTenant/:userId/:roomId", updateRoomTenantController);
roomTenantRouter.delete("/deleteRoomTenant", deleteRoomTenantController);

export default roomTenantRouter;