import { Maintenance } from "@src/dtos/MaintenanceDto";
import { ServicesProvided } from "@src/dtos/ServicesProvidedDto";

import { AppResponse } from "@src/helper/responseParse";
import { CreateMaintenanceUseCase } from "@src/useCases/maintenance/CreateMaintenanceUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class CreateMaintenanceController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<ServicesProvided> {
    const createMaintenanceUseCase = new CreateMaintenanceUseCase();

    const { usrId } = request as { usrId: string };

    const data = request.body as Omit<
      Maintenance,
      "id" | "created_at" | "active"
    >;

    const response = await createMaintenanceUseCase.execute({
      description: data.description,
      client_id: data.client_id,
      estimated_date: data.estimated_date,
      occ_id: data.occ_id,
      product_id: data.product_id,
      technical_date: data.technical_date,
      user_id: usrId,
    });

    return reply.send(
      new AppResponse({
        statusCode: 201,
        message: "Manutenção criado com sucesso!",
        result: "success",
        data: response,
        code: 0,
      })
    );
  }
}
