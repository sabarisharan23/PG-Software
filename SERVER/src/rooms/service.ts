import { PrismaClient } from "@prisma/client";
import { CreateRoomDtoType, GetRoomsDtoType, UpdateRoomDtoType } from "./room.dto";


const prisma = new PrismaClient();

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

export async function getRooms(query: GetRoomsDtoType) {
  try {
    const roomId = query.id;
    const whereCondition: any = {
        id:roomId ? Number(roomId) : undefined,
      roomNumber: query.roomNumber || undefined,
      roomName: query.roomName || undefined,
      roomType: query.roomType || undefined,
      floor: query.floor || undefined,
      blockName: query.blockName || undefined,
      rentPrice: query.rentPrice || undefined,
      depositPrice: query.depositPrice || undefined,
      roomSize: query.roomSize || undefined,
      availableStatus: query.availableStatus || undefined,
      attachedBathrooms: query.attachedBathrooms || undefined,
      balconyStatus: query.balconyStatus || undefined,
      cctvStatus: query.cctvStatus || undefined,
    };

    const rooms = await prisma.room.findMany({
      where: whereCondition,
      select: { 
        id: true,
        roomNumber: true,
        roomName: true,
        roomType: true,
        floor: true,
        blockName: true,
        rentPrice: true,
        depositPrice: true,
        roomSize: true,
        availableStatus: true,
        attachedBathrooms: true,
        balconyStatus: true,
        cctvStatus: true,
      },
    });

    console.log("Querying with:", whereCondition);

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
    select: {
      id: true,
      roomNumber: true,
      roomName: true,
      roomType: true,
      floor: true,
      blockName: true,
      rentPrice: true,
      depositPrice: true,
      roomSize: true,
      availableStatus: true,
      attachedBathrooms: true,
      balconyStatus: true,
      cctvStatus: true,
    },
  });
  return {
    id: updateRoom.id,
    roomNumber: updateRoom.roomNumber,
    roomName: updateRoom.roomName,
    roomType: updateRoom.roomType,
    floor: updateRoom.floor,
    blockName: updateRoom.blockName,
    rentPrice: updateRoom.rentPrice,
    depositPrice: updateRoom.depositPrice,
    roomSize: updateRoom.roomSize,
    availableStatus: updateRoom.availableStatus,
    attachedBathrooms: updateRoom.attachedBathrooms,
    balconyStatus: updateRoom.balconyStatus,
    cctvStatus: updateRoom.cctvStatus,
  };
}

export async function deleteRoom(id: number) {
  try {
    if (!id || isNaN(id)) {
      throw new Error("Invalid room ID");
    }

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
