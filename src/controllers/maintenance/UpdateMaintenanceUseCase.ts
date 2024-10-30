import { Maintenance } from "@src/dtos/MaintenanceDto";

import { AppResponse } from "@src/helper/responseParse";
import { UpdateMaintenanceUseCase } from "@src/useCases/maintenance/UpdateMaintenanceUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class UpdateMaintenanceController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<Maintenance> {
    const updateMaintenanceUseCase = new UpdateMaintenanceUseCase();

    const { id } = request.params as { id: string };

    const data = request.body as Omit<Maintenance, "created_at">;

    const response = await updateMaintenanceUseCase.execute({
      id,
      description: data.description,
      estimated_date: data.estimated_date,
      technical_date: data.technical_date,
      user_id: data.user_id,
      client_id: data.client_id,
      product_id: data.product_id,
      occ_id: null,
    });

    return reply.send(
      new AppResponse({
        statusCode: 201,
        message: "Manutenção atualizada com sucesso!",
        result: "success",
        data: response,
        code: 0,
      })
    );
  }
}
