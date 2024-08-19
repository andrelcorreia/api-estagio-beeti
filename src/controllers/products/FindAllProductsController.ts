import { ProductsDto } from "@src/dtos/ProductsDto";
import { AppResponse } from "@src/helper/responseParse";
import { FindAllProductsUseCase } from "@src/useCases/products/FindAllProductsUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class FindAllProductsController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<ProductsDto> {
    const findAllProductsUseCase = new FindAllProductsUseCase();

    const { page, limit } = request.query as { page: string; limit: string };

    const response = await findAllProductsUseCase.execute(page, limit);

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
