import { Response, Request, NextFunction } from "express";
import {
  CreateRoomDtoSchema,
  GetRoomsDtoSchema,
  UpdateRoomDtoSchema,
} from "./room.dto";
import { createRoom, getRooms, updateRoom, deleteRoom } from "./service";

export async function createRoomController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = CreateRoomDtoSchema.parse(req.body);
    const response = await createRoom(body);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

export async function getRoomsController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const query = GetRoomsDtoSchema.parse(req.query);
    const response = await getRooms(query);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

export async function updateRoomController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const roomId = Number(req.params.id);
    const body = UpdateRoomDtoSchema.parse(req.body);
    const response = await updateRoom(roomId, body);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

export async function deleteRoomController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const roomId = Number(req.params.id);
    if (!roomId || isNaN(roomId)) {
      throw new Error("Invalid room ID");
    }
    const response = await deleteRoom(roomId);
    res.json(response);
    res.json({ message: "Room deleted successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
