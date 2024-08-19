import env from "@config/config";
import {
  createClientsController,
  listAllClientsController,
  listClientsByIdController,
  updateClientsController,
} from "@src/controllers/clients/Index";

import { FastifyInstance, FastifyPluginOptions } from "fastify";

class ClientsRoute {
  public prefixRoute = "/clients";
  public version = env.API_VERSION;

  routes = (
    fastify: FastifyInstance,
    options: FastifyPluginOptions,
    done: any
  ) => {
    fastify.post(
      `/`,
      { preValidation: [fastify.authenticate] },
      createClientsController.handle
    );

    fastify.get(
      `/`,
      { preValidation: [fastify.authenticate] },
      listAllClientsController.handle
    );

    fastify.get(
      `/:id`,
      { preValidation: [fastify.authenticate] },
      listClientsByIdController.handle
    );

    fastify.put(
      `/:id`,
      { preValidation: [fastify.authenticate] },
      updateClientsController.handle
    );

    done();
  };
}

export default ClientsRoute;
