import { Maintenance, MaintenanceCompleteInfo } from "@src/dtos/MaintenanceDto";
import { MaintenanceModel } from "@src/models/MaintenanceModel";
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

    const list = await maintenanceModel.findManyComplete(
      page ? Number(page) : 0,
      limit ? Number(limit) : 100,
      description && description !== "" ? description : undefined
    );

    console.log({ list });

    const listFiltered = list.map((maintenance) => {
      if (maintenance.created_at < moment().subtract(1, "days").toDate()) {
        // await nodemailerProvider.onlySendEmail('Nome do cliente','Nome do produto');
      }
      return false;
    });

    return list;
  }
}
