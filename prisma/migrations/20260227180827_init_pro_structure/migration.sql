-- CreateTable
CREATE TABLE "companies" (
    "id" SERIAL NOT NULL,
    "publicId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sectors" (
    "id" SERIAL NOT NULL,
    "publicId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "sectors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "computers" (
    "id" SERIAL NOT NULL,
    "publicId" TEXT NOT NULL,
    "hwUuid" TEXT NOT NULL,
    "serialNumber" TEXT,
    "hostname" TEXT NOT NULL,
    "sectorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "computers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "telemetries" (
    "id" BIGSERIAL NOT NULL,
    "computerId" INTEGER NOT NULL,
    "osName" TEXT NOT NULL,
    "osVersion" TEXT NOT NULL,
    "uptimeSeconds" INTEGER NOT NULL,
    "cpuModel" TEXT NOT NULL,
    "cpuGlobalUsage" DOUBLE PRECISION NOT NULL,
    "cpuCores" JSONB NOT NULL,
    "totalRamKb" BIGINT NOT NULL,
    "usedRamKb" BIGINT NOT NULL,
    "ramUsagePercent" DOUBLE PRECISION NOT NULL,
    "gpus" JSONB NOT NULL,
    "disks" JSONB NOT NULL,
    "networks" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "telemetries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_publicId_key" ON "companies"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "companies_name_key" ON "companies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "sectors_publicId_key" ON "sectors"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "computers_publicId_key" ON "computers"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "computers_hwUuid_key" ON "computers"("hwUuid");

-- CreateIndex
CREATE INDEX "telemetries_computerId_idx" ON "telemetries"("computerId");

-- CreateIndex
CREATE INDEX "telemetries_createdAt_idx" ON "telemetries"("createdAt");

-- AddForeignKey
ALTER TABLE "sectors" ADD CONSTRAINT "sectors_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "computers" ADD CONSTRAINT "computers_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "sectors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "telemetries" ADD CONSTRAINT "telemetries_computerId_fkey" FOREIGN KEY ("computerId") REFERENCES "computers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
