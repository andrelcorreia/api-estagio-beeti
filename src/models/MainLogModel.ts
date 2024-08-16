import { ApiMainLogDto } from "@src/dtos/MainLogDto";
import { prisma } from "@src/libs/prisma";

export interface IApiMainLogModel {
  create(data: Omit<ApiMainLogDto, "created_at">): Promise<ApiMainLogDto>;
  findAll(): Promise<ApiMainLogDto[]>;
}

export class ApiMainLogModel implements IApiMainLogModel {
  async create(
    data: Omit<ApiMainLogDto, "created_at">
  ): Promise<ApiMainLogDto> {
    return await prisma.api_main_logs.create({
      data,
    });
  }

  async findAll(): Promise<ApiMainLogDto[]> {
    return await prisma.api_main_logs.findMany();
  }
}
