import { ServicesProvided } from "@src/dtos/ServicesProvidedDto";
import { AppResponse } from "@src/helper/responseParse";
import { ListAllServicesProvidedUseCase } from "@src/useCases/servicesProvided/ListAllServicesProvidedUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class ListAllServicesProvidedController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<ServicesProvided> {
    const listAllServicesProvidedUseCase = new ListAllServicesProvidedUseCase();

    const { page, limit } = request.query as { page: string; limit: string };

    const response = await listAllServicesProvidedUseCase.execute(page, limit);

    return reply.send(
      new AppResponse({
        statusCode: 200,
        message: "Serviços providenciados listados com sucesso!",
        result: "success",
        data: response,
        code: 0,
      })
    );
  }
}
