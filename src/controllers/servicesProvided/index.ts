import { ListAllServicesProvidedUseCase } from "@src/useCases/servicesProvided/ListAllServicesProvidedUseCase";
import { CreateServicesProvidedController } from "./CreateServicesProvidedController";
import { DeleteServicesProvidedController } from "./DeleteServicesProvidedController";
import { ListServicesProvidedByIdController } from "./ListServicesProvidedByIdController";
import { UpdateServicesProvidedController } from "./UpdateServicesProvidedUseCase";
import { ListAllServicesProvidedController } from "./ListAllServicesProvidedController";

const createServicesProvidedController = new CreateServicesProvidedController();
const deleteServicesProvidedController = new DeleteServicesProvidedController();
const listAllServicesProvidedController =
  new ListAllServicesProvidedController();
const listServicesProvidedByIdController =
  new ListServicesProvidedByIdController();
const updateServicesProvidedController = new UpdateServicesProvidedController();

export {
  createServicesProvidedController,
  deleteServicesProvidedController,
  listAllServicesProvidedController,
  listServicesProvidedByIdController,
  updateServicesProvidedController,
};
