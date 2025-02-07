import { Request, Response, NextFunction } from "express";
import { CreateRequestDtoType, GetRequestDtoType, UpdateRequestDtoType } from "./request.dto";
import { createTenantRequest, deleteTenantRequest, getTenantRequest, updateTenantRequest } from "./service";
import { UpdatePGDtoSchema } from "../PG/pg.dto";

export async function createTenantRequestController(req: Request, res: Response, next: NextFunction) {
    try {
        const body = CreateRequestDtoType.parse(req.body);
        const response = await createTenantRequest(body);
        res.json(response);
    } catch (error) {
        next(error);
    }
}

export async function getTenantRequestController(req: Request, res: Response, next: NextFunction) {
    try {
        const query = GetRequestDtoType.parse(req.query);
        const response = await getTenantRequest(query);
        res.json(response);
    } catch (error) {
        next(error);
    }
}

export async function updateTenantRequestController(req: Request, res: Response, next: NextFunction) {
    try {
        const body = UpdateRequestDtoType.parse(req.body);
        const requestId = Number(req.params.id);
        if (!requestId || isNaN(requestId)) {
            throw new Error("Invalid request ID");
        }
        const response = await updateTenantRequest(requestId, body);
        res.json(response);
    } catch (error) {
        next(error);
    }
}

export async function deleteTenantRequestController(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        if (!id || isNaN(id)) {
            throw new Error("Invalid request ID");
        }
        const response = await deleteTenantRequest(id);
        res.json(response);
    } catch (error) {
        next(error);
    }
}