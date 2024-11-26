import { ClientsDto } from "@src/dtos/ClientsDto";
import { AppResponse } from "@src/helper/responseParse";
import { UpdateAccessPermissionsUseCase } from "@src/useCases/accessLevel/UpdateAccessPermissionsUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class UpdateAccessPermissionsController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<ClientsDto> {
    const updateAccessPermissionsUseCase = new UpdateAccessPermissionsUseCase();

    const { access_level_id } = request.params as { access_level_id: string };

    const id = request.body as string[];

    const response = await updateAccessPermissionsUseCase.execute({
      access_level_id,
      id,
    });

    return reply.send(
      new AppResponse({
        statusCode: 200,
        message: "Níveis de acesso atualizados com sucesso!",
        result: "success",
        data: response,
        code: 0,
      })
    );
  }
}
