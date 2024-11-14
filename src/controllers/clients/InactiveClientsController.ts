import { ClientsDto } from "@src/dtos/ClientsDto";
import { AppResponse } from "@src/helper/responseParse";
import { InactiveClientsUseCase } from "@src/useCases/clients/InactiveClientsUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class InactiveClientsController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<ClientsDto> {
    const inactiveClientsUseCase = new InactiveClientsUseCase();

    const { id } = request.params as { id: string };

    const response = await inactiveClientsUseCase.execute(id);

    return reply.send(
      new AppResponse({
        statusCode: 200,
        message: "Cliente inativado com sucesso!",
        result: "success",
        data: response,
        code: 0,
      })
    );
  }
}
