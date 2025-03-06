import { NextFunction, Request, Response } from "express";
import { CreatePGDtoSchema, GetPGsDtoSchema, UpdatePGDtoSchema } from "./pg.dto";
import { createPG, getPGs, updatePG, deletePG, getPGById } from "./service";

const userRole = "SUPER_ADMIN";
// Controller to create a new PG
export async function createPGController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = CreatePGDtoSchema.parse(req.body);
    const response = await createPG(body,userRole);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

// Controller to get PGs
export async function getPGsController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const query = GetPGsDtoSchema.parse(req.query);
  const response = await getPGs(query,userRole);
  res.json(response);
}

export async function getPGByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const pgId = Number(req.params.id);
    if (!pgId || isNaN(pgId)) {
      throw new Error("Invalid PG ID");
    }
    const response = await getPGById(pgId,userRole);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

// Controller to update PG details
export async function updatePGController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = UpdatePGDtoSchema.parse(req.body);
    const response = await updatePG(Number(req.params.id), body ,userRole);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

// Controller to delete a PG
export async function deletePGController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const pgId = Number(req.params.id);
    if (!pgId || isNaN(pgId)) {
      throw new Error("Invalid PG ID");
    }
    const response = await deletePG(pgId, userRole);
    res.json(response);
  } catch (error) {
    next(error);
  }
}
