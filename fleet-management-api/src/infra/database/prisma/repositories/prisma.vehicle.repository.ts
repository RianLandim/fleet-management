import { VehicleRepository } from '@app/repositories/vehicle.repository';
import { PrismaService } from '../prisma.service';
import { Vehicle } from '@app/entities/vehicle';
import { PrismaVehicleMapper } from '../mappers/prisma.vehicle.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaVehicleRepository implements VehicleRepository {
  constructor(private prisma: PrismaService) {}

  async create(vehicle: Vehicle): Promise<void> {
    const rawVehicle = PrismaVehicleMapper.toPrisma(vehicle);

    await this.prisma.vehicle.create({
      data: rawVehicle,
    });
  }

  async list(companyId: string): Promise<Vehicle[]> {
    const prismaVehicles = await this.prisma.vehicle.findMany({
      where: { companyId },
    });

    const vehicles = prismaVehicles.map((vehicle) => new Vehicle(vehicle));

    return vehicles;
  }
}
