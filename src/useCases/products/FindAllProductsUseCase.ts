import { ProductsDto } from "@src/dtos/ProductsDto";
import { ProductsModel } from "@src/models/ProductsModel";

export class FindAllProductsUseCase {
  async execute(page: string, limit: string): Promise<ProductsDto[]> {
    const productsModel = new ProductsModel();

    const product = await productsModel.findMany(
      page ? Number(page) : 0,
      limit ? Number(limit) : 100
    );

    return product;
  }
}
