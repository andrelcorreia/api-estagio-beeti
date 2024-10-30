import { ServicesProvided } from "@src/dtos/ServicesProvidedDto";

import { AppResponse } from "@src/helper/responseParse";
import { UpdateServicesProvidedUseCase } from "@src/useCases/servicesProvided/UpdateServicesProvidedUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class UpdateServicesProvidedController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<ServicesProvided> {
    const updateServicesProvidedUseCase = new UpdateServicesProvidedUseCase();

    const { id } = request.params as { id: string };

    const data = request.body as Omit<ServicesProvided, "created_at">;

    const response = await updateServicesProvidedUseCase.execute({
      id,
      description: data.description,
      estimated_date: data.estimated_date,
      technical_date: data.technical_date,
      user_id: data.user_id,
      client_id: data.client_id,
    });

    return reply.send(
      new AppResponse({
        statusCode: 201,
        message: "Serviço providenciado atualizado com sucesso!",
        result: "success",
        data: response,
        code: 0,
      })
    );
  }
}
