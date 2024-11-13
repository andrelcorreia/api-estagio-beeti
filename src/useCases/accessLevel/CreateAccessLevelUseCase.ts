import { AccessLevelDto } from "@src/dtos/AccessLevelDto";
import { AccessLevelModel } from "@src/models/AccessLevelModel";
import { v4 as uuidV4 } from "uuid";

export class CreateAccessLevelUseCase {
  async execute(data: Omit<AccessLevelDto, "id">): Promise<AccessLevelDto> {
    const accessLevelModel = new AccessLevelModel();

    const create = await accessLevelModel.create({
      id: uuidV4(),
      description: data.description.trim(),
    });

    return create;
  }
}
