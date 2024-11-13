import { Maintenance } from "@src/dtos/MaintenanceDto";
import { AppResponse } from "@src/helper/responseParse";
import { ListAllMaintenanceUseCase } from "@src/useCases/maintenance/ListAllMaintenanceUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class ListAllMaintenanceController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<Maintenance> {
    const listAllMaintenanceUseCase = new ListAllMaintenanceUseCase();

    const { page, limit, description, id } = request.query as {
      page: string;
      limit: string;
      description: string;
      id: string;
    };

    const response = await listAllMaintenanceUseCase.execute(
      page,
      limit,
      description,
      id
    );

    return reply.send(
      new AppResponse({
        statusCode: 200,
        message: "Manutenções listados com sucesso!",
        result: "success",
        data: response,
        code: 0,
      })
    );
  }
}
