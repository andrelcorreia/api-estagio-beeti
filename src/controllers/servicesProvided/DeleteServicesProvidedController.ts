import { ServicesProvided } from "@src/dtos/ServicesProvidedDto";

import { AppResponse } from "@src/helper/responseParse";
import { DeleteServicesProvidedUseCase } from "@src/useCases/servicesProvided/DeleteServicesProvidedUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class DeleteServicesProvidedController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<ServicesProvided> {
    const deleteServicesProvidedUseCase = new DeleteServicesProvidedUseCase();

    const { id } = request.params as { id: string };

    const response = await deleteServicesProvidedUseCase.execute(id);

    return reply.send(
      new AppResponse({
        statusCode: 201,
        message: "Serviço providenciado inativado com sucesso!",
        result: "success",
        data: response,
        code: 0,
      })
    );
  }
}
