-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'TENANT');

-- CreateEnum
CREATE TYPE "Room_Type" AS ENUM ('SINGLE', 'DOUBLE', 'TRIPLE', 'QUADRUPLE', 'STANDARD', 'PREMIUM');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'TENANT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pg" (
    "id" SERIAL NOT NULL,
    "pgName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "owned_by" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pg_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "room_number" INTEGER NOT NULL,
    "roomName" TEXT NOT NULL,
    "roomType" "Room_Type" NOT NULL DEFAULT 'SINGLE',
    "floor" INTEGER NOT NULL,
    "blockName" TEXT NOT NULL,
    "rentPrice" DECIMAL(65,30) NOT NULL,
    "depositPrice" DECIMAL(65,30) NOT NULL,
    "roomSize" DOUBLE PRECISION NOT NULL,
    "availableStatus" BOOLEAN NOT NULL DEFAULT true,
    "attachedBathrooms" BOOLEAN NOT NULL DEFAULT true,
    "balconyStatus" BOOLEAN NOT NULL DEFAULT true,
    "cctvStatus" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pg_id" INTEGER NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomTenant" (
    "user_id" INTEGER NOT NULL,
    "room_id" INTEGER NOT NULL,
    "pGId" INTEGER,

    CONSTRAINT "RoomTenant_pkey" PRIMARY KEY ("user_id","room_id")
);

-- CreateTable
CREATE TABLE "PgAssignedAdmin" (
    "admin_id" INTEGER NOT NULL,
    "pg_id" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PgAssignedAdmin_pkey" PRIMARY KEY ("admin_id","pg_id")
);

-- CreateTable
CREATE TABLE "TenantRequest" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "requested_by" INTEGER NOT NULL,
    "room_id" INTEGER NOT NULL,
    "pg_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "TenantRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pg_pgName_key" ON "pg"("pgName");

-- CreateIndex
CREATE UNIQUE INDEX "Room_room_number_key" ON "Room"("room_number");

-- CreateIndex
CREATE UNIQUE INDEX "RoomTenant_user_id_key" ON "RoomTenant"("user_id");

-- AddForeignKey
ALTER TABLE "pg" ADD CONSTRAINT "pg_owned_by_fkey" FOREIGN KEY ("owned_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_pg_id_fkey" FOREIGN KEY ("pg_id") REFERENCES "pg"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomTenant" ADD CONSTRAINT "RoomTenant_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomTenant" ADD CONSTRAINT "RoomTenant_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomTenant" ADD CONSTRAINT "RoomTenant_pGId_fkey" FOREIGN KEY ("pGId") REFERENCES "pg"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PgAssignedAdmin" ADD CONSTRAINT "PgAssignedAdmin_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PgAssignedAdmin" ADD CONSTRAINT "PgAssignedAdmin_pg_id_fkey" FOREIGN KEY ("pg_id") REFERENCES "pg"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenantRequest" ADD CONSTRAINT "TenantRequest_requested_by_fkey" FOREIGN KEY ("requested_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenantRequest" ADD CONSTRAINT "TenantRequest_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenantRequest" ADD CONSTRAINT "TenantRequest_pg_id_fkey" FOREIGN KEY ("pg_id") REFERENCES "pg"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
