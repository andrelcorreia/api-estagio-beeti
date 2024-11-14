import { Users } from "@src/dtos/UsersDto";
import { AppResponse } from "@src/helper/responseParse";
import { DeleteUsersUseCase } from "@src/useCases/users/DeleteUsersUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class DeleteUsersController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<Users> {
    const deleteUsersUseCase = new DeleteUsersUseCase();

    const { id } = request.params as { id: string };

    const response = await deleteUsersUseCase.execute(id);

    return reply.send(
      new AppResponse({
        statusCode: 200,
        message: "Usuário inativado com sucesso!",
        result: "success",
        data: response,
        code: 0,
      })
    );
  }
}
