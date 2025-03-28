import { PrismaClient } from "@prisma/client";
import {
  CreatePgAdminAssignmentDtoType,
  DeletePgAdminAssignmentDtoType,
  getAllPgAdminDtoType,
  
  UpdatePgAdminAssignmentDtoType,
} from "./pgAdminAssignment.dto";

const prisma = new PrismaClient();

export async function createPgAdminAssignment(
  parsedData: CreatePgAdminAssignmentDtoType
) {
  try {
    const existingPgAdminAssignment = await prisma.pgAssignedAdmin.findUnique({
      where: {
        adminId_pgId: {
          adminId: parsedData.adminId,
          pgId: parsedData.pgId,
        },
      },
    });

    if (existingPgAdminAssignment) {
      throw new Error("Admin already assigned to theis PG");
    }

    const pgAdminAssignment = await prisma.pgAssignedAdmin.create({
      data: {
        adminId: parsedData.adminId,
        pgId: parsedData.pgId,
      }, include: {
        admin: true, pg: true
      }
    });
    return pgAdminAssignment;
  } catch (error) {
    throw new Error(
      `Error creating PgAdminAssignment: ${error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
export async function getAllPgAdmins(query: getAllPgAdminDtoType) {
  try {
 const whereCondition ={
   adminId: query.adminId || undefined,
   pgId: query.pgId || undefined,
 }

    const allAdmins = await prisma.pgAssignedAdmin.findMany({
      where: whereCondition,
      include: {
        admin: true,
        pg: true,
      },
    });

    return allAdmins;
  } catch (error) {
    throw new Error(
      `Error fetching AllPgAdmin: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function getPgAdminAssignment(adminId: number, pgId: number) {
  try {
    const pgAdminAssignment = await prisma.pgAssignedAdmin.findUnique({
      where: {
        adminId_pgId: {
          adminId,
          pgId,
        },
      },
      include: {
        admin: true,
        pg: true,
      },
    });

    return pgAdminAssignment;
  } catch (error) {
    throw new Error(
      `Error fetching PgAdminAssignment: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}


export async function updatePgAdminAssignment(adminId: number, pgId: number, parsedData: Partial<UpdatePgAdminAssignmentDtoType>) {
  try {
    const assignedAdmin = await prisma.pgAssignedAdmin.findUnique({

      
      where: {
        adminId_pgId: {
          adminId,
          pgId
        }
      }
    });
    console.log("assigned admin",assignedAdmin);
    if (!assignedAdmin) {
      throw new Error("Assigned Admin not found");
    };
    const updatedAssignedAdmin = await prisma.pgAssignedAdmin.update({
      where: {
        adminId_pgId: {
          adminId,
          pgId,
        },
      },
      data: parsedData,
    });
    return updatedAssignedAdmin;
  } catch (error) {
    throw new Error(
      `Error updating PgAdminAssignment: ${error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function deletePgAdminAssignment(parsedData: DeletePgAdminAssignmentDtoType) {
  try {
    const assignedAdmin = await prisma.pgAssignedAdmin.findUnique({
      where: {
        adminId_pgId: {
          adminId: parsedData.adminId,
          pgId: parsedData.pgId,
        },
      },
      include: {
        pg: true,
        admin: true,
      },
    });

    if (!assignedAdmin) {
      throw new Error("Assigned Admin not found");
    }

    await prisma.pgAssignedAdmin.delete({
      where: {
        adminId_pgId: {
          adminId: parsedData.adminId,
          pgId: parsedData.pgId,
        },
      },
      include: {
        pg: true,
        admin: true,
      },
    });

    return { success: true, message: "PgAdminAssignment deleted successfully" };
  } catch (error) {
    throw new Error(
      `Error deleting PgAdminAssignment: ${error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}