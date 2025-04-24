-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "airConditioned" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "bedding" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "biometricEntry" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "diningArea" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "drinkingWater" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "foodMenu" JSONB,
ADD COLUMN     "highSpeedWifi" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hotMealsIncluded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hotWaterSupply" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "housekeeping" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "laundryFacilities" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lift" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "powerBackup" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "professionalHousekeeping" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "refrigerator" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "security24x7" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "wifi" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "RoomImages" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "room_id" INTEGER NOT NULL,

    CONSTRAINT "RoomImages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RoomImages" ADD CONSTRAINT "RoomImages_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
