-- CreateTable
CREATE TABLE `Equipo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `tipo` ENUM('MOBILIARIO', 'MAQUINARIA') NOT NULL,
    `numeroSerie` VARCHAR(191) NOT NULL,
    `estado` ENUM('OPERATIVO', 'EN_MANTENIMIENTO', 'DADO_DE_BAJA') NOT NULL DEFAULT 'OPERATIVO',
    `kmActuales` DOUBLE NULL DEFAULT 0,
    `horasActuales` DOUBLE NULL DEFAULT 0,
    `departamentoId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Equipo_numeroSerie_key`(`numeroSerie`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ImagenEquipo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` TEXT NOT NULL,
    `nombre` VARCHAR(191) NULL,
    `equipoId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Departamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Departamento_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `externoId` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `departamentoId` INTEGER NOT NULL,

    UNIQUE INDEX `Usuario_externoId_key`(`externoId`),
    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlanMantenimiento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(191) NOT NULL,
    `frecuenciaDias` INTEGER NULL,
    `frecuenciaKm` DOUBLE NULL,
    `frecuenciaHoras` DOUBLE NULL,
    `equipoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SolicitudMantenimiento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` TEXT NOT NULL,
    `prioridad` ENUM('BAJA', 'MEDIA', 'ALTA', 'CRITICA') NOT NULL DEFAULT 'MEDIA',
    `estado` ENUM('PENDIENTE', 'APROBADA', 'RECHAZADA', 'EN_PROCESO') NOT NULL DEFAULT 'PENDIENTE',
    `fechaCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `equipoId` INTEGER NOT NULL,
    `solicitanteId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrdenTrabajo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(191) NOT NULL,
    `tipo` ENUM('PREVENTIVO', 'CORRECTIVO') NOT NULL,
    `estado` ENUM('ABIERTA', 'EN_PROCESO', 'COMPLETADA', 'CANCELADA') NOT NULL DEFAULT 'ABIERTA',
    `descripcion` TEXT NOT NULL,
    `fechaProgramada` DATETIME(3) NOT NULL,
    `fechaInicio` DATETIME(3) NULL,
    `fechaFin` DATETIME(3) NULL,
    `lecturaKm` DOUBLE NULL,
    `lecturaHoras` DOUBLE NULL,
    `equipoId` INTEGER NOT NULL,
    `responsableId` INTEGER NOT NULL,
    `solicitudId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `OrdenTrabajo_codigo_key`(`codigo`),
    UNIQUE INDEX `OrdenTrabajo_solicitudId_key`(`solicitudId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ActividadOT` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(191) NOT NULL,
    `realizada` BOOLEAN NOT NULL DEFAULT false,
    `observaciones` TEXT NULL,
    `ordenTrabajoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Equipo` ADD CONSTRAINT `Equipo_departamentoId_fkey` FOREIGN KEY (`departamentoId`) REFERENCES `Departamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImagenEquipo` ADD CONSTRAINT `ImagenEquipo_equipoId_fkey` FOREIGN KEY (`equipoId`) REFERENCES `Equipo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_departamentoId_fkey` FOREIGN KEY (`departamentoId`) REFERENCES `Departamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlanMantenimiento` ADD CONSTRAINT `PlanMantenimiento_equipoId_fkey` FOREIGN KEY (`equipoId`) REFERENCES `Equipo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SolicitudMantenimiento` ADD CONSTRAINT `SolicitudMantenimiento_equipoId_fkey` FOREIGN KEY (`equipoId`) REFERENCES `Equipo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SolicitudMantenimiento` ADD CONSTRAINT `SolicitudMantenimiento_solicitanteId_fkey` FOREIGN KEY (`solicitanteId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrdenTrabajo` ADD CONSTRAINT `OrdenTrabajo_equipoId_fkey` FOREIGN KEY (`equipoId`) REFERENCES `Equipo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrdenTrabajo` ADD CONSTRAINT `OrdenTrabajo_responsableId_fkey` FOREIGN KEY (`responsableId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrdenTrabajo` ADD CONSTRAINT `OrdenTrabajo_solicitudId_fkey` FOREIGN KEY (`solicitudId`) REFERENCES `SolicitudMantenimiento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActividadOT` ADD CONSTRAINT `ActividadOT_ordenTrabajoId_fkey` FOREIGN KEY (`ordenTrabajoId`) REFERENCES `OrdenTrabajo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
