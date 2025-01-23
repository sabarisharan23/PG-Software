import z from 'zod';

export const CreateUserDtoSchema = z.object({
  id: z.number(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
});
 
export type CreateUserDtoType = z.infer<typeof CreateUserDtoSchema>;