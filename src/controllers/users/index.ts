import { CreateUsersController } from "./CreateUsersController";
import { DeleteUsersController } from "./DeleteUsersController";
import { ListAllUsersController } from "./ListAllUsersController";
import { ListUsersByIdController } from "./ListUsersByIdController";
import { UpdateUsersController } from "./UpdateUsersController";

const createUsersController = new CreateUsersController();
const listAllUsersController = new ListAllUsersController();
const listUsersByIdController = new ListUsersByIdController();
const updateUsersController = new UpdateUsersController();
const deleteUsersController = new DeleteUsersController();

export {
  createUsersController,
  listAllUsersController,
  listUsersByIdController,
  updateUsersController,
  deleteUsersController,
};
