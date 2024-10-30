import env from "@config/config";
import {
  createServicesProvidedController,
  deleteServicesProvidedController,
  listAllServicesProvidedController,
  listServicesProvidedByIdController,
  updateServicesProvidedController,
} from "@src/controllers/servicesProvided";

import { FastifyInstance, FastifyPluginOptions } from "fastify";

class ServicesProvidedRoutes {
  public prefixRoute = "/servicesProvided";
  public version = env.API_VERSION;

  routes = (
    fastify: FastifyInstance,
    options: FastifyPluginOptions,
    done: any
  ) => {
    fastify.post(
      `/`,
      // { schema: createUserSchema.schema },
      createServicesProvidedController.handle
    );

    fastify.get(
      `/`,
      {
        preValidation: [fastify.authenticate],
      },
      listAllServicesProvidedController.handle
    );

    fastify.get(
      `/:id`,
      { preValidation: [fastify.authenticate] },
      listServicesProvidedByIdController.handle
    );

    fastify.put(
      `/:id`,
      { preValidation: [fastify.authenticate] },
      updateServicesProvidedController.handle
    );

    fastify.put(
      `/inactive/:id`,
      { preValidation: [fastify.authenticate] },
      deleteServicesProvidedController.handle
    );

    done();
  };
}

export default ServicesProvidedRoutes;
