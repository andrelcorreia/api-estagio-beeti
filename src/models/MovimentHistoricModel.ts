import { AssetsDto } from "@src/dtos/AssetsDto";
import { MovimentHistoricDto } from "@src/dtos/MovimentHistoricDto";
import { prisma } from "@src/libs/prisma";

export interface IMovimentHistoricModel {
  create(
    data: Omit<MovimentHistoricDto, "created_at">
  ): Promise<MovimentHistoricDto>;
  findAllByUserId(user_id: string): Promise<MovimentHistoricDto[]>;
  findAllByAssetsId(assets_id: string): Promise<MovimentHistoricDto[]>;
  update(
    data: Omit<MovimentHistoricDto, "created_at">
  ): Promise<MovimentHistoricDto>;
}

export class MovimentHistoricModel implements IMovimentHistoricModel {
  async create(
    data: Omit<MovimentHistoricDto, "created_at">
  ): Promise<MovimentHistoricDto> {
    return prisma.moviment_historics.create({ data });
  }

  async findAllByUserId(user_id: string): Promise<MovimentHistoricDto[]> {
    return prisma.moviment_historics.findMany({
      where: { user_id },
      include: {
        assets: true,
        layer_initial: true,
        layer_final: true,
        user: true,
      },
    });
  }

  async findAllByAssetsId(assets_id: string): Promise<MovimentHistoricDto[]> {
    return prisma.moviment_historics.findMany({
      where: { assets_id },
      include: {
        assets: true,
        layer_initial: true,
        layer_final: true,
        user: true,
      },
    });
  }

  async update(
    data: Omit<MovimentHistoricDto, "created_at">
  ): Promise<MovimentHistoricDto> {
    return prisma.moviment_historics.update({
      where: { id: data.id },
      data,
    });
  }
}
