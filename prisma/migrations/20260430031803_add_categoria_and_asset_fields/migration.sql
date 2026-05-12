/*
  Warnings:

  - You are about to drop the column `ubicacion` on the `Equipo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Equipo` DROP COLUMN `ubicacion`,
    ADD COLUMN `ubicacionId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Ubicacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `direccion` TEXT NULL,
    `parentUbicacionId` INTEGER NULL,
    `ponerEnMapa` BOOLEAN NOT NULL DEFAULT false,
    `latitud` DOUBLE NULL,
    `longitud` DOUBLE NULL,
    `imagenUrl` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_TrabajadoresEnUbicacion` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TrabajadoresEnUbicacion_AB_unique`(`A`, `B`),
    INDEX `_TrabajadoresEnUbicacion_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ContratistaToUbicacion` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ContratistaToUbicacion_AB_unique`(`A`, `B`),
    INDEX `_ContratistaToUbicacion_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProveedorToUbicacion` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProveedorToUbicacion_AB_unique`(`A`, `B`),
    INDEX `_ProveedorToUbicacion_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ubicacion` ADD CONSTRAINT `Ubicacion_parentUbicacionId_fkey` FOREIGN KEY (`parentUbicacionId`) REFERENCES `Ubicacion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Equipo` ADD CONSTRAINT `Equipo_ubicacionId_fkey` FOREIGN KEY (`ubicacionId`) REFERENCES `Ubicacion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TrabajadoresEnUbicacion` ADD CONSTRAINT `_TrabajadoresEnUbicacion_A_fkey` FOREIGN KEY (`A`) REFERENCES `Ubicacion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TrabajadoresEnUbicacion` ADD CONSTRAINT `_TrabajadoresEnUbicacion_B_fkey` FOREIGN KEY (`B`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ContratistaToUbicacion` ADD CONSTRAINT `_ContratistaToUbicacion_A_fkey` FOREIGN KEY (`A`) REFERENCES `Contratista`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ContratistaToUbicacion` ADD CONSTRAINT `_ContratistaToUbicacion_B_fkey` FOREIGN KEY (`B`) REFERENCES `Ubicacion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProveedorToUbicacion` ADD CONSTRAINT `_ProveedorToUbicacion_A_fkey` FOREIGN KEY (`A`) REFERENCES `Proveedor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProveedorToUbicacion` ADD CONSTRAINT `_ProveedorToUbicacion_B_fkey` FOREIGN KEY (`B`) REFERENCES `Ubicacion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
