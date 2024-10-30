import { Maintenance } from "@src/dtos/MaintenanceDto";
import { prisma } from "@src/libs/prisma";

export interface IMaintenanceModel {
  create(
    props: Omit<Maintenance, "created_at" | "active">
  ): Promise<Maintenance>;
  findById(id: string): Promise<Maintenance | null>;
  findMany(page: number, limit: number): Promise<Maintenance[]>;
  update(props: Omit<Maintenance, "created_at">): Promise<Maintenance>;
}

export class MaintenanceModel implements IMaintenanceModel {
  async create(
    props: Omit<Maintenance, "created_at" | "active">
  ): Promise<Maintenance> {
    return prisma.maintenance.create({ data: props });
  }

  async findById(id: string): Promise<Maintenance | null> {
    return prisma.maintenance.findFirst({
      where: {
        id,
        active: true,
      },
    });
  }

  async findMany(page: number, limit: number): Promise<Maintenance[]> {
    return prisma.maintenance.findMany({
      where: { active: true },
      take: limit,
      skip: page,
    });
  }

  async update(
    props: Omit<Maintenance, "created_at" | "active">
  ): Promise<Maintenance> {
    return prisma.maintenance.update({
      where: { id: props.id },
      data: props,
    });
  }

  async inactive(id: string): Promise<void> {
    prisma.maintenance.update({
      where: { id },
      data: {
        active: false,
      },
    });
  }
}
