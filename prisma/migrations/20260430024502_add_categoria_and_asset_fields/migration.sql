/*
  Warnings:

  - A unique constraint covering the columns `[codigoBarras]` on the table `Equipo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoriaId` to the `Equipo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Equipo` ADD COLUMN `area` VARCHAR(191) NULL,
    ADD COLUMN `categoriaId` INTEGER NOT NULL,
    ADD COLUMN `codigoBarras` VARCHAR(191) NULL,
    ADD COLUMN `costoAdquisicion` DOUBLE NULL,
    ADD COLUMN `descripcion` TEXT NULL,
    ADD COLUMN `fabricante` VARCHAR(191) NULL,
    ADD COLUMN `modelo` VARCHAR(191) NULL,
    ADD COLUMN `potencia` VARCHAR(191) NULL,
    ADD COLUMN `ubicacion` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Categoria_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Equipo_codigoBarras_key` ON `Equipo`(`codigoBarras`);

-- AddForeignKey
ALTER TABLE `Equipo` ADD CONSTRAINT `Equipo_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `Categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
