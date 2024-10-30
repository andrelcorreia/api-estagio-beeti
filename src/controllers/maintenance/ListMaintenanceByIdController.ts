import { Maintenance } from "@src/dtos/MaintenanceDto";

import { AppResponse } from "@src/helper/responseParse";
import { ListMaintenanceByIdUseCase } from "@src/useCases/maintenance/ListMaintenanceByIdUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class ListMaintenanceByIdController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<Maintenance> {
    const listMaintenanceByIdUseCase = new ListMaintenanceByIdUseCase();

    const { id } = request.params as { id: string };

    const response = await listMaintenanceByIdUseCase.execute(id);

    return reply.send(
      new AppResponse({
        statusCode: 201,
        message: "Manutenção listado com sucesso!",
        result: "success",
        data: response,
        code: 0,
      })
    );
  }
}
