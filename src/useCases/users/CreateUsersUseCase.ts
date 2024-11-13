import { Users } from "@src/dtos/UsersDto";
import { AppError } from "@src/helper/errosHandler";
import { AccessLevelModel } from "@src/models/AccessLevelModel";
import { UsersModel } from "@src/models/UsersModel";
import { FastifyRequest } from "fastify";
import { v4 as uuidV4 } from "uuid";

export class CreateUsersUseCase {
  async execute(
    data: Omit<Users, "id" | "created_at" | "active">,
    request: FastifyRequest
  ): Promise<Users> {
    const usersModel = new UsersModel();
    const accessLevelModel = new AccessLevelModel();

    const regex = /^[a-z0-9._-]+@[a-z0-9-._]+\.[a-z]+(\.[a-z]+)?$/i;

    const findAccessLevel = await accessLevelModel.findById(
      data.access_level_id!
    );

    if (!findAccessLevel) {
      throw new AppError({
        statusCode: 404,
        message: "Nível de acesso não encontrado",
        result: "error",
      });
    }

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
      email: data.email.trim(),
      name: data.name.trim(),
      password: passwordHash,
      access_level_id: data.access_level_id,
    });

    return create;
  }
}
