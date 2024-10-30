import { ServicesProvided } from "@src/dtos/ServicesProvidedDto";
import { AppError } from "@src/helper/errosHandler";
import { ClientsModel } from "@src/models/ClientsModel";
import { ServicesProvidedModel } from "@src/models/ServicesProvidedModel";
import { UsersModel } from "@src/models/UsersModel";

export class UpdateServicesProvidedUseCase {
  async execute(
    data: Omit<ServicesProvided, "created_at" | "active">
  ): Promise<ServicesProvided> {
    const servicesProvidedModel = new ServicesProvidedModel();
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

    const create = await servicesProvidedModel.update({
      id: data.id,
      description: data.description,
      estimated_date: data.estimated_date,
      technical_date: data.technical_date,
      user_id: data.user_id,
      client_id: data.client_id,
    });

    return create;
  }
}
