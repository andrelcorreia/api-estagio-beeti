import { CreateProductsController } from "./CreateProductsController";
import { FindAllProductsController } from "./FindAllProductsController";
import { FindProductsByIdController } from "./FindProductsByIdController";
import { UpdateProductsController } from "./UpdateProductsController";

const createProductsController = new CreateProductsController();
const findAllProductsController = new FindAllProductsController();
const findProductsByIdController = new FindProductsByIdController();
const updateProductsController = new UpdateProductsController();

export {
  createProductsController,
  findAllProductsController,
  findProductsByIdController,
  updateProductsController,
};
