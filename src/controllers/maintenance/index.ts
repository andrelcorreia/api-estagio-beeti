import { CloseMaintenanceController } from "./CloseMaintenanceController";
import { CreateMaintenanceController } from "./CreateMaintenanceController";
import { DeleteMaintenanceController } from "./DeleteMaintenanceController";
import { ListAllMaintenanceController } from "./ListAllMaintenanceController";
import { ListMaintenanceByIdController } from "./ListMaintenanceByIdController";
import { UpdateMaintenanceController } from "./UpdateMaintenanceUseCase";

const createMaintenanceController = new CreateMaintenanceController();
const deleteMaintenanceController = new DeleteMaintenanceController();
const listAllMaintenanceController = new ListAllMaintenanceController();
const listMaintenanceByIdController = new ListMaintenanceByIdController();
const updateMaintenanceController = new UpdateMaintenanceController();
const closeMaintenanceController = new CloseMaintenanceController();

export {
  createMaintenanceController,
  deleteMaintenanceController,
  listAllMaintenanceController,
  listMaintenanceByIdController,
  updateMaintenanceController,
  closeMaintenanceController,
};
