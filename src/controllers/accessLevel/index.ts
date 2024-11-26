import { ListAccessLevelByIdController } from "./ListAccessLevelByIdController";
import { ListAllAccessLevelController } from "./ListAllAccessLevelController";
import { ListPermissionsAvailableController } from "./ListPermissionsAvailableController";
import { ListPermissionsByAccessLevelIdController } from "./listPermissionsByAccessLevelIdController";
import { UpdateAccessPermissionsController } from "./UpdateAccessPermissionsController";

const listAllAccessLevelController = new ListAllAccessLevelController();
const listAccessLevelByIdController = new ListAccessLevelByIdController();
const listPermissionsByAccessLevelIdController =
  new ListPermissionsByAccessLevelIdController();
const listPermissionsAvailableController =
  new ListPermissionsAvailableController();
const updateAccessPermissionsController =
  new UpdateAccessPermissionsController();

export {
  listAllAccessLevelController,
  listAccessLevelByIdController,
  listPermissionsByAccessLevelIdController,
  listPermissionsAvailableController,
  updateAccessPermissionsController,
};
