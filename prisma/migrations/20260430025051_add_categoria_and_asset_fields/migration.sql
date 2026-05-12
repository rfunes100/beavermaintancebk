-- AlterTable
ALTER TABLE `Equipo` ADD COLUMN `contratistaId` INTEGER NULL,
    ADD COLUMN `equipoPadreId` INTEGER NULL,
    ADD COLUMN `fechaExpiracionGarantia` DATETIME(3) NULL,
    ADD COLUMN `fechaPuestaServicio` DATETIME(3) NULL,
    ADD COLUMN `informacionAdicional` TEXT NULL,
    ADD COLUMN `proveedorId` INTEGER NULL,
    ADD COLUMN `trabajadorPrincipalId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Contratista` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Contratista_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Proveedor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `contacto` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Proveedor_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_TrabajadoresAdicionales` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TrabajadoresAdicionales_AB_unique`(`A`, `B`),
    INDEX `_TrabajadoresAdicionales_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Equipo` ADD CONSTRAINT `Equipo_trabajadorPrincipalId_fkey` FOREIGN KEY (`trabajadorPrincipalId`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Equipo` ADD CONSTRAINT `Equipo_equipoPadreId_fkey` FOREIGN KEY (`equipoPadreId`) REFERENCES `Equipo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Equipo` ADD CONSTRAINT `Equipo_contratistaId_fkey` FOREIGN KEY (`contratistaId`) REFERENCES `Contratista`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Equipo` ADD CONSTRAINT `Equipo_proveedorId_fkey` FOREIGN KEY (`proveedorId`) REFERENCES `Proveedor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TrabajadoresAdicionales` ADD CONSTRAINT `_TrabajadoresAdicionales_A_fkey` FOREIGN KEY (`A`) REFERENCES `Equipo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TrabajadoresAdicionales` ADD CONSTRAINT `_TrabajadoresAdicionales_B_fkey` FOREIGN KEY (`B`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
