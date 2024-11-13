import { ClientsDto } from "@src/dtos/ClientsDto";
import { AppResponse } from "@src/helper/responseParse";
import { ListAllAccessLevelUseCase } from "@src/useCases/accessLevel/ListAllAccessLevelUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class ListAllAccessLevelController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<ClientsDto> {
    const listAllAccessLevelUseCase = new ListAllAccessLevelUseCase();

    const { page, limit } = request.query as { page: string; limit: string };

    const response = await listAllAccessLevelUseCase.execute(page, limit);

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
