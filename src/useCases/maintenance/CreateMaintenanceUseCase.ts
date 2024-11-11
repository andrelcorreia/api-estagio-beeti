import { Maintenance } from "@src/dtos/MaintenanceDto";
import { AppError } from "@src/helper/errosHandler";
import { ClientsModel } from "@src/models/ClientsModel";
import { MaintenanceModel } from "@src/models/MaintenanceModel";
import { ProductsModel } from "@src/models/ProductsModel";
import { UsersModel } from "@src/models/UsersModel";
import { v4 as uuidV4 } from "uuid";

export class CreateMaintenanceUseCase {
  async execute(
    data: Omit<Maintenance, "id" | "created_at" | "active">
  ): Promise<Maintenance> {
    const maintenanceModel = new MaintenanceModel();
    const productsModel = new ProductsModel();
    const usersModel = new UsersModel();
    const clientsModel = new ClientsModel();

    const user = await usersModel.findById(data.user_id);

    if (!user) {
      throw new AppError({
        statusCode: 404,
        message: "Id do usuário não identificado!",
        result: "error",
      });
    }

    const client = await clientsModel.findById(data.client_id);

    if (!client) {
      throw new AppError({
        statusCode: 404,
        message: "Id do cliente não identificado!",
        result: "error",
      });
    }

    const product = await productsModel.findById(data.product_id);

    if (!product) {
      throw new AppError({
        statusCode: 404,
        message: "Id do produto não identificado!",
        result: "error",
      });
    }

    const create = await maintenanceModel.create({
      id: uuidV4(),
      description: data.description.trim(),
      estimated_date: data.estimated_date,
      technical_date: data.technical_date,
      user_id: data.user_id.trim(),
      client_id: data.client_id.trim(),
      product_id: data.product_id.trim(),
      occ_id: data.occ_id,
    });

    return create;
  }
}
