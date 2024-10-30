import env from "@config/config";
import {
  createMaintenanceController,
  deleteMaintenanceController,
  listAllMaintenanceController,
  listMaintenanceByIdController,
  updateMaintenanceController,
} from "@src/controllers/maintenance";

import { FastifyInstance, FastifyPluginOptions } from "fastify";

class MaintenanceRoutes {
  public prefixRoute = "/maintenance";
  public version = env.API_VERSION;

  routes = (
    fastify: FastifyInstance,
    options: FastifyPluginOptions,
    done: any
  ) => {
    fastify.post(
      `/`,
      // { schema: createUserSchema.schema },
      createMaintenanceController.handle
    );

    fastify.get(
      `/`,
      {
        preValidation: [fastify.authenticate],
      },
      listAllMaintenanceController.handle
    );

    fastify.get(
      `/:id`,
      { preValidation: [fastify.authenticate] },
      listMaintenanceByIdController.handle
    );

    fastify.put(
      `/:id`,
      { preValidation: [fastify.authenticate] },
      updateMaintenanceController.handle
    );

    fastify.put(
      `/inactive/:id`,
      { preValidation: [fastify.authenticate] },
      deleteMaintenanceController.handle
    );

    done();
  };
}

export default MaintenanceRoutes;
