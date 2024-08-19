import { ProductsDto } from "@src/dtos/ProductsDto";
import { AppResponse } from "@src/helper/responseParse";
import { FindProductsByIdUseCase } from "@src/useCases/products/FindProductsByIdUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class FindProductsByIdController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<ProductsDto> {
    const findProductsByIdUseCase = new FindProductsByIdUseCase();

    const { id } = request.params as { id: string };

    const response = await findProductsByIdUseCase.execute(id);

    return reply.send(
      new AppResponse({
        statusCode: 200,
        message: "Produto listado com sucesso!",
        result: "success",
        data: response,
        code: 0,
      })
    );
  }
}
