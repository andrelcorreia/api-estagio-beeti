import env from "@config/config";
import { createSessionsAppController } from "@src/controllers/sessions";

import { FastifyInstance, FastifyPluginOptions } from "fastify";

class SessionsRoutes {
  public prefixRoute = "/sessions";
  public version = env.API_VERSION;

  routes = (
    fastify: FastifyInstance,
    options: FastifyPluginOptions,
    done: any
  ) => {
    fastify.post(`/`, createSessionsAppController.handle);

    done();
  };
}

export default SessionsRoutes;
