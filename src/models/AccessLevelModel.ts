import { AccessLevelDto } from "@src/dtos/AccessLevelDto";
import { prisma } from "@src/libs/prisma";

export interface IAccessLevelModel {
  create(props: AccessLevelDto): Promise<AccessLevelDto>;
  findById(id: string): Promise<AccessLevelDto | null>;
  findMany(page: number, limit: number): Promise<AccessLevelDto[]>;
  update(props: Omit<AccessLevelDto, "created_at">): Promise<AccessLevelDto>;
}

export class AccessLevelModel implements IAccessLevelModel {
  async create(props: AccessLevelDto): Promise<AccessLevelDto> {
    return prisma.access_level.create({ data: props });
  }

  async findById(id: string): Promise<AccessLevelDto | null> {
    return prisma.access_level.findFirst({
      where: {
        id,
      },
    });
  }

  async findMany(page: number, limit: number): Promise<AccessLevelDto[]> {
    return prisma.access_level.findMany({
      take: limit,
      skip: page,
    });
  }

  async update(
    props: Omit<AccessLevelDto, "created_at">
  ): Promise<AccessLevelDto> {
    return prisma.access_level.update({ where: { id: props.id }, data: props });
  }
}
