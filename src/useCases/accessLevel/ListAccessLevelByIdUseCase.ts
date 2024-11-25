import { AccessLevelDto } from "@src/dtos/AccessLevelDto";
import { AppError } from "@src/helper/errosHandler";
import { AccessLevelModel } from "@src/models/AccessLevelModel";

export class ListAccessLevelByIdUseCase {
  async execute(id: string): Promise<AccessLevelDto> {
    const accessLevelModel = new AccessLevelModel();

    const list = await accessLevelModel.findById(id);

    if (!list) {
      throw new AppError({
        statusCode: 404,
        message: "Nível de acesso não encontrado!",
        result: "error",
      });
    }

    return list;
  }
}
