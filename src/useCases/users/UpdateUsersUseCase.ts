import { Users } from "@src/dtos/UsersDto";
import { AppError } from "@src/helper/errosHandler";
import { UsersModel } from "@src/models/UsersModel";

export class UpdateUsersUseCase {
  async execute(
    data: Omit<Users, "father" | "active" | "password" | "created_at">
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

      const verifyEmail = await usersModel.findByEmail(data.email);

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
      email: data.email ? data.email : list.email,
      name: data.name ? data.name : list.name,
      app: data.app ? data.app : list.app,
      web: data.web ? data.web : list.web,
    });

    return update;
  }
}
