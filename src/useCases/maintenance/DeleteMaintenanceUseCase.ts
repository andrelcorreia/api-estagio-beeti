import { Maintenance } from "@src/dtos/MaintenanceDto";
import { AppError } from "@src/helper/errosHandler";
import { MaintenanceModel } from "@src/models/MaintenanceModel";

export class DeleteMaintenanceUseCase {
  async execute(id: string): Promise<Maintenance> {
    const maintenanceModel = new MaintenanceModel();
    console.log({ id });
    const list = await maintenanceModel.findById(id);
    console.log({ list });
    if (!list) {
      throw new AppError({
        statusCode: 404,
        message: "Manutenção não encontrada!",
        result: "error",
      });
    }

    const t = await maintenanceModel.delete(id);

    console.log({ t });

    return list;
  }
}
