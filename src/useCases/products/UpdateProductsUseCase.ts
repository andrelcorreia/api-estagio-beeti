import { ProductsDto } from "@src/dtos/ProductsDto";
import { AppError } from "@src/helper/errosHandler";
import { ProductsModel } from "@src/models/ProductsModel";

export class UpdateProductsUseCase {
  async execute(data: Omit<ProductsDto, "created_at">): Promise<ProductsDto> {
    const productsModel = new ProductsModel();

    const product = await productsModel.findById(data.id);

    if (!product) {
      throw new AppError({
        statusCode: 404,
        message: "Produto não encontrado!",
        result: "error",
      });
    }

    const update = await productsModel.update(data);

    return update;
  }
}
