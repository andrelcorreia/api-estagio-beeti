import { CreateMaintenanceReportController } from "./CreateMaintenanceReportController";
import { CreateProductsReportController } from "./CreateProductsReportController";
import { CreateServicesProvidedReportController } from "./CreateServicesProvidedReportController";

const createServicesProvidedReportController =
  new CreateServicesProvidedReportController();
const createMaintenanceReportController =
  new CreateMaintenanceReportController();
const createProductsReportController = new CreateProductsReportController();

export {
  createServicesProvidedReportController,
  createMaintenanceReportController,
  createProductsReportController,
};
