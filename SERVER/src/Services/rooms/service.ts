import { PrismaClient } from "@prisma/client";
import { CreateRoomDtoType, UpdateRoomDtoType, GetRoomsDtoType } from "./room.dto";
import { v4 as uuidv4 } from "uuid";
import { minioClient } from "../../config/minio";

const prisma = new PrismaClient();
const BUCKET_NAME = "room-images";

export async function createRoom(parsedData: CreateRoomDtoType, files: Express.Multer.File[]) {
  try {
    const existingRoom = await prisma.room.findUnique({
      where: { roomNumber: parsedData.roomNumber },
    });
    if (existingRoom) throw new Error("Room already exists");

    const urls: string[] = [];

    const bucketExists = await minioClient.bucketExists(BUCKET_NAME);
    if (!bucketExists) {
      await minioClient.makeBucket(BUCKET_NAME, "us-east-1");
    }

    for (const file of files) {
      const objectName = `${uuidv4()}-${file.originalname}`;
      await minioClient.putObject(BUCKET_NAME, objectName, file.buffer);
      urls.push(`http://localhost:9000/${BUCKET_NAME}/${objectName}`);
    }

    const newRoom = await prisma.room.create({
      data: {
        ...parsedData,
        roomImages: {
          create: urls.map((url) => ({ url })),
        },
      },
      include: { roomImages: true, tenantRequest: true, roomTenants: true },
    });

    return newRoom;
  } catch (error) {
    throw new Error(`Error creating room: ${error instanceof Error ? error.message : "Unknown error"}`);
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
        roomImages: true
      },
    });

    return rooms;
  } catch (error) {
    throw new Error(
      `Error fetching rooms: ${error instanceof Error ? error.message : "Unknown error"
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
        roomImages: true
      },
    });

    if (!room) {
      throw new Error("Room not found");
    }

    return room;
  } catch (error) {
    throw new Error(
      `Error fetching room by ID: ${error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function updateRoom(id: number, parsedData: UpdateRoomDtoType, files?: Express.Multer.File[]) {
  const existingRoom = await prisma.room.findUnique({
    where: { id },
    include: { roomImages: true },
  });

  if (!existingRoom) {
    throw new Error("Room not found");
  }

  // 🧼 1. Delete old images from MinIO and DB
  if (files && existingRoom.roomImages.length > 0) {
    for (const image of existingRoom.roomImages) {
      const objectName = image.url.split("/").pop(); // extract filename from URL
      if (objectName) {
        await minioClient.removeObject(BUCKET_NAME, objectName);
      }
    }

    await prisma.roomImages.deleteMany({
      where: { roomId: id },
    });
  }

  // 📥 2. Upload new images (if provided)
  const urls: string[] = [];

  if (files && files.length > 0) {
    for (const file of files) {
      const objectName = `${uuidv4()}-${file.originalname}`;
      await minioClient.putObject(BUCKET_NAME, objectName, file.buffer);
      urls.push(`http://localhost:9000/${BUCKET_NAME}/${objectName}`);
    }
  }

  // 🛠 3. Update room and attach new image URLs
  const updatedRoom = await prisma.room.update({
    where: { id },
    data: {
      ...parsedData,
      roomImages: files?.length
        ? {
          create: urls.map((url) => ({ url })),
        }
        : undefined,
    },
    include: {
      roomImages: true,
    },
  });

  return updatedRoom;
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
      `Error deleting room: ${error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
