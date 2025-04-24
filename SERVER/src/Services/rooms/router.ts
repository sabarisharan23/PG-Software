import express from "express";
import {
  createRoomController,
  getRoomsController,
  updateRoomController,
  deleteRoomController,
  getRoomByIdController,
} from "./controller";
import { upload } from "../../utils.ts/multer";

const roomRouter = express.Router();

roomRouter.post("/createRoom", upload.array("images", 5), createRoomController); 
roomRouter.get("/getRoom", getRoomsController);
roomRouter.get("/getRoom/:id", getRoomByIdController);
roomRouter.put("/updateRoom/:id",upload.array("images", 5),updateRoomController); 
roomRouter.delete("/deleteRoom/:id", deleteRoomController);

export default roomRouter;
