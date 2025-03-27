import z from "zod";


const BaseRoomTenantSchema = z.object({
  userId: z.number(),
  roomId: z.number(),

  pGId: z.number().optional(),
});

export const CreateRoomTenantDtoType = z.object({
  userId: z.number(),
  roomId: z.number(),
  pGId: z.number().optional(),
});
export type CreateRoomTenantDtoType = z.infer<typeof CreateRoomTenantDtoType>;

export const getRoomTenantsDtoType = z.object({
  roomId: z.number().optional(),
  userId: z.number().optional(),
});

export type getRoomTenantsDtoType = z.infer<typeof getRoomTenantsDtoType>;


export const DeleteRoomTenantDtoType = BaseRoomTenantSchema;
export type DeleteRoomTenantDtoType = z.infer<typeof DeleteRoomTenantDtoType>;


export const GetRoomTenantDtoType = BaseRoomTenantSchema;
export type GetRoomTenantDtoType = z.infer<typeof GetRoomTenantDtoType>;


export const UpdateRoomTenantDtoType = BaseRoomTenantSchema.partial();
export type UpdateRoomTenantDtoType = z.infer<typeof UpdateRoomTenantDtoType>;
