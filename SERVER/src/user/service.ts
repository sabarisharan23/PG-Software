import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { CreateUserDtoType, UpdateUserDtoType,GetUsersDtoType } from "./user.dto";

const prisma = new PrismaClient();

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


    return newUser;
  } catch (error) {
    throw new Error(
      `Error creating user: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
} 

export async function getUsers(query: GetUsersDtoType) {
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
        roomTenants: true,
        managedPgs: true,
        ownedPgs: true,
      },
    });

    return users;
  } catch (error) {
    throw new Error(
      `Error fetching users: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function updateUser(id: number, parsedData: UpdateUserDtoType) {
  const existingUser = await prisma.user.findUnique({ where: { id } });
  if (!existingUser) {
    throw new Error("User not found");
  }

  const updateUser = await prisma.user.update({
    where: { id },
    data: parsedData,
  });

  return updateUser;
}

export async function deleteUser(id: number) {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error("User not found");
    }

    if (user.role === "TENANT") {
      await prisma.roomTenant.deleteMany({ where: { userId: id } });
    }

    await prisma.user.delete({ where: { id } });

    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    throw new Error(
      `Error deleting user: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
