import { Users } from "@src/dtos/UsersDto";
import { AppError } from "@src/helper/errosHandler";
import { UsersModel } from "@src/models/UsersModel";

export class UpdateUsersUseCase {
  async execute(
    data: Omit<Users, "active" | "password" | "created_at">
  ): Promise<Users> {
    const usersModel = new UsersModel();

    const list = await usersModel.findById(data.id);

    if (!list) {
      throw new AppError({
        statusCode: 400,
        message: "Id não encontrado",
        result: "error",
      });
    }

    const regex = /^[a-z0-9._-]+@[a-z0-9-._]+\.[a-z]+(\.[a-z]+)?$/i;

    if (data.email) {
      if (!regex.test(data.email))
        throw new AppError({
          statusCode: 404,
          message: "Email inválido",
          result: "error",
        });

      const verifyEmail = await usersModel.findByEmailDiff(data.email, list.id);

      if (verifyEmail) {
        throw new AppError({
          statusCode: 404,
          message: "Email já cadastrado",
          result: "error",
        });
      }
    }

    const update = await usersModel.update({
      id: data.id ? data.id : list.id,
      email: data.email ? data.email.trim() : list.email,
      name: data.name ? data.name.trim() : list.name,
      access_level_id: data.access_level_id
        ? data.access_level_id
        : list.access_level_id,
    });

    return update;
  }
}
