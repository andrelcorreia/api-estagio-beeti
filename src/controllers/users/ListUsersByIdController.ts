import { Users } from "@src/dtos/UsersDto";
import { AppResponse } from "@src/helper/responseParse";
import { ListUsersByIdUseCase } from "@src/useCases/users/ListUsersByIdUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class ListUsersByIdController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<Users> {
    const listUsersByIdUseCase = new ListUsersByIdUseCase();

    const { id } = request.params as { id: string };

    const response = await listUsersByIdUseCase.execute(id);

    return reply.send(
      new AppResponse({
        statusCode: 201,
        message: "Usuário listado com sucesso!",
        result: "success",
        data: response,
        code: 0,
      })
    );
  }
}
