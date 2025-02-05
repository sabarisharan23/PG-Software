import z from "zod";

// Create User DTO schema (for validation when creating a user)
export const CreateUserDtoSchema = z.object({
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.enum(["SUPER_ADMIN", "ADMIN", "TENANT"]),
  roomId: z.number().optional(), // Only for TENANT users
});

export type CreateUserDtoType = z.infer<typeof CreateUserDtoSchema>;

// Get Users DTO schema (for querying users)
export const GetUsersDtoSchema = z.object({
  id: z.string().optional().transform((val) => (val ? parseInt(val, 10) : undefined)),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  username: z.string().optional(),
  email: z.string().optional(),
  role: z.enum(["SUPER_ADMIN", "ADMIN", "TENANT"]).optional(),
  roomId: z.string().optional(), // Only for TENANT users
});

export type GetUsersDtoType = z.infer<typeof GetUsersDtoSchema>;

// Update User DTO schema
export const UpdateUserDtoSchema = z.object({
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  username: z.string().optional(),
  email: z.string().optional(),
  role: z.enum(["SUPER_ADMIN", "ADMIN", "TENANT"]).optional(),
  roomId: z.number().optional(), // Only for TENANT users
});

export type UpdateUserDtoType = z.infer<typeof UpdateUserDtoSchema>;
