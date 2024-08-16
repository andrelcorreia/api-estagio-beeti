import { Users } from "@src/dtos/UsersDto";
import { AppResponse } from "@src/helper/responseParse";
import { CreateSessionsAppUseCase } from "@src/useCases/sessions/CreateSessionsAppUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class CreateSessionsAppController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<Omit<Users, "password">> {
    const createSessionsAppUseCase = new CreateSessionsAppUseCase();

    const { email, password } = request.body as {
      email: string;
      password: string;
    };

    const response = await createSessionsAppUseCase.execute(
      email,
      password,
      reply,
      request
    );

    return reply.status(200).send(
      new AppResponse({
        code: 0,
        result: "success",
        message: "Usuário logado com sucesso!",
        data: response,
      })
    );
  }
}
