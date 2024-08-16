import { AssetsDto } from "@src/dtos/AssetsDto";
import { prisma } from "@src/libs/prisma";

export interface IAssetsModel {
  create(data: Omit<AssetsDto, "created_at" | "active">): Promise<AssetsDto>;
  findById(id: string): Promise<AssetsDto | null>;
  findAllByLayerId(layer_id: string): Promise<AssetsDto[]>;
  update(data: Omit<AssetsDto, "father" | "created_at">): Promise<AssetsDto>;
}

export class AssetsModel implements IAssetsModel {
  async create(
    data: Omit<AssetsDto, "created_at" | "active">
  ): Promise<AssetsDto> {
    return prisma.assets.create({ data });
  }

  async findById(id: string): Promise<AssetsDto | null> {
    return prisma.assets.findFirst({ where: { id } });
  }

  async findAllByLayerId(layer_id: string): Promise<AssetsDto[]> {
    return prisma.assets.findMany({
      where: {
        layer_id,
      },
      include: { layer: true },
    });
  }

  async update(
    data: Omit<AssetsDto, "father" | "created_at">
  ): Promise<AssetsDto> {
    return prisma.assets.update({
      where: {
        id: data.id,
      },
      data,
    });
  }
}
