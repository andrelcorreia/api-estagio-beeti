import { Maintenance } from "@src/dtos/MaintenanceDto";
import { MaintenanceModel } from "@src/models/MaintenanceModel";

export class ListAllMaintenanceUseCase {
  async execute(page: string, limit: string): Promise<Maintenance[]> {
    const maintenanceModel = new MaintenanceModel();

    const list = await maintenanceModel.findMany(
      page ? Number(page) : 0,
      limit ? Number(limit) : 100
    );

    return list;
  }
}
