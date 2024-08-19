import { ProductsDto } from "@src/dtos/ProductsDto";

import { AppResponse } from "@src/helper/responseParse";
import { CreateProductsUseCase } from "@src/useCases/products/CreateProductsUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class CreateProductsController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<ProductsDto> {
    const createProductsUseCase = new CreateProductsUseCase();

    const data = request.body as Omit<ProductsDto, "created_at" | "active">;

    const response = await createProductsUseCase.execute(data);

    return reply.send(
      new AppResponse({
        statusCode: 201,
        message: "Produto criado com sucesso!",
        result: "success",
        data: response,
        code: 0,
      })
    );
  }
}
