import z from "zod";

export const CreateRoomDtoSchema = z.object({
  roomNumber: z.number(),
  roomName: z.string(),
  roomType: z.enum(["SINGLE", "DOUBLE", "TRIPLE", "QUADRIPLE", "STANDARD", "PREMIUM"]),
  floor: z.number(),
  blockName: z.string(),
  rentPrice: z.number(),
  depositPrice: z.number(),
  roomSize: z.number(),
  availableStatus: z.boolean(),
  attachedBathrooms: z.boolean(),
  balconyStatus: z.boolean(),
  cctvStatus: z.boolean(),
});

export type CreateRoomDtoType = z.infer<typeof CreateRoomDtoSchema>;

export const GetRoomsDtoSchema = z.object({
id: z.string().optional(),
  roomNumber: z.number().optional(),
  roomName: z.string().optional(),
  roomType: z.enum(["SINGLE", "DOUBLE", "TRIPLE", "QUADRIPLE", "STANDARD", "PREMIUM"]).optional(),
  floor: z.number().optional(),
  blockName: z.string().optional(),
  rentPrice: z.number().optional(),
  depositPrice: z.number().optional(),
  roomSize: z.number().optional(),
  availableStatus: z.boolean().optional(),
  attachedBathrooms: z.boolean().optional(),
  balconyStatus: z.boolean().optional(),
  cctvStatus: z.boolean().optional(),
});

export type GetRoomsDtoType = z.infer<typeof GetRoomsDtoSchema>;
export const UpdateRoomDtoSchema = z.object({
  roomNumber: z.number().optional(),
  roomName: z.string().optional(),
  roomType: z.enum(["SINGLE", "DOUBLE", "TRIPLE", "QUADRIPLE", "STANDARD", "PREMIUM"]).optional(),
  floor: z.number().optional(),
  blockName: z.string().optional(),
  rentPrice: z.number().optional(),
  depositPrice: z.number().optional(),
  roomSize: z.number().optional(),
  availableStatus: z.boolean().optional(),
  attachedBathrooms: z.boolean().optional(),
  balconyStatus: z.boolean().optional(),
  cctvStatus: z.boolean().optional(),
});

export type UpdateRoomDtoType = z.infer<typeof UpdateRoomDtoSchema>;
