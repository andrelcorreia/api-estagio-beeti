import { ProductsDto } from "@src/dtos/ProductsDto";
import { ProductsModel } from "@src/models/ProductsModel";
import { v4 as uuidV4 } from "uuid";

export class CreateProductsUseCase {
  async execute(
    data: Omit<ProductsDto, "id" | "created_at" | "active">
  ): Promise<ProductsDto> {
    const productsModel = new ProductsModel();

    const create = await productsModel.create({
      id: uuidV4(),
      description: data.description.trim(),
      name: data.name.trim(),
    });

    return create;
  }
}
