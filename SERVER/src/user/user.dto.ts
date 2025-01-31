import e from "cors";
import z from "zod";

export const CreateUserDtoSchema = z.object({
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.enum(["SUPER_ADMIN", "ADMIN", "USER"]),
});

export type CreateUserDtoType = z.infer<typeof CreateUserDtoSchema>;

export const GetUsersDtoSchema = z.object({
  id: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined)),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  username: z.string().optional(),
  email: z.string().optional(),
  role: z.enum(["SUPER_ADMIN", "ADMIN", "USER"]).optional(),
});

export type GetUsersDtoType = z.infer<typeof GetUsersDtoSchema>;

export const UpdateUserDtoSchema = z.object({
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  username: z.string().optional(),
  email: z.string().optional(),
  role: z.enum(["SUPER_ADMIN", "ADMIN", "USER"]).optional(),
});
export type UpdateUserDtoType = z.infer<typeof UpdateUserDtoSchema>;
