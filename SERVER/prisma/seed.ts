import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Seeding database...");

  const superAdmin = await prisma.user.upsert({
    where: { email: "superadmin@example.com" },
    update: {},
    create: {
      firstname: "Super",
      lastname: "Admin",
      username: "superadmin",
      email: "superadmin@example.com",
      password: "hashed_password_here", // Ensure this is securely hashed
      role: "SUPER_ADMIN",
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      firstname: "Admin",
      lastname: "User",
      username: "admin",
      email: "admin@example.com",
      password: "hashed_password_here",
      role: "ADMIN",
    },
  });

  const tenant = await prisma.user.upsert({
    where: { email: "tenant@example.com" },
    update: {},
    create: {
      firstname: "Tenant",
      lastname: "User",
      username: "tenant",
      email: "tenant@example.com",
      password: "hashed_password_here",
      role: "TENANT",
    },
  });

  const pg = await prisma.pG.upsert({
    where: { pgName: "My PG" },
    update: {},
    create: {
      pgName: "My PG",
      location: "Downtown",
      ownedById: superAdmin.id,
    },
  });

  await prisma.pgAssignedAdmin.upsert({
    where: { adminId_pgId: { adminId: admin.id, pgId: pg.id } },
    update: {},
    create: {
      adminId: admin.id,
      pgId: pg.id,
    },
  });

  const room = await prisma.room.upsert({
    where: { roomNumber: 101 },
    update: {},
    create: {
      roomNumber: 101,
      roomName: "Single Room",
      roomType: "SINGLE",
      floor: 1,
      blockName: "A",
      rentPrice: 5000.0,
      depositPrice: 10000.0,
      roomSize: 20.5,
      availableStatus: true,
      pgId: pg.id,
    },
  });

  await prisma.roomTenant.upsert({
    where: { userId: tenant.id },
    update: {},
    create: {
      userId: tenant.id,
      roomId: room.id,
      pGId: pg.id,
    },
  });

  await prisma.tenantRequest.create({
    data: {
      userId: tenant.id,
      roomId: room.id,
      pgId: pg.id,
      status: "PENDING",
    },
  });

  console.log("✅ Seeding complete!");
}

main()
  .catch((error) => {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
