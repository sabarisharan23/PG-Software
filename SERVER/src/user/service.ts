import { CreateUserDtoType } from "./user.dto";
import { PrismaClient } from "@prisma/client";
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

    const newUser = await prisma.user.create({
      data: {
        firstname: parsedData.firstname,
        lastname: parsedData.lastname,
        username: parsedData.username,
        email: parsedData.email,
        password: parsedData.password,
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
