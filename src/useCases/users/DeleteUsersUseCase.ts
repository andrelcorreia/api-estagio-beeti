import { AppError } from "@src/helper/errosHandler";
import { UsersModel } from "@src/models/UsersModel";

export class DeleteUsersUseCase {
  async execute(id: string): Promise<void> {
    const usersModel = new UsersModel();

    const list = await usersModel.findById(id);

    if (!list) {
      throw new AppError({
        statusCode: 400,
        message: "Id não encontrado",
        result: "error",
      });
    }

    await usersModel.inactive(id);
  }
}
