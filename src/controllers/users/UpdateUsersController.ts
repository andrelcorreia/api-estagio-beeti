import { Users } from "@src/dtos/UsersDto";
import { AppResponse } from "@src/helper/responseParse";
import { UpdateUsersUseCase } from "@src/useCases/users/UpdateUsersUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class UpdateUsersController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<Users> {
    const updateUsersUseCase = new UpdateUsersUseCase();

    const { id } = request.params as { id: string };

    const data = request.body as Omit<
      Users,
      "active" | "password" | "created_at"
    >;

    const response = await updateUsersUseCase.execute({
      id,
      name: data.name,
      email: data.email,
    });

    return reply.send(
      new AppResponse({
        statusCode: 200,
        message: "Usuário atualizado com sucesso!",
        result: "success",
        data: response,
        code: 0,
      })
    );
  }
}
