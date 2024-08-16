import { Users } from "@src/dtos/UsersDto";
import { AppResponse } from "@src/helper/responseParse";
import { ListAllUsersUseCase } from "@src/useCases/users/ListAllUsersUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class ListAllUsersController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<Users> {
    const listAllUsersUseCase = new ListAllUsersUseCase();

    const response = await listAllUsersUseCase.execute();

    return reply.send(
      new AppResponse({
        statusCode: 201,
        message: "Usuários listados com sucesso!",
        result: "success",
        data: response,
        code: 0,
      })
    );
  }
}
