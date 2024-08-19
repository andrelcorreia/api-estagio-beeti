import { ClientsDto } from "@src/dtos/ClientsDto";
import { AppResponse } from "@src/helper/responseParse";
import { CreateClientsUseCase } from "@src/useCases/clients/CreateClientsUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class CreateClientsController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<ClientsDto> {
    const createClientsUseCase = new CreateClientsUseCase();

    const data = request.body as Omit<
      ClientsDto,
      "id" | "created_at" | "active"
    >;

    const response = await createClientsUseCase.execute(data);

    return reply.send(
      new AppResponse({
        statusCode: 201,
        message: "Cliente criado com sucesso!",
        result: "success",
        data: response,
        code: 0,
      })
    );
  }
}
