import { ListAccessLevelByIdController } from "./ListAccessLevelByIdController";
import { ListAllAccessLevelController } from "./ListAllAccessLevelController";
import { ListPermissionsAvailableController } from "./ListPermissionsAvailableController";
import { ListPermissionsByAccessLevelIdController } from "./listPermissionsByAccessLevelIdController";

const listAllAccessLevelController = new ListAllAccessLevelController();
const listAccessLevelByIdController = new ListAccessLevelByIdController();
const listPermissionsByAccessLevelIdController =
  new ListPermissionsByAccessLevelIdController();
const listPermissionsAvailableController =
  new ListPermissionsAvailableController();

export {
  listAllAccessLevelController,
  listAccessLevelByIdController,
  listPermissionsByAccessLevelIdController,
  listPermissionsAvailableController,
};
