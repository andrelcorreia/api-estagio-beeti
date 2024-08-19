import { ClientsDto } from "@src/dtos/ClientsDto";
import { AppResponse } from "@src/helper/responseParse";
import { ListClientsByIdUseCase } from "@src/useCases/clients/ListClientsByIdUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class ListClientsByIdController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<ClientsDto> {
    const listClientsByIdUseCase = new ListClientsByIdUseCase();

    const { id } = request.params as { id: string };

    const response = await listClientsByIdUseCase.execute(id);

    return reply.send(
      new AppResponse({
        statusCode: 200,
        message: "Cliente listado com sucesso!",
        result: "success",
        data: response,
        code: 0,
      })
    );
  }
}
