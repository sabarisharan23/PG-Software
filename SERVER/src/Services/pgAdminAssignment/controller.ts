import { Request, Response,NextFunction } from "express";
import { createPgAdminAssignment, deletePgAdminAssignment, getAllPgAdmins, getPgAdminAssignment, updatePgAdminAssignment } from "./service";
import { CreatePgAdminAssignmentDtoType, DeletePgAdminAssignmentDtoType,  getAllPgAdminDtoType,  UpdatePgAdminAssignmentDtoType } from "./pgAdminAssignment.dto";

export async function createPgAdminAssignmentController(req: Request, res: Response, next: NextFunction) {
    try {
        const body = CreatePgAdminAssignmentDtoType.parse(req.body);
        const pgAdminAssignment = await createPgAdminAssignment(body);
        res.status(201).json(pgAdminAssignment);
    } catch (error) {
        next(error);
    }
}     

export async function getAllPgAdminsController(req: Request, res: Response, next: NextFunction) {
    try {
        const query = getAllPgAdminDtoType.parse(req.query);
        const response = await getAllPgAdmins(query);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

export async function getPgAdminAssignmentController(req: Request, res: Response, next: NextFunction) {
    try {
      const { adminId, pgId } = req.params;
      const pgAdminAssignment = await getPgAdminAssignment(Number(adminId), Number(pgId));
      res.status(200).json(pgAdminAssignment);
    } catch (error) {
      next(error);
    }
  }
  


export async function updatePgAdminAssignmentController(req: Request, res: Response, next: NextFunction) {
    try {
        const {adminId,pgId } = req.params;
        const body = UpdatePgAdminAssignmentDtoType.parse(req.body);
        const pgAdminAssignment = await updatePgAdminAssignment(Number(adminId), Number(pgId), body);
        res.status(200).json(pgAdminAssignment);
    } catch (error) {
        next(error);
    }
}

// Delete PgAdminAssignment Controller
export async function deletePgAdminAssignmentController(req: Request, res: Response, next: NextFunction) {
    try {
        const body = DeletePgAdminAssignmentDtoType.parse(req.body);
        const pgAdminAssignment = await deletePgAdminAssignment(body);
        res.status(200).json(pgAdminAssignment);
    } catch (error) {        
        next(error);
    }
}