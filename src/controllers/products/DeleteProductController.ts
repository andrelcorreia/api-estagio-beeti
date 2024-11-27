import { ProductsDto } from "@src/dtos/ProductsDto";
import { AppResponse } from "@src/helper/responseParse";
import { DeleteProductUseCase } from "@src/useCases/products/DeleteProductUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class DeleteProductController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<ProductsDto> {
    const deleteProductUseCase = new DeleteProductUseCase();

    const { id } = request.params as { id: string };

    const response = await deleteProductUseCase.execute(id);

    return reply.send(
      new AppResponse({
        statusCode: 200,
        message: "Produto deletado com sucesso!",
        result: "success",
        data: response,
        code: 0,
      })
    );
  }
}
