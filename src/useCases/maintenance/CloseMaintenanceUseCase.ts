import { ClientsModel } from "@src/models/ClientsModel";
import { MaintenanceModel } from "@src/models/MaintenanceModel";
import { ProductsModel } from "@src/models/ProductsModel";
import { UsersModel } from "@src/models/UsersModel";

export class CloseMaintenanceUseCase {
  async execute(id: string): Promise<void> {
    const maintenanceModel = new MaintenanceModel();
    const productsModel = new ProductsModel();
    const usersModel = new UsersModel();
    const clientsModel = new ClientsModel();

    await maintenanceModel.close(id);
  }
}
