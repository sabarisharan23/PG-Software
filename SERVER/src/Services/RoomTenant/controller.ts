import { NextFunction, query, Request, Response } from "express";
import { CreateRoomTenantDtoType, DeleteRoomTenantDtoType, getRoomTenantsDtoType } from "./roomTenant.dto";
import { createRoomTenant, getRoomTenant, updateRoomTenant, deleteRoomTenant, getAllRoomTenants } from "./service";


// Create RoomTenant Controller
export async function createRoomTenantController(req: Request, res: Response, next: NextFunction) {
  try {
    const body = CreateRoomTenantDtoType.parse(req.body);
    const response = await createRoomTenant(body);
    res.json(response);
  } catch (error) {
    next(error);
  }
}
export async function getAllRoomTenantsController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const query = getRoomTenantsDtoType.parse(req.query); // Parse the request query
    const response = await getAllRoomTenants(query);
    res.json(response);
  } catch (error) {
    next(error); // Pass error to Express error handler
  }
}


// Get RoomTenant Controller
export async function getRoomTenantController(req: Request, res: Response, next: NextFunction) {
  const { userId, roomId } = req.params;
  const response = await getRoomTenant(Number(userId), Number(roomId));
  res.json(response);
}

// Update RoomTenant Controller
export async function updateRoomTenantController(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId, roomId } = req.params;
    const body = req.body;
    const response = await updateRoomTenant(Number(userId), Number(roomId), body);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

// Delete RoomTenant Controller
export async function deleteRoomTenantController(req: Request, res: Response, next: NextFunction) {
  try {
    const body = DeleteRoomTenantDtoType.parse(req.body);
    const response = await deleteRoomTenant(body);
    res.json(response);
  } catch (error) {
    next(error);
  }
}
