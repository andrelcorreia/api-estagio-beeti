import { UpdatePermissions } from "@src/dtos/PermissionsDto";
import { AppError } from "@src/helper/errosHandler";
import { AccessLevelModel } from "@src/models/AccessLevelModel";
import { PermissionsModel } from "@src/models/PermissionsModel";
import { v4 as uuidV4 } from "uuid";

export class UpdateAccessPermissionsUseCase {
  async execute(data: UpdatePermissions): Promise<boolean> {
    const accessLevelModel = new AccessLevelModel();
    const permissionsModel = new PermissionsModel();
    console.log({ data });
    const accessLevel = await accessLevelModel.findById(data.access_level_id);

    if (!accessLevel) {
      throw new AppError({
        statusCode: 404,
        message: "Nível de acesso não encontrado!",
        result: "error",
      });
    }

    const deleteUserPermissions = await permissionsModel.delete(
      data.access_level_id
    );

    data.id.map(async (id) => {
      const props = {
        id: uuidV4(),
        access_level_id: data.access_level_id,
        permissions_id: id,
      };

      const createUserPermissions = await permissionsModel.create(props);
    });

    return true;
  }
}
