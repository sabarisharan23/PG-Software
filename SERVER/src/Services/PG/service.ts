import { PrismaClient } from "@prisma/client";
import { CreatePGDtoType, UpdatePGDtoType } from "./pg.dto";

const prisma = new PrismaClient();

function isSuperAdmin(userRole: string): boolean {
  return userRole === "SUPER_ADMIN";
}

export async function createPG(parsedData: CreatePGDtoType, userRole: string) {
  try {
  
    if (!isSuperAdmin(userRole)) {
      throw new Error("You do not have permission to create a PG.");
    }

    const existingPG = await prisma.pG.findUnique({
      where: {
        pgName: parsedData.pgName,
      },
    });
    
    if (existingPG) {
      throw new Error("PG already exists");
    }

    const newPG = await prisma.pG.create({
      data: {
        pgName: parsedData.pgName,
        location: parsedData.location,
        ownedById: parsedData.ownedById,
      },
    });

    return newPG;
  } catch (error) {
    throw new Error(
      `Error creating PG: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

export async function getPGs(query: any, userRole: string) {
  try {
  
    if (!isSuperAdmin(userRole)) {
      throw new Error("You do not have permission to view PGs.");
    }

    const whereCondition: any = {
      id: query.id !== undefined ? query.id : undefined,
      pgName: query.pgName || undefined,
      location: query.location || undefined,
    };

    const pgs = await prisma.pG.findMany({
      where: whereCondition,
      include: {
        ownedBy: true,
        assignedAdmins: true,
        rooms: true,
        
      },
    });

    return pgs;
  } catch (error) {
    throw new Error(
      `Error fetching PGs: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

export async function updatePG(id: number, parsedData: UpdatePGDtoType, userRole: string) {
  try {
  
    if (!isSuperAdmin(userRole)) {
      throw new Error("You do not have permission to update PG details.");
    }

    const existingPG = await prisma.pG.findUnique({ where: { id } });
    if (!existingPG) {
      throw new Error("PG not found");
    }

  
    const updatedPG = await prisma.pG.update({
      where: { id },
      data: parsedData,
    });

    return updatedPG;
  } catch (error) {
    throw new Error(
      `Error updating PG: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

export async function deletePG(id: number, userRole: string) {
  try {
  
    if (!isSuperAdmin(userRole)) {
      throw new Error("You do not have permission to delete PG.");
    }

    const pg = await prisma.pG.findUnique({ where: { id } });
    if (!pg) {
      throw new Error("PG not found");
    }

  
    await prisma.pG.delete({ where: { id } });

    return { success: true, message: "PG deleted successfully" };
  } catch (error) {
    throw new Error(
      `Error deleting PG: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}
