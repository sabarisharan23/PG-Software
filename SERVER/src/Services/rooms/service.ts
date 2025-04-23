import { PrismaClient } from "@prisma/client";
import { CreateRoomDtoType, UpdateRoomDtoType, GetRoomsDtoType } from "./room.dto";

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
        airConditioned: parsedData.airConditioned,
        wifi: parsedData.wifi,
        refrigerator: parsedData.refrigerator,
        housekeeping: parsedData.housekeeping,
        powerBackup: parsedData.powerBackup,
        bedding: parsedData.bedding,
        lift: parsedData.lift,
        drinkingWater: parsedData.drinkingWater,
        highSpeedWifi: parsedData.highSpeedWifi,
        hotWaterSupply: parsedData.hotWaterSupply,
        professionalHousekeeping: parsedData.professionalHousekeeping,
        laundryFacilities: parsedData.laundryFacilities,
        biometricEntry: parsedData.biometricEntry,
        hotMealsIncluded: parsedData.hotMealsIncluded,
        security24x7: parsedData.security24x7,
        diningArea: parsedData.diningArea,
        foodMenu: parsedData.foodMenu,
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

export async function getRooms(query: GetRoomsDtoType) {
  try {
    const whereCondition = {
      roomNumber: query.roomNumber || undefined,
      pgId: query.pgId || undefined,
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
      airConditioned: query.airConditioned || undefined,
      wifi: query.wifi || undefined,
      refrigerator: query.refrigerator || undefined,
      housekeeping: query.housekeeping || undefined,
      powerBackup: query.powerBackup || undefined,
      bedding: query.bedding || undefined,
      lift: query.lift || undefined,
      drinkingWater: query.drinkingWater || undefined,
      highSpeedWifi: query.highSpeedWifi || undefined,
      hotWaterSupply: query.hotWaterSupply || undefined,
      professionalHousekeeping: query.professionalHousekeeping || undefined,
      laundryFacilities: query.laundryFacilities || undefined,
      biometricEntry: query.biometricEntry || undefined,
      hotMealsIncluded: query.hotMealsIncluded || undefined,
      security24x7: query.security24x7 || undefined,
      diningArea: query.diningArea || undefined,
      foodMenu: query.foodMenu || undefined,
    };

    const rooms = await prisma.room.findMany({
      where: whereCondition,
      include: {
        pg: true,
        roomTenants: true,
        tenantRequest: true,
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

export async function getRoomById(id: number) {
  try {
    const room = await prisma.room.findUnique({
      where: {
        id,
      },
      include: {
        pg: true,
        roomTenants: true,
        tenantRequest: true,
      },
    });

    if (!room) {
      throw new Error("Room not found");
    }

    return room;
  } catch (error) {
    throw new Error(
      `Error fetching room by ID: ${
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
