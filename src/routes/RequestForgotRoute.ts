import env from "@config/config";
import {
  requestForgotPasswordConfirmController,
  requestForgotPasswordController,
} from "@src/controllers/forgotPassword";

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

    fastify.post(
      `/confirmPassword`,
      requestForgotPasswordConfirmController.handle
    );

    done();
  };
}

export default RequestForgotRoute;
