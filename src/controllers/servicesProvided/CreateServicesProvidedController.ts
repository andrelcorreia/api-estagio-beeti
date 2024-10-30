import { ServicesProvided } from "@src/dtos/ServicesProvidedDto";

import { AppResponse } from "@src/helper/responseParse";
import { CreateServicesProvidedUseCase } from "@src/useCases/servicesProvided/CreateServicesProvidedUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class CreateServicesProvidedController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<ServicesProvided> {
    const createServicesProvidedUseCase = new CreateServicesProvidedUseCase();

    const data = request.body as Omit<
      ServicesProvided,
      "id" | "created_at" | "active"
    >;

    const response = await createServicesProvidedUseCase.execute(data);

    return reply.send(
      new AppResponse({
        statusCode: 201,
        message: "Serviço providenciado criado com sucesso!",
        result: "success",
        data: response,
        code: 0,
      })
    );
  }
}
