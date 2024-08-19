import env from "@config/config";
import { requestForgotPasswordController } from "@src/controllers/forgotPassword";

import { FastifyInstance, FastifyPluginOptions } from "fastify";

class RequestForgotRoute {
  public prefixRoute = "/forgot-password";
  public version = env.API_VERSION;

  routes = (
    fastify: FastifyInstance,
    options: FastifyPluginOptions,
    done: any
  ) => {
    fastify.post(`/`, requestForgotPasswordController.handle);

    done();
  };
}

export default RequestForgotRoute;
