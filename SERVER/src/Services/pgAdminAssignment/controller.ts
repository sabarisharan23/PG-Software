import { Request, Response,NextFunction } from "express";
import { createPgAdminAssignment, deletePgAdminAssignment, getPgAdminAssignment, updatePgAdminAssignment } from "./service";
import { CreatePgAdminAssignmentDtoType, DeletePgAdminAssignmentDtoType,  UpdatePgAdminAssignmentDtoType } from "./pgAdminAssignment.dto";

export async function createPgAdminAssignmentController(req: Request, res: Response, next: NextFunction) {
    try {
        const body = CreatePgAdminAssignmentDtoType.parse(req.body);
        const pgAdminAssignment = await createPgAdminAssignment(body);
        res.status(201).json(pgAdminAssignment);
    } catch (error) {
        next(error);
    }
}       

export async function getPgAdminAssignmentController(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId, roomId } = req.params;
        const pgAdminAssignment = await getPgAdminAssignment(Number(userId), Number(roomId));
        res.status(200).json(pgAdminAssignment);
    } catch (error) {
        next(error);
    }
}


export async function updatePgAdminAssignmentController(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId, roomId } = req.params;
        const body = UpdatePgAdminAssignmentDtoType.parse(req.body);
        const pgAdminAssignment = await updatePgAdminAssignment(Number(userId), Number(roomId), body);
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