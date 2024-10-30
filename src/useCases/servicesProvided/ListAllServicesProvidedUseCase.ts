import { ServicesProvided } from "@src/dtos/ServicesProvidedDto";
import { ServicesProvidedModel } from "@src/models/ServicesProvidedModel";

export class ListAllServicesProvidedUseCase {
  async execute(page: string, limit: string): Promise<ServicesProvided[]> {
    const servicesProvidedModel = new ServicesProvidedModel();

    const list = await servicesProvidedModel.findMany(
      page ? Number(page) : 0,
      limit ? Number(limit) : 100
    );

    return list;
  }
}
