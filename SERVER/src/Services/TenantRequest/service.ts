import { PrismaClient } from "@prisma/client";
import { CreateRequestDtoType, GetRequestDtoType } from "./request.dto";
import exp from "constants";

const prisma = new PrismaClient();
export async function createTenantRequest(parsedData: CreateRequestDtoType) {
    try {
        if (!parsedData.userId) throw new Error(" User ID is required.");
        if (!parsedData.roomId) throw new Error(" Room ID is required.");
        if (!parsedData.pgId) throw new Error(" PG ID is required.");
        if (!parsedData.status) throw new Error(" Status is required.");

        const userExists = await prisma.user.findUnique({
            where: { id: parsedData.userId },
        });
        if (!userExists) throw new Error(` User with ID ${parsedData.userId} does not exist.`);

        const roomExists = await prisma.room.findUnique({
            where: { id: parsedData.roomId },
        });
        if (!roomExists) throw new Error(` Room with ID ${parsedData.roomId} does not exist.`);

        const pgExists = await prisma.pG.findUnique({
            where: { id: parsedData.pgId },
        });
        if (!pgExists) throw new Error(` PG with ID ${parsedData.pgId} does not exist.`);

        const existingRequest = await prisma.tenantRequest.findFirst({
            where: {
                userId: parsedData.userId,
                roomId: parsedData.roomId,
                pgId: parsedData.pgId,
            },
        });

        if (existingRequest) {
            throw new Error(" Request already exists for this user and room.");
        }

        const request = await prisma.tenantRequest.create({
            data: {
                userId: parsedData.userId,
                roomId: parsedData.roomId,
                pgId: parsedData.pgId,
                status: parsedData.status,
            },
        });

        return request;
    } catch (error) {
        throw new Error(
            `Error creating TenantRequest: ${error instanceof Error ? error.message : "Unknown error"}`
        );
    }
}

export async function getTenantRequest(query: GetRequestDtoType) {
    try {
        const whereCondition = {
            id: query.id ?? undefined,
            userId: query.userId ?? undefined,
            roomId: query.roomId ?? undefined,
            pgId: query.pgId ?? undefined,
            status: query.status ?? undefined,
        };

        const request = await prisma.tenantRequest.findMany({
            where: whereCondition,
            include: {
                user: true,
                room: true,
                pg: true,
            },
        });

        if (!request || request.length === 0) {
            throw new Error("No request found with the given filters.");
        }

        return request;
    } catch (error) {
        throw new Error(`Error fetching TenantRequest: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
}



export async function updateTenantRequest(id: number, parsedData: CreateRequestDtoType) {
    try {



        const request = await prisma.tenantRequest.findUnique({
            where: {
                id,
            },
        });
        if (!request) {
            throw new Error("Request not found");
        }
        const updatedRequest = await prisma.tenantRequest.update({
            where: {
                id,
            },
            data: parsedData,
        });
        return updatedRequest;
    } catch (error) {
        throw new Error(
            `Error updating TenantRequest: ${error instanceof Error ? error.message : "Unknown error"
            }`
        );
    }
}

export async function deleteTenantRequest(id: number) {
    try {
        const request = await prisma.tenantRequest.findUnique({
            where: {
                id,
            },
        });
        if (!request) {
            throw new Error("Request not found");
        }
        await prisma.tenantRequest.delete({
            where: {
                id,
            },
        });
        return { success: true, message: "Request deleted successfully" };
    } catch (error) {
        throw new Error(
            `Error deleting TenantRequest: ${error instanceof Error ? error.message : "Unknown error"
            }`
        );
    }
}