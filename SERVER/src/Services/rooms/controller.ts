import { NextFunction, Request, Response } from "express";
import { CreateRoomDtoSchema, GetRoomsDtoSchema, UpdateRoomDtoSchema } from "./room.dto";
import { createRoom, getRooms, getRoomById, updateRoom, deleteRoom } from "./service";



// Controller to create a new room
export async function createRoomController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = CreateRoomDtoSchema.parse(req.body);
    const files = req.files as Express.Multer.File[];
    const response = await createRoom(body, files);
    res.json(response);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

// Controller to get rooms
export async function getRoomsController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const query = GetRoomsDtoSchema.parse(req.query);
  const response = await getRooms(query);
  res.json(response);
}


export async function getRoomByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const roomId = Number(req.params.id);
    if (!roomId || isNaN(roomId)) {
      throw new Error("Invalid Room ID");
    }
    const response = await getRoomById(roomId);
    res.json(response);
  } catch (error) {
    next(error);
  }
} 


// Controller to update room details
export async function updateRoomController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const parsed = UpdateRoomDtoSchema.parse(req.body);
    const updatedRoom = await updateRoom(Number(req.params.id), parsed, req.files as Express.Multer.File[]);
    res.json(updatedRoom);
  } catch (error) {
    next(error);
  }
}

// Controller to delete a room
export async function deleteRoomController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const roomId = Number(req.params.id);
    if (!roomId || isNaN(roomId)) {
      throw new Error("Invalid Room ID");
    }
    const response = await deleteRoom(roomId);
    res.json(response);
  } catch (error) {
    next(error);
  }
}
