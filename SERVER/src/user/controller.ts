import { NextFunction, Request, Response } from "express";
import { CreateUserDtoSchema } from "./user.dto";
import { createUser } from "./service";

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
