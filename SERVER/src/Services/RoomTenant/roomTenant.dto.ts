import z from "zod";


const BaseRoomTenantSchema = z.object({
  userId: z.number(),
  roomId: z.number(),
});

export const CreateRoomTenantDtoType = BaseRoomTenantSchema.extend({
});
export type CreateRoomTenantDtoType = z.infer<typeof CreateRoomTenantDtoType>;


export const DeleteRoomTenantDtoType = BaseRoomTenantSchema;
export type DeleteRoomTenantDtoType = z.infer<typeof DeleteRoomTenantDtoType>;


export const GetRoomTenantDtoType = BaseRoomTenantSchema;
export type GetRoomTenantDtoType = z.infer<typeof GetRoomTenantDtoType>;


export const UpdateRoomTenantDtoType = BaseRoomTenantSchema.partial();
export type UpdateRoomTenantDtoType = z.infer<typeof UpdateRoomTenantDtoType>;
