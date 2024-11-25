import { ClientsDto } from "@src/dtos/ClientsDto";
import { AppResponse } from "@src/helper/responseParse";
import { ListPermissionsByAccessLevelIdUseCase } from "@src/useCases/accessLevel/listPermissionsByAccessLevelIdUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class ListPermissionsByAccessLevelIdController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<ClientsDto> {
    const listPermissionsByAccessLevelIdUseCase =
      new ListPermissionsByAccessLevelIdUseCase();

    const { id } = request.params as { id: string };

    const response = await listPermissionsByAccessLevelIdUseCase.execute(id);

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
