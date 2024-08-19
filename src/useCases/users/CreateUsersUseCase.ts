import { Users } from "@src/dtos/UsersDto";
import { AppError } from "@src/helper/errosHandler";
import { UsersModel } from "@src/models/UsersModel";
import { FastifyRequest } from "fastify";
import { v4 as uuidV4 } from "uuid";

export class CreateUsersUseCase {
  async execute(
    data: Omit<Users, "id" | "created_at" | "active">,
    request: FastifyRequest
  ): Promise<Users> {
    const usersModel = new UsersModel();

    const regex = /^[a-z0-9._-]+@[a-z0-9-._]+\.[a-z]+(\.[a-z]+)?$/i;

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

    if (
      !data.password.match(
        /(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
      )
    ) {
      throw new AppError({
        statusCode: 404,
        message: "Essa senha é fraca!",
        result: "error",
      });
    }

    const passwordHash = await request.bcryptHash(data.password);

    const create = await usersModel.create({
      id: uuidV4(),
      email: data.email,
      name: data.name,
      password: passwordHash,
    });

    return create;
  }
}
