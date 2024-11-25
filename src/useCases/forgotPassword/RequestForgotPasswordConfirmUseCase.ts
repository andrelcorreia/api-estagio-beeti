import env from "@src/config/config";
import { AppError } from "@src/helper/errosHandler";
import { UsersModel } from "@src/models/UsersModel";
import { FastifyRequest } from "fastify";
import { verify } from "jsonwebtoken";

interface PayLoad {
  iss: string;
  sub: string;
}

export class RequestForgotPasswordConfirmUseCase {
  async execute({
    token,
    password,
    confirm_password,
    request,
  }: {
    token: string;
    password: string;
    confirm_password: string;
    request: FastifyRequest;
  }): Promise<Boolean> {
    const usersModel = new UsersModel();
    console.log({ token });

    const { iss } = token
      ? (verify(token, env.JWT_SECRET) as PayLoad)
      : ((await request.jwtVerify()) as PayLoad);

    console.log({ iss });

    const user = await usersModel.findById(iss);
    console.log({ user });
    if (password !== confirm_password) {
      throw new AppError({
        statusCode: 400,
        message: "As senhas não se coincidam",
        result: "error",
      });
    }

    if (!user) {
      throw new AppError({
        statusCode: 400,
        message: "Token não identificado",
        result: "error",
      });
    }
    console.log({ password });
    if (
      !password.match(
        /(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
      )
    ) {
      throw new AppError({
        statusCode: 404,
        message: "Essa senha é fraca!",
        result: "error",
      });
    }

    const passwordHash = await request.bcryptHash(password.trim());

    await usersModel.updatePassword(user?.id, passwordHash);

    return true;
  }
}
