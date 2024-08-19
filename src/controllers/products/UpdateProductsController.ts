import { ProductsDto } from "@src/dtos/ProductsDto";

import { AppResponse } from "@src/helper/responseParse";
import { UpdateProductsUseCase } from "@src/useCases/products/UpdateProductsUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class UpdateProductsController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<ProductsDto> {
    const updateProductsUseCase = new UpdateProductsUseCase();

    const { id } = request.params as { id: string };

    const data = request.body as Omit<ProductsDto, "created_at">;

    const response = await updateProductsUseCase.execute({
      id,
      name: data.name,
      description: data.description,
      active: data.active,
    });

    return reply.send(
      new AppResponse({
        statusCode: 201,
        message: "Produto atualizado com sucesso!",
        result: "success",
        data: response,
        code: 0,
      })
    );
  }
}
