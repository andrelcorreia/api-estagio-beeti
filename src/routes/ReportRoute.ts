import env from "@config/config";
import {
  createMaintenanceReportController,
  createProductsReportController,
  createServicesProvidedReportController,
} from "@src/controllers/report";
import { mainLog } from "@src/plugins/mainLog";

import { FastifyInstance, FastifyPluginOptions } from "fastify";

class ReportsRoute {
  public prefixRoute = "/reports";
  public version = env.API_VERSION;

  routes = (
    fastify: FastifyInstance,
    options: FastifyPluginOptions,
    done: any
  ) => {
    fastify.get(
      `/servicesProvided`,
      // { preValidation: [fastify.authenticate] },
      createServicesProvidedReportController.handle
    );

    fastify.get(
      `/maintenance`,
      // { preValidation: [fastify.authenticate] },
      createMaintenanceReportController.handle
    );

    fastify.get(
      `/products`,
      // { preValidation: [fastify.authenticate] },
      createProductsReportController.handle
    );

    mainLog(fastify, done);

    done();
  };
}

export default ReportsRoute;
