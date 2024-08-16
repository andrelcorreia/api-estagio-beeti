import { Users } from "@src/dtos/UsersDto";
import { AppError } from "@src/helper/errosHandler";
import { UsersModel } from "@src/models/UsersModel";
import { FastifyReply, FastifyRequest } from "fastify";
import { env } from "process";

export class CreateSessionsWebUseCase {
  async execute(
    email: string,
    password: string,
    reply: FastifyReply,
    request: FastifyRequest
  ): Promise<{ token: string } & { user: Omit<Users, "password"> }> {
    const usersModel = new UsersModel();

    const findEmail = await usersModel.findByEmail(email);

    if (!findEmail) {
      throw new AppError({
        statusCode: 404,
        message: "Usuário/senha inválidos",
        result: "error",
      });
    }

    const comparePassword = await request.bcryptCompare(
      password,
      findEmail.password
    );

    if (!comparePassword) {
      throw new AppError({
        code: 2,
        result: "error",
        message: "Usuário/senha inválidos!",
      });
    }

    const tokenPayload = {
      sub: findEmail.id,
      iss: env.API_JWT_ISSUER,
    };

    const token = await reply.jwtSign({
      ...tokenPayload,
      expiresIn: env.JWT_EXPIRED_IN,
    });

    const returnTokenInfo = {
      token,
      user: {
        id: findEmail.id,
        name: findEmail.name,
        email: findEmail.email,
        created_at: findEmail.created_at,
        active: findEmail.active,
      },
    };

    return returnTokenInfo;
  }
}
