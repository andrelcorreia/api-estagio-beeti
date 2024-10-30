import { ServicesProvided } from "@src/dtos/ServicesProvidedDto";

import { AppResponse } from "@src/helper/responseParse";
import { ListServicesProvidedByIdUseCase } from "@src/useCases/servicesProvided/ListServicesProvidedByIdUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class ListServicesProvidedByIdController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<ServicesProvided> {
    const listServicesProvidedByIdUseCase =
      new ListServicesProvidedByIdUseCase();

    const { id } = request.params as { id: string };

    const response = await listServicesProvidedByIdUseCase.execute(id);

    return reply.send(
      new AppResponse({
        statusCode: 201,
        message: "Serviço providenciado listado com sucesso!",
        result: "success",
        data: response,
        code: 0,
      })
    );
  }
}
