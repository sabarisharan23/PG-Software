import express from "express";
import {
  createRoomController,
  getRoomsController,
  updateRoomController,
  deleteRoomController,
  getRoomByIdController,
} from "./controller";

const roomRouter = express.Router();

roomRouter.post("/createRoom", createRoomController);
roomRouter.get("/getRoom", getRoomsController);
roomRouter.get("/getRoom/:id", getRoomByIdController);
roomRouter.put("/updateRoom/:id", updateRoomController);
roomRouter.delete("/deleteRoom/:id", deleteRoomController);

export default roomRouter;
