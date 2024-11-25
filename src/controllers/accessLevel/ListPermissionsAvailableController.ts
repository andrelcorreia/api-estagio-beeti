import { ClientsDto } from "@src/dtos/ClientsDto";
import { AppResponse } from "@src/helper/responseParse";
import { ListPermissionsAvailableUseCase } from "@src/useCases/accessLevel/ListPermissionsAvailableUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class ListPermissionsAvailableController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<ClientsDto> {
    const listPermissionsAvailableUseCase =
      new ListPermissionsAvailableUseCase();

    const { id } = request.params as { id: string };

    const response = await listPermissionsAvailableUseCase.execute(id);

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
