import { Users } from "@src/dtos/UsersDto";
import { AppResponse } from "@src/helper/responseParse";
import { RequestForgotPasswordUseCase } from "@src/useCases/forgotPassword/RequestForgotPasswordUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class RequestForgotPasswordController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<Users> {
    const requestForgotPasswordUseCase = new RequestForgotPasswordUseCase();

    const { email } = request.body as { email: string };

    const response = await requestForgotPasswordUseCase.execute(email, reply);

    return reply.send(
      new AppResponse({
        statusCode: 200,
        message: "Email de solicitação de senha enviado com sucesso!",
        result: "success",
        data: response,
        code: 0,
      })
    );
  }
}
