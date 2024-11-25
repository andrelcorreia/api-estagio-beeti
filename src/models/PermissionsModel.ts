import { PermissionsDto, UserPermissionsDto } from "@src/dtos/PermissionsDto";
import { prisma } from "@src/libs/prisma";

export interface IPermissionsModel {
  create(props: UserPermissionsDto): Promise<UserPermissionsDto>;
  findById(id: string): Promise<PermissionsDto | null>;
  findMany(page: number, limit: number): Promise<PermissionsDto[]>;
  delete(id: string): Promise<UserPermissionsDto>;
}

export class PermissionsModel implements IPermissionsModel {
  async create(props: UserPermissionsDto): Promise<UserPermissionsDto> {
    return prisma.user_permissions.create({ data: props });
  }

  async findById(id: string): Promise<PermissionsDto | null> {
    return prisma.permissions.findFirst({
      where: {
        id,
      },
    });
  }

  async findByAccessLevel(id: string): Promise<PermissionsDto[]> {
    return prisma.permissions.findMany({
      where: {
        user_permissions: {
          every: {
            access_level_id: id,
          },
        },
      },
    });
  }

  async findByAccessLevelAvailable(id: string): Promise<PermissionsDto[]> {
    return prisma.permissions.findMany({
      where: {
        user_permissions: {
          none: {
            access_level_id: id,
          },
        },
      },
    });
  }

  async findMany(page: number, limit: number): Promise<PermissionsDto[]> {
    return prisma.permissions.findMany({
      take: limit,
      skip: page,
    });
  }

  async count(): Promise<number> {
    return prisma.permissions.count();
  }

  async delete(id: string): Promise<UserPermissionsDto> {
    return prisma.user_permissions.delete({ where: { id } });
  }
}
