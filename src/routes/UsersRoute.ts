import env from "@config/config";
import {
  createUsersController,
  listAllUsersController,
  listUsersByIdController,
  updateUsersController,
} from "@src/controllers/users";
import { mainLog } from "@src/plugins/mainLog";
import { createUserSchema } from "@src/shared/schemas/ValidationSchema";

import { FastifyInstance, FastifyPluginOptions } from "fastify";

class UserRoutes {
  public prefixRoute = "/users";
  public version = env.API_VERSION;

  routes = (
    fastify: FastifyInstance,
    options: FastifyPluginOptions,
    done: any
  ) => {
    fastify.post(
      `/`,
      // { schema: createUserSchema.schema },
      createUsersController.handle
    );

    fastify.get(
      `/`,
      {
        preValidation: [fastify.authenticate],
      },
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

    done();
  };
}

export default UserRoutes;
