import { ClientsDto } from "@src/dtos/ClientsDto";
import { Users } from "@src/dtos/UsersDto";
import { AppResponse } from "@src/helper/responseParse";
import { ListAllClientsUseCase } from "@src/useCases/clients/ListAllClientsUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class ListAllClientsController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<ClientsDto> {
    const listAllClientsUseCase = new ListAllClientsUseCase();

    const { page, limit } = request.query as { page: string; limit: string };

    const response = await listAllClientsUseCase.execute(page, limit);

    return reply.send(
      new AppResponse({
        statusCode: 200,
        message: "Clientes listados com sucesso!",
        result: "success",
        data: response,
        code: 0,
      })
    );
  }
}
