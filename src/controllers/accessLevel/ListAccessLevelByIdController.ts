import { ClientsDto } from "@src/dtos/ClientsDto";
import { AppResponse } from "@src/helper/responseParse";
import { ListAccessLevelByIdUseCase } from "@src/useCases/accessLevel/ListAccessLevelByIdUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class ListAccessLevelByIdController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<ClientsDto> {
    const listAccessLevelByIdUseCase = new ListAccessLevelByIdUseCase();

    const { id } = request.params as { id: string };

    const response = await listAccessLevelByIdUseCase.execute(id);

    return reply.send(
      new AppResponse({
        statusCode: 200,
        message: "Níveis de acesso listados com sucesso!",
        result: "success",
        data: response,
        code: 0,
      })
    );
  }
}
