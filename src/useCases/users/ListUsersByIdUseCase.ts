import { Users } from "@src/dtos/UsersDto";
import { AppError } from "@src/helper/errosHandler";
import { UsersModel } from "@src/models/UsersModel";

export class ListUsersByIdUseCase {
  async execute(id: string): Promise<Users> {
    const usersModel = new UsersModel();

    const list = await usersModel.findById(id);

    if (!list) {
      throw new AppError({
        statusCode: 400,
        message: "Id não encontrado",
        result: "error",
      });
    }

    return list;
  }
}
