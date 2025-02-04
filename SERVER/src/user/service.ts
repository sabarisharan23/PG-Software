import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { CreateUserDtoType, UpdateUserDtoType } from "./user.dto";

const prisma = new PrismaClient();

// Function to create a new user
export async function createUser(parsedData: CreateUserDtoType) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        username: parsedData.username,
      },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(parsedData.password, 10);

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        firstname: parsedData.firstname,
        lastname: parsedData.lastname,
        username: parsedData.username,
        email: parsedData.email,
        password: hashedPassword,
        role: parsedData.role,
      },
    });

    // If role is TENANT and roomId is provided, create the RoomTenant mapping
    if (parsedData.role === "TENANT" && parsedData.roomId) {
      await prisma.roomTenant.create({
        data: {
          userId: newUser.id,
          roomId: parsedData.roomId,
        },
      });
    }

    return newUser;
  } catch (error) {
    throw new Error(
      `Error creating user: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

// Function to get users (with optional filters)
export async function getUsers(query: any) {
  try {
    const whereCondition: any = {
      id: query.id !== undefined ? query.id : undefined,
      firstname: query.firstname || undefined,
      lastname: query.lastname || undefined,
      username: query.username || undefined,
      email: query.email || undefined,
      role: query.role || undefined,
    };

    const users = await prisma.user.findMany({
      where: whereCondition,
      include: {
        roomTenants: true, // Include room tenancy for TENANT users
        managedPgs: true, // Include PGs managed by this user
        ownedPgs: true, // Include PGs owned by this user
      
      },
    });

    return users;
  } catch (error) {
    throw new Error(
      `Error fetching users: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

// Function to update a user's details
export async function updateUser(id: number, parsedData: UpdateUserDtoType) {
  const existingUser = await prisma.user.findUnique({ where: { id } });
  if (!existingUser) {
    throw new Error("User not found");
  }

  // Update user details
  const updateUser = await prisma.user.update({
    where: { id },
    data: parsedData,
  });

  // If the user is a tenant and roomId is provided, update their room assignment
  if (parsedData.role === "TENANT" && parsedData.roomId) {
    await prisma.roomTenant.upsert({
      where: {
        userId_roomId: { userId: id, roomId: parsedData.roomId },
      },
      update: {
        roomId: parsedData.roomId,
      },
      create: {
        userId: id,
        roomId: parsedData.roomId,
      },
    });
  }

  return updateUser;
}

// Function to delete a user
export async function deleteUser(id: number) {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error("User not found");
    }

    // If it's a tenant, remove the room tenancy first
    if (user.role === "TENANT") {
      await prisma.roomTenant.deleteMany({ where: { userId: id } });
    }

    // Delete user
    await prisma.user.delete({ where: { id } });

    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    throw new Error(
      `Error deleting user: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}
