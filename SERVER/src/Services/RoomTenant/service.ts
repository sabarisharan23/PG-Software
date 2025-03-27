import { PrismaClient } from "@prisma/client";
import {
  CreateRoomTenantDtoType,
  DeleteRoomTenantDtoType,
  getRoomTenantsDtoType,
} from "./roomTenant.dto";

const prisma = new PrismaClient();

// Create RoomTenant
export async function createRoomTenant(parsedData: CreateRoomTenantDtoType) {
  try {
    // Check if PG exists
    const existingPG = await prisma.pG.findUnique({
      where: { id: parsedData.pGId },
    });

    if (!existingPG) {
      throw new Error("PG not found");
    }

    // Check if RoomTenant already exists
    const existingRoomTenant = await prisma.roomTenant.findUnique({
      where: {
        userId_roomId: {
          userId: parsedData.userId,
          roomId: parsedData.roomId,
        },
      },
    });

    if (existingRoomTenant) {
      throw new Error("Room Tenant already exists");
    }

    // Create RoomTenant with pGId
    const roomTenant = await prisma.roomTenant.create({
      data: {
        userId: parsedData.userId,
        roomId: parsedData.roomId,
        pGId: parsedData.pGId, 
      },
      include: {
        room: true,
        user: true,
      },
    });

    return roomTenant;
  } catch (error) {
    throw new Error(
      `Error creating RoomTenant: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
 
export async function getAllRoomTenants(query: getRoomTenantsDtoType) {
  try {
    const whereCondition: any = {};

    // Add filters only if roomId or userId is provided
    if (query.roomId) whereCondition.roomId = query.roomId;
    if (query.userId) whereCondition.userId = query.userId;

    const roomTenants = await prisma.roomTenant.findMany({
      where: whereCondition,
      include:{
        PG:true,
        room:true,
        user:true
      } // Apply filters dynamically
    });

    return roomTenants;
  } catch (error) {
    throw new Error(
      `Error fetching RoomTenants: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

// Get RoomTenant by userId and roomId
export async function getRoomTenant(userId: number, roomId: number) {
  try {
    const roomTenant = await prisma.roomTenant.findUnique({
      where: {
        userId_roomId: {
          userId,
          roomId,
        },
      },
      include: {
        room: true,
        user: true,
      },
    });
    if (!roomTenant) {
      throw new Error("RoomTenant not found");
    }
    return roomTenant;
  } catch (error) {
    throw new Error(
      `Error fetching RoomTenant: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

// Update RoomTenant
export async function updateRoomTenant(
  userId: number,
  roomId: number,
  parsedData: Partial<CreateRoomTenantDtoType>
) {
  try {
    const roomTenant = await prisma.roomTenant.findUnique({
      where: {
        userId_roomId: {
          userId,
          roomId,
        },
      },
    });

    if (!roomTenant) {
      throw new Error("RoomTenant not found");
    }

    const updatedRoomTenant = await prisma.roomTenant.update({
      where: {
        userId_roomId: {
          userId,
          roomId,
        },
      },
      data: parsedData,
    });

    return updatedRoomTenant;
  } catch (error) {
    throw new Error(
      `Error updating RoomTenant: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

// Delete RoomTenant
export async function deleteRoomTenant(parsedData: DeleteRoomTenantDtoType) {
  try {
    const roomTenant = await prisma.roomTenant.findUnique({
      where: {
        userId_roomId: {
          userId: parsedData.userId,
          roomId: parsedData.roomId,
        },
      },
    });

    if (!roomTenant) {
      throw new Error("RoomTenant not found");
    }

    await prisma.roomTenant.delete({
      where: {
        userId_roomId: {
          userId: parsedData.userId,
          roomId: parsedData.roomId,
        },
      },
    });

    return { success: true, message: "RoomTenant deleted successfully" };
  } catch (error) {
    throw new Error(
      `Error deleting RoomTenant: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
