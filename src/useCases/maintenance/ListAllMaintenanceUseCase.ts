import { Maintenance, MaintenanceCompleteInfo } from "@src/dtos/MaintenanceDto";
import { AppError } from "@src/helper/errosHandler";
import { MaintenanceModel } from "@src/models/MaintenanceModel";
import { UsersModel } from "@src/models/UsersModel";
import { NodemailerProvider } from "@src/shared/providers/nodemailerProvider/Implementation/NodemailerProvider";
import moment from "moment";

export class ListAllMaintenanceUseCase {
  async execute(
    page: string,
    limit: string,
    description: string
  ): Promise<MaintenanceCompleteInfo[]> {
    const maintenanceModel = new MaintenanceModel();
    const nodemailerProvider = new NodemailerProvider();
    const usersModel = new UsersModel();

    const list = await maintenanceModel.findManyComplete(
      page ? Number(page) : 0,
      limit ? Number(limit) : 100,
      description && description !== "" ? description : undefined
    );

    list.map(async (maintenance) => {
      console.log({ maintenance });
      if (
        maintenance.created_at < moment().subtract(1, "days").toDate() &&
        maintenance.reminder === false
      ) {
        await nodemailerProvider.onlySendEmail({
          email: "andrelgpcorreia@gmail.com",
          cli_name: maintenance.client.name,
          prod_name: maintenance.product.name,
        });

        maintenanceModel.updateReminder(maintenance.id);
      }

      return false;
    });

    return list;
  }
}
