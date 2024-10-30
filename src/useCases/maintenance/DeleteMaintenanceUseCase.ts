import { Maintenance } from "@src/dtos/MaintenanceDto";
import { AppError } from "@src/helper/errosHandler";
import { MaintenanceModel } from "@src/models/MaintenanceModel";

export class DeleteMaintenanceUseCase {
  async execute(id: string): Promise<Maintenance> {
    const maintenanceModel = new MaintenanceModel();

    const list = await maintenanceModel.findById(id);

    if (!list) {
      throw new AppError({
        statusCode: 404,
        message: "Manutenção não encontrada!",
        result: "error",
      });
    }

    await maintenanceModel.inactive(id);

    return list;
  }
}
