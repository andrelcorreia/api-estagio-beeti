import { ServicesProvided } from "@src/dtos/ServicesProvidedDto";
import { AppError } from "@src/helper/errosHandler";
import { ClientsModel } from "@src/models/ClientsModel";
import { MaintenanceModel } from "@src/models/MaintenanceModel";
import { ServicesProvidedModel } from "@src/models/ServicesProvidedModel";
import { UsersModel } from "@src/models/UsersModel";
import { v4 as uuidV4 } from "uuid";

export class CreateServicesProvidedUseCase {
  async execute(
    data: Omit<ServicesProvided, "id" | "created_at" | "active">
  ): Promise<any> {
    const servicesProvidedModel = new ServicesProvidedModel();
    const usersModel = new UsersModel();
    const clientsModel = new ClientsModel();
    const maintenanceModel = new MaintenanceModel();

    // const test = await maintenanceModel.findById()

    // create report over here

    return true;
  }
}
