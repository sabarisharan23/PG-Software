import { NextFunction, Request, Response } from "express";
import {
  CreateUserDtoSchema,
  GetUsersDtoSchema,
  UpdateUserDtoSchema,
} from "./user.dto";
import { createUser, deleteUser, getUsers, updateUser } from "./service";

// Controller to create a new user
export async function createUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = CreateUserDtoSchema.parse(req.body);
    const response = await createUser(body);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

// Controller to get users (with optional query params)
export async function getUsersController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const query = GetUsersDtoSchema.parse(req.query);
  const response = await getUsers(query);
  res.json(response);
}

// Controller to update user details
export async function updateUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = UpdateUserDtoSchema.parse(req.body);
    const response = await updateUser(Number(req.params.id), body);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

// Controller to delete a user
export async function deleteUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = Number(req.params.id);
    if (!userId || isNaN(userId)) {
      throw new Error("Invalid user ID");
    }
    const response = await deleteUser(userId);
    res.json(response);
  } catch (error) {
    next(error);
  }
}
