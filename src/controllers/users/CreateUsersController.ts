import { Users } from "@src/dtos/UsersDto";
import { AppResponse } from "@src/helper/responseParse";
import { CreateUsersUseCase } from "@src/useCases/users/CreateUsersUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class CreateUsersController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<Users> {
    const createUsersUseCase = new CreateUsersUseCase();

    const data = request.body as Omit<Users, "id" | "created_at" | "active">;

    const response = await createUsersUseCase.execute(data, request);

    return reply.send(
      new AppResponse({
        statusCode: 201,
        message: "Usuário criado com sucesso!",
        result: "success",
        data: response,
        code: 0,
      })
    );
  }
}
