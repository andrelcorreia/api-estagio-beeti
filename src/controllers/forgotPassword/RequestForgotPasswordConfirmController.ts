import { Users } from "@src/dtos/UsersDto";
import { AppResponse } from "@src/helper/responseParse";
import { RequestForgotPasswordConfirmUseCase } from "@src/useCases/forgotPassword/RequestForgotPasswordConfirmUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class RequestForgotPasswordConfirmController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<Users> {
    const requestForgotPasswordConfirmUseCase =
      new RequestForgotPasswordConfirmUseCase();

    const { token, password, confirm_password } = request.body as {
      token: string;
      password: string;
      confirm_password: string;
    };

    const response = await requestForgotPasswordConfirmUseCase.execute({
      token,
      password,
      confirm_password,
      request,
    });

    return reply.send(
      new AppResponse({
        statusCode: 200,
        message: "Senha atualizada com sucesso!",
        result: "success",
        data: response,
        code: 0,
      })
    );
  }
}
