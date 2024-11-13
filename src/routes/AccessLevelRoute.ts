import env from "@config/config";
import { listAllAccessLevelController } from "@src/controllers/accessLevel";

import { FastifyInstance, FastifyPluginOptions } from "fastify";

class AccessLevelRoutes {
  public prefixRoute = "/access-level";
  public version = env.API_VERSION;

  routes = (
    fastify: FastifyInstance,
    options: FastifyPluginOptions,
    done: any
  ) => {
    fastify.get(
      `/`,
      {
        preValidation: [fastify.authenticate],
      },
      listAllAccessLevelController.handle
    );

    done();
  };
}

export default AccessLevelRoutes;
