import { PrismaClient } from "@prisma/client";
import { CreateRoomDtoType, UpdateRoomDtoType } from "./room.dto";

const prisma = new PrismaClient();

export async function createRoom(parsedData: CreateRoomDtoType) {
  try {
    const existingRoom = await prisma.room.findUnique({
      where: {
        roomNumber: parsedData.roomNumber,
      },
    });
    const noPG = await prisma.pG.findUnique({
      where: { id: parsedData.pgId },
    });
    if(!noPG){
      throw new Error("PG not found");
    }

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
      `Error creating room: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function getRooms(query: any) {
  try {
    const whereCondition = {
      roomNumber: query.roomNumber || undefined,
      pgId: query.pgId || undefined,
    };

    const rooms = await prisma.room.findMany({
      where: whereCondition,
      include: {
        pg: true,
        roomTenants: true,
      },
    });

    return rooms;
  } catch (error) {
    throw new Error(
      `Error fetching rooms: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function updateRoom(id: number, parsedData: UpdateRoomDtoType) {
  const existingRoom = await prisma.room.findUnique({ where: { id } });
  if (!existingRoom) {
    throw new Error("Room not found");
  }

  const updateRoom = await prisma.room.update({
    where: { id },
    data: parsedData,
  });

  return updateRoom;
}

export async function deleteRoom(id: number) {
  try {
    const room = await prisma.room.findUnique({ where: { id } });
    if (!room) {
      throw new Error("Room not found");
    }

    await prisma.room.delete({ where: { id } });

    return { success: true, message: "Room deleted successfully" };
  } catch (error) {
    throw new Error(
      `Error deleting room: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
