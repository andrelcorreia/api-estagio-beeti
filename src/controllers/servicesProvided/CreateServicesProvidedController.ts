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

    const { usrId } = request as { usrId: string };

    const data = request.body as Omit<
      ServicesProvided,
      "id" | "created_at" | "active"
    >;

    const response = await createServicesProvidedUseCase.execute({
      client_id: data.client_id,
      description: data.description,
      estimated_date: data.estimated_date,
      technical_date: data.technical_date,
      user_id: usrId,
    });

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
