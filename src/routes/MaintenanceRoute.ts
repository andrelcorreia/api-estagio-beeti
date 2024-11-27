import env from "@config/config";
import {
  closeMaintenanceController,
  createMaintenanceController,
  deleteMaintenanceController,
  listAllMaintenanceController,
  listMaintenanceByIdController,
  updateMaintenanceController,
} from "@src/controllers/maintenance";
import { mainLog } from "@src/plugins/mainLog";

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
      {
        preValidation: [fastify.authenticate],
      },
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

    fastify.delete(
      `/inactive/:id`,
      { preValidation: [fastify.authenticate] },
      deleteMaintenanceController.handle
    );

    fastify.patch(
      `/close/:id`,
      { preValidation: [fastify.authenticate] },
      closeMaintenanceController.handle
    );

    mainLog(fastify, done);

    done();
  };
}

export default MaintenanceRoutes;
