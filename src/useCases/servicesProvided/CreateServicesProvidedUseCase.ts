import { ServicesProvided } from "@src/dtos/ServicesProvidedDto";
import { AppError } from "@src/helper/errosHandler";
import { ClientsModel } from "@src/models/ClientsModel";
import { ServicesProvidedModel } from "@src/models/ServicesProvidedModel";
import { UsersModel } from "@src/models/UsersModel";
import { v4 as uuidV4 } from "uuid";

export class CreateServicesProvidedUseCase {
  async execute(
    data: Omit<ServicesProvided, "id" | "created_at" | "active">
  ): Promise<ServicesProvided> {
    const servicesProvidedModel = new ServicesProvidedModel();
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

    const create = await servicesProvidedModel.create({
      id: uuidV4(),
      description: data.description.trim(),
      estimated_date: data.estimated_date,
      technical_date: data.technical_date,
      user_id: data.user_id.trim(),
      client_id: data.client_id.trim(),
    });

    return create;
  }
}
