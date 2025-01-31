import express from "express";
import {
  createRoomController,
  getRoomsController,
  updateRoomController,
  deleteRoomController,
} from "./controller";

const roomRouter = express.Router();

roomRouter.post("/createRoom", createRoomController);
roomRouter.get("/getRoom", getRoomsController);
roomRouter.put("/updateRoom/:id", updateRoomController);
roomRouter.delete("/deleteRoom/:id", deleteRoomController);

export default roomRouter;
