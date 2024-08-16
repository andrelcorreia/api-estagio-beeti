import env from "@config/config";
import {
  createUsersController,
  listAllUsersController,
  listUsersByIdController,
  updateUsersController,
} from "@src/controllers/users";
import { mainLog } from "@src/plugins/mainLog";

import { FastifyInstance, FastifyPluginOptions } from "fastify";

class UserRoutes {
  public prefixRoute = "/users";
  public version = env.API_VERSION;

  routes = (
    fastify: FastifyInstance,
    options: FastifyPluginOptions,
    done: any
  ) => {
    fastify.post(`/`, createUsersController.handle);

    fastify.get(
      `/`,
      { preValidation: [fastify.authenticate] },
      listAllUsersController.handle
    );

    fastify.get(
      `/:id`,
      { preValidation: [fastify.authenticate] },
      listUsersByIdController.handle
    );

    fastify.put(
      `/:id`,
      { preValidation: [fastify.authenticate] },
      updateUsersController.handle
    );

    mainLog(fastify, done);

    done();
  };
}

export default UserRoutes;
