import { Maintenance } from "@src/dtos/MaintenanceDto";

import { AppResponse } from "@src/helper/responseParse";
import { CloseMaintenanceUseCase } from "@src/useCases/maintenance/CloseMaintenanceUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class CloseMaintenanceController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<Maintenance> {
    const closeMaintenanceUseCase = new CloseMaintenanceUseCase();

    const { id } = request.params as { id: string };

    const response = await closeMaintenanceUseCase.execute(id);

    return reply.send(
      new AppResponse({
        statusCode: 201,
        message: "Manutenção fechada com sucesso!",
        result: "success",
        data: response,
        code: 0,
      })
    );
  }
}
