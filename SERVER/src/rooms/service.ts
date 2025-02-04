import { PrismaClient } from "@prisma/client";
import { CreateRoomDtoType, UpdateRoomDtoType } from "./room.dto";

const prisma = new PrismaClient();

// Function to create a new room
export async function createRoom(parsedData: CreateRoomDtoType) {
  try {
    const existingRoom = await prisma.room.findUnique({
      where: {
        roomNumber: parsedData.roomNumber,
      },
    });

    if (existingRoom) {
      throw new Error("Room already exists");
    }

    const newRoom = await prisma.room.create({
      data: {
        roomNumber: parsedData.roomNumber,
        roomName: parsedData.roomName,
        roomType: parsedData.roomType,
        floor: parsedData.floor,
        blockName: parsedData.blockName,
        rentPrice: parsedData.rentPrice,
        depositPrice: parsedData.depositPrice,
        roomSize: parsedData.roomSize,
        availableStatus: parsedData.availableStatus,
        attachedBathrooms: parsedData.attachedBathrooms,
        balconyStatus: parsedData.balconyStatus,
        cctvStatus: parsedData.cctvStatus,
        pgId: parsedData.pgId,
      },
    });

    return newRoom;
  } catch (error) {
    throw new Error(
      `Error creating room: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

// Function to get rooms
export async function getRooms(query: any) {
  try {
    const whereCondition = {
      roomNumber: query.roomNumber || undefined,
      pgId: query.pgId || undefined,
    };

    const rooms = await prisma.room.findMany({
      where: whereCondition,
      include:{
        pg: true, // Include PG for TENANT rooms
        roomTenants: true, // Include room tenancy for TENANT rooms
      }
    });

    return rooms;
  } catch (error) {
    throw new Error(
      `Error fetching rooms: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

// Function to update room details
export async function updateRoom(id: number, parsedData: UpdateRoomDtoType) {
  const existingRoom = await prisma.room.findUnique({ where: { id } });
  if (!existingRoom) {
    throw new Error("Room not found");
  }

  // Update room details
  const updateRoom = await prisma.room.update({
    where: { id },
    data: parsedData,
  });

  return updateRoom;
}

// Function to delete room
export async function deleteRoom(id: number) {
  try {
    const room = await prisma.room.findUnique({ where: { id } });
    if (!room) {
      throw new Error("Room not found");
    }

    // Delete room
    await prisma.room.delete({ where: { id } });

    return { success: true, message: "Room deleted successfully" };
  } catch (error) {
    throw new Error(
      `Error deleting room: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}
