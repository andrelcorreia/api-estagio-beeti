import { CreateProductsController } from "./CreateProductsController";
import { DeleteProductController } from "./DeleteProductController";
import { FindAllProductsController } from "./FindAllProductsController";
import { FindProductsByIdController } from "./FindProductsByIdController";
import { UpdateProductsController } from "./UpdateProductsController";

const createProductsController = new CreateProductsController();
const findAllProductsController = new FindAllProductsController();
const findProductsByIdController = new FindProductsByIdController();
const updateProductsController = new UpdateProductsController();
const deleteProductController = new DeleteProductController();

export {
  createProductsController,
  findAllProductsController,
  findProductsByIdController,
  updateProductsController,
  deleteProductController,
};
