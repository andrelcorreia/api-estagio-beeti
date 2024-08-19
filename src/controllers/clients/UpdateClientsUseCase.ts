import { ClientsDto } from "@src/dtos/ClientsDto";
import { AppResponse } from "@src/helper/responseParse";
import { UpdateClientsUseCase } from "@src/useCases/clients/UpdateClientsUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class UpdateClientsController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<ClientsDto> {
    const updateClientsUseCase = new UpdateClientsUseCase();

    const { id } = request.params as { id: string };

    const data = request.body as Omit<
      ClientsDto,
      "document" | "active" | "created_at"
    >;

    const response = await updateClientsUseCase.execute({
      id,
      name: data.name,
      telephone: data.telephone,
      full_address: data.full_address,
    });

    return reply.send(
      new AppResponse({
        statusCode: 200,
        message: "Cliente atualizado com sucesso!",
        result: "success",
        data: response,
        code: 0,
      })
    );
  }
}
