import z from "zod";

const baseSchema = z.object({
  userId: z.number(),
  roomId: z.number(),
  pgId: z.number(),
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
});

export const CreateRequestDtoType = baseSchema;
export type CreateRequestDtoType = z.infer<typeof CreateRequestDtoType>;

export const GetRequestDtoType = z.object({
  id: z.string().optional().transform((val) => (val ? parseInt(val, 10) : undefined)),  // Converts string to number
  userId: z.string().optional().transform((val) => (val ? parseInt(val, 10) : undefined)),
  roomId: z.string().optional().transform((val) => (val ? parseInt(val, 10) : undefined)),
  pgId: z.string().optional().transform((val) => (val ? parseInt(val, 10) : undefined)),
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]).optional(),
});

export type GetRequestDtoType = z.infer<typeof GetRequestDtoType>;

export const UpdateRequestDtoType = baseSchema;
export type UpdateRequestDtoType = z.infer<typeof UpdateRequestDtoType>;

export const DeleteRequestDtoType = baseSchema;
export type DeleteRequestDtoType = z.infer<typeof DeleteRequestDtoType>;