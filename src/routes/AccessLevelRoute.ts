import env from "@config/config";
import {
  listAccessLevelByIdController,
  listAllAccessLevelController,
  listPermissionsAvailableController,
  listPermissionsByAccessLevelIdController,
} from "@src/controllers/accessLevel";

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

    fastify.get(
      `/listById/:id`,
      {
        preValidation: [fastify.authenticate],
      },
      listAccessLevelByIdController.handle
    );

    fastify.get(
      `/permissionsByAccess/:id`,
      {
        preValidation: [fastify.authenticate],
      },
      listPermissionsByAccessLevelIdController.handle
    );

    fastify.get(
      `/permissionsAvailable/:id`,
      {
        preValidation: [fastify.authenticate],
      },
      listPermissionsAvailableController.handle
    );

    done();
  };
}

export default AccessLevelRoutes;
