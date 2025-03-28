import { get } from "http";
import z from "zod";

// Base Schema for Admin Assignment
const BaseAdminAssignmentSchema = z.object({
  adminId: z.number(),
  pgId: z.number(),
});

// Create Admin Assignment DTO
export const CreatePgAdminAssignmentDtoType = BaseAdminAssignmentSchema;
export type CreatePgAdminAssignmentDtoType = z.infer<typeof CreatePgAdminAssignmentDtoType>;

export const getAllPgAdminDtoType = z.object({
  adminId: z.number().optional(),
  pgId: z.number().optional(),
}); 

export type getAllPgAdminDtoType = z.infer<typeof getAllPgAdminDtoType>;
// Delete Admin Assignment DTO
export const DeletePgAdminAssignmentDtoType = BaseAdminAssignmentSchema;
export type DeletePgAdminAssignmentDtoType = z.infer<typeof DeletePgAdminAssignmentDtoType>;

// Get Admin Assignment DTO
export const GetPgAdminAssignmentDtoType = BaseAdminAssignmentSchema;
export type GetPgAdminAssignmentDtoType = z.infer<typeof GetPgAdminAssignmentDtoType>;

// Update Admin Assignment DTO (Allows Partial Updates)
export const UpdatePgAdminAssignmentDtoType = BaseAdminAssignmentSchema.partial();
export type UpdatePgAdminAssignmentDtoType = z.infer<typeof UpdatePgAdminAssignmentDtoType>;
