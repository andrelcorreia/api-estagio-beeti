import { ProductsDto } from "@src/dtos/ProductsDto";
import { AppError } from "@src/helper/errosHandler";
import { ProductsModel } from "@src/models/ProductsModel";

export class FindProductsByIdUseCase {
  async execute(id: string): Promise<ProductsDto> {
    const productsModel = new ProductsModel();

    const product = await productsModel.findById(id);

    if (!product) {
      throw new AppError({
        statusCode: 404,
        message: "Produto não encontrado!",
        result: "error",
      });
    }

    return product;
  }
}
