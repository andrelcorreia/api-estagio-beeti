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
    description: string,
    id: string
  ): Promise<MaintenanceCompleteInfo[]> {
    const maintenanceModel = new MaintenanceModel();
    const nodemailerProvider = new NodemailerProvider();
    const usersModel = new UsersModel();

    const list = await maintenanceModel.findManyComplete(
      page ? Number(page) : 0,
      limit ? Number(limit) : 100,
      description && description !== "" ? description : undefined
    );

    const user = await usersModel.findById(id);

    if (!user) {
      throw new AppError({
        code: 1,
        statusCode: 401,
        result: "error",
        message: "Usuário não encontrado",
      });
    }

    const receiver = {
      user_id: user.id,
      email: user.email.toLocaleLowerCase(),
    };

    list.map(async (maintenance) => {
      if (maintenance.created_at < moment().subtract(1, "days").toDate()) {
        await nodemailerProvider.onlySendEmail(receiver, {
          cli_name: maintenance.client.name,
          prod_name: maintenance.product.name,
        });
      }
      return false;
    });

    return list;
  }
}
