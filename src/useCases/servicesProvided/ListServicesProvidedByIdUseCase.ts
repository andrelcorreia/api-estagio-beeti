import { ServicesProvided } from "@src/dtos/ServicesProvidedDto";
import { AppError } from "@src/helper/errosHandler";
import { ServicesProvidedModel } from "@src/models/ServicesProvidedModel";

export class ListServicesProvidedByIdUseCase {
  async execute(id: string): Promise<ServicesProvided> {
    const servicesProvidedModel = new ServicesProvidedModel();

    const list = await servicesProvidedModel.findById(id);

    if (!list) {
      throw new AppError({
        statusCode: 404,
        message: "Prestação de serviços não encontrada!",
        result: "error",
      });
    }

    return list;
  }
}
