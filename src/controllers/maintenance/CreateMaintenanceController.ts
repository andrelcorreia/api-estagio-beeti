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

    const data = request.body as Omit<
      Maintenance,
      "id" | "created_at" | "active"
    >;

    const response = await createMaintenanceUseCase.execute(data);

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
