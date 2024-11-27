import env from "@config/config";
import {
  createProductsController,
  deleteProductController,
  findAllProductsController,
  findProductsByIdController,
  updateProductsController,
} from "@src/controllers/products";
import { mainLog } from "@src/plugins/mainLog";

import { FastifyInstance, FastifyPluginOptions } from "fastify";

class ProductsRoute {
  public prefixRoute = "/products";
  public version = env.API_VERSION;

  routes = (
    fastify: FastifyInstance,
    options: FastifyPluginOptions,
    done: any
  ) => {
    fastify.post(
      `/`,
      { preValidation: [fastify.authenticate] },
      createProductsController.handle
    );

    fastify.get(
      `/`,
      { preValidation: [fastify.authenticate] },
      findAllProductsController.handle
    );

    fastify.get(
      `/:id`,
      { preValidation: [fastify.authenticate] },
      findProductsByIdController.handle
    );

    fastify.put(
      `/:id`,
      { preValidation: [fastify.authenticate] },
      updateProductsController.handle
    );

    fastify.delete(
      `/:id`,
      { preValidation: [fastify.authenticate] },
      deleteProductController.handle
    );

    mainLog(fastify, done);

    done();
  };
}

export default ProductsRoute;
