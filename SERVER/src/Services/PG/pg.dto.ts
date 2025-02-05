import z from "zod";

// Create PG DTO
export const CreatePGDtoSchema = z.object({
  pgName: z.string(),
  location: z.string(),
  ownedById: z.number(),
});

export type CreatePGDtoType = z.infer<typeof CreatePGDtoSchema>;

// Get PGs DTO
export const GetPGsDtoSchema = z.object({
  id: z.string().optional().transform((val) => (val ? parseInt(val, 10) : undefined)),
  pgName: z.string().optional(),
  location: z.string().optional(),
});

export type GetPGsDtoType = z.infer<typeof GetPGsDtoSchema>;

// Update PG DTO
export const UpdatePGDtoSchema = z.object({
  pgName: z.string().optional(),
  location: z.string().optional(),
});

export type UpdatePGDtoType = z.infer<typeof UpdatePGDtoSchema>;
