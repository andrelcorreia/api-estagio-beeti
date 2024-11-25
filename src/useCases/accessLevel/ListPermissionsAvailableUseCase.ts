import { PermissionsDto, UserPermissionsDto } from "@src/dtos/PermissionsDto";
import { AppError } from "@src/helper/errosHandler";
import { AccessLevelModel } from "@src/models/AccessLevelModel";
import { PermissionsModel } from "@src/models/PermissionsModel";

export class ListPermissionsAvailableUseCase {
  async execute(id: string): Promise<PermissionsDto[]> {
    const accessLevelModel = new AccessLevelModel();
    const permissionsModel = new PermissionsModel();

    const accessLevel = await accessLevelModel.findById(id);

    if (!accessLevel) {
      throw new AppError({
        statusCode: 404,
        message: "Nível de acesso não encontrado!",
        result: "error",
      });
    }

    const permissions = await permissionsModel.findByAccessLevelAvailable(id);

    return permissions;
  }
}
