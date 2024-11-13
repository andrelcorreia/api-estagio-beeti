import { AccessLevelDto } from "@src/dtos/AccessLevelDto";
import { AccessLevelModel } from "@src/models/AccessLevelModel";

export class ListAllAccessLevelUseCase {
  async execute(page: number, limit: number): Promise<AccessLevelDto[]> {
    const accessLevelModel = new AccessLevelModel();

    const list = await accessLevelModel.findMany(
      page ? Number(page) : 0,
      limit ? Number(limit) : 100
    );

    return list;
  }
}
