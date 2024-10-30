import { Maintenance } from "@src/dtos/MaintenanceDto";

import { AppResponse } from "@src/helper/responseParse";
import { DeleteMaintenanceUseCase } from "@src/useCases/maintenance/DeleteMaintenanceUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class DeleteMaintenanceController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<Maintenance> {
    const deleteMaintenanceUseCase = new DeleteMaintenanceUseCase();

    const { id } = request.params as { id: string };

    const response = await deleteMaintenanceUseCase.execute(id);

    return reply.send(
      new AppResponse({
        statusCode: 201,
        message: "Manutenção inativado com sucesso!",
        result: "success",
        data: response,
        code: 0,
      })
    );
  }
}
