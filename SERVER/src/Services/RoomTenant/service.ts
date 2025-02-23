import { PrismaClient } from "@prisma/client";
import {
  CreateRoomTenantDtoType,
  DeleteRoomTenantDtoType,
} from "./roomTenant.dto";

const prisma = new PrismaClient();

// Create RoomTenant
export async function createRoomTenant(parsedData: CreateRoomTenantDtoType) {
  try {
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

    const roomTenant = await prisma.roomTenant.create({
      data: {
        userId: parsedData.userId,
        roomId: parsedData.roomId,
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
