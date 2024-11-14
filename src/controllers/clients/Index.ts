import { CreateClientsController } from "./CreateClientsController";
import { InactiveClientsController } from "./InactiveClientsController";
import { ListAllClientsController } from "./ListAllClientsController";
import { ListClientsByIdController } from "./ListClientsByIdController";
import { UpdateClientsController } from "./UpdateClientsUseCase";

const createClientsController = new CreateClientsController();
const listAllClientsController = new ListAllClientsController();
const listClientsByIdController = new ListClientsByIdController();
const updateClientsController = new UpdateClientsController();
const inactiveClientsController = new InactiveClientsController();

export {
  createClientsController,
  listAllClientsController,
  listClientsByIdController,
  updateClientsController,
  inactiveClientsController,
};
