import env from "@src/config/config";
import { LayersDto } from "@src/dtos/LayersDto";
import { Users } from "@src/dtos/UsersDto";
import { prisma } from "@src/libs/prisma";

export interface ILayersModel {
  create(data: Omit<LayersDto, "created_at">): Promise<LayersDto>;
  findById(id: string): Promise<LayersDto | null>;
  findAll(): Promise<LayersDto[]>;
  update(data: Omit<LayersDto, "father" | "created_at">): Promise<LayersDto>;
}

export class LayersModel implements ILayersModel {
  async create(data: Omit<LayersDto, "created_at">): Promise<LayersDto> {
    return prisma.layers.create({ data });
  }

  async findById(id: string): Promise<LayersDto | null> {
    return prisma.layers.findFirst({
      where: {
        id,
      },
    });
  }

  async findByFatherId(father_id: string): Promise<LayersDto[]> {
    return prisma.layers.findMany({
      where: {
        father: father_id,
      },
    });
  }

  async findAll(): Promise<LayersDto[]> {
    return prisma.layers.findMany({
      where: {
        father: null,
      },
    });
  }

  async update(
    data: Omit<LayersDto, "father" | "created_at">
  ): Promise<LayersDto> {
    return prisma.layers.update({
      where: {
        id: data.id,
      },
      data,
    });
  }
}
