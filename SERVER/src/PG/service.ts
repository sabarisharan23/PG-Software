import { PrismaClient } from "@prisma/client";
import { CreatePGDtoType, UpdatePGDtoType } from "./pg.dto";

const prisma = new PrismaClient();

// Helper function to check if user is Super Admin
function isSuperAdmin(userRole: string): boolean {
  return userRole === "SUPER_ADMIN";
}

// Function to create a new PG
export async function createPG(parsedData: CreatePGDtoType, userRole: string) {
  try {
    // Check if the user has the Super Admin role
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

// Function to get PGs (with optional filters)
export async function getPGs(query: any, userRole: string) {
  try {
    // Super Admin can see all PGs
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
        ownedBy: true, // Include PG owner for SUPER_ADMINs
        assignedAdmins: true, // Include PG admins for ADMINs
        rooms: true, // Include PG rooms for TENANTs
      },
    });

    return pgs;
  } catch (error) {
    throw new Error(
      `Error fetching PGs: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

// Function to update a PG's details
export async function updatePG(id: number, parsedData: UpdatePGDtoType, userRole: string) {
  try {
    // Check if the user has Super Admin role
    if (!isSuperAdmin(userRole)) {
      throw new Error("You do not have permission to update PG details.");
    }

    const existingPG = await prisma.pG.findUnique({ where: { id } });
    if (!existingPG) {
      throw new Error("PG not found");
    }

    // Update PG details
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

// Function to delete a PG
export async function deletePG(id: number, userRole: string) {
  try {
    // Check if the user has Super Admin role
    if (!isSuperAdmin(userRole)) {
      throw new Error("You do not have permission to delete PG.");
    }

    const pg = await prisma.pG.findUnique({ where: { id } });
    if (!pg) {
      throw new Error("PG not found");
    }

    // Delete PG
    await prisma.pG.delete({ where: { id } });

    return { success: true, message: "PG deleted successfully" };
  } catch (error) {
    throw new Error(
      `Error deleting PG: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}
