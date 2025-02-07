/*
  Warnings:

  - A unique constraint covering the columns `[requested_by,room_id]` on the table `TenantRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TenantRequest_requested_by_room_id_key" ON "TenantRequest"("requested_by", "room_id");
