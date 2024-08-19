import { Users } from "@src/dtos/UsersDto";
import { AppError } from "@src/helper/errosHandler";
import { UsersModel } from "@src/models/UsersModel";
import { NodemailerProvider } from "@src/shared/providers/nodemailerProvider/Implementation/NodemailerProvider";
import { FastifyReply } from "fastify";

export class RequestForgotPasswordUseCase {
  async execute(email: string, reply: FastifyReply): Promise<Users> {
    const usersModel = new UsersModel();
    const nodemailerProvider = new NodemailerProvider();

    const list = await usersModel.findByEmail(email);

    if (!list) {
      throw new AppError({
        statusCode: 400,
        message: "Email não encontrado",
        result: "error",
      });
    }

    // html e enviar o nodemailer

    const receiver = {
      user_id: list.id,
      email: list.email.toLocaleLowerCase(),
    };

    const token = await reply.jwtSign({ iss: list.id }, { expiresIn: "15m" });

    await nodemailerProvider.sendEmail(receiver, token);

    return list;
  }
}
