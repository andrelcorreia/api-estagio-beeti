import { CreateClientsController } from "./CreateClientsController";
import { ListAllClientsController } from "./ListAllClientsController";
import { ListClientsByIdController } from "./ListClientsByIdController";
import { UpdateClientsController } from "./UpdateClientsUseCase";

const createClientsController = new CreateClientsController();
const listAllClientsController = new ListAllClientsController();
const listClientsByIdController = new ListClientsByIdController();
const updateClientsController = new UpdateClientsController();

export {
  createClientsController,
  listAllClientsController,
  listClientsByIdController,
  updateClientsController,
};
