import { Maintenance } from "@src/dtos/MaintenanceDto";
import { ServicesProvided } from "@src/dtos/ServicesProvidedDto";
import { AppError } from "@src/helper/errosHandler";
import { ClientsModel } from "@src/models/ClientsModel";
import { MaintenanceModel } from "@src/models/MaintenanceModel";
import { ProductsModel } from "@src/models/ProductsModel";
import { ServicesProvidedModel } from "@src/models/ServicesProvidedModel";
import { UsersModel } from "@src/models/UsersModel";

export class UpdateMaintenanceUseCase {
  async execute(
    data: Omit<Maintenance, "created_at" | "active">
  ): Promise<Maintenance> {
    const maintenanceModel = new MaintenanceModel();
    const productsModel = new ProductsModel();
    const usersModel = new UsersModel();
    const clientsModel = new ClientsModel();

    if (data.user_id) {
      const user = await usersModel.findById(data.user_id);

      if (!user) {
        throw new AppError({
          statusCode: 404,
          message: "Id do usuário não identificado!",
          result: "error",
        });
      }
    }

    if (data.client_id) {
      const client = await clientsModel.findById(data.client_id);

      if (!client) {
        throw new AppError({
          statusCode: 404,
          message: "Id do cliente não identificado!",
          result: "error",
        });
      }
    }

    if (data.product_id) {
      const product = await productsModel.findById(data.product_id);

      if (!product) {
        throw new AppError({
          statusCode: 404,
          message: "Id do produto não identificado!",
          result: "error",
        });
      }
    }

    const create = await maintenanceModel.update({
      id: data.id,
      description: data.description,
      estimated_date: data.estimated_date,
      technical_date: data.technical_date,
      user_id: data.user_id,
      client_id: data.client_id,
      product_id: data.product_id,
      occ_id: null,
    });

    return create;
  }
}
