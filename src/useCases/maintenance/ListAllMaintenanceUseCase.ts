import { Maintenance } from "@src/dtos/MaintenanceDto";
import { MaintenanceModel } from "@src/models/MaintenanceModel";

export class ListAllMaintenanceUseCase {
  async execute(
    page: string,
    limit: string,
    description: string
  ): Promise<Maintenance[]> {
    const maintenanceModel = new MaintenanceModel();

    const list = await maintenanceModel.findManyComplete(
      page ? Number(page) : 0,
      limit ? Number(limit) : 100,
      description && description !== "" ? description : undefined
    );
    console.log({ list });
    return list;
  }
}
