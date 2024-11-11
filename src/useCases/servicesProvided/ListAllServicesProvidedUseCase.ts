import { ServicesProvided } from "@src/dtos/ServicesProvidedDto";
import { ServicesProvidedModel } from "@src/models/ServicesProvidedModel";

export class ListAllServicesProvidedUseCase {
  async execute(
    page: string,
    limit: string,
    description: string
  ): Promise<ServicesProvided[]> {
    const servicesProvidedModel = new ServicesProvidedModel();
    console.log({ page, limit, description });
    const list = await servicesProvidedModel.findManyComplete(
      page ? Number(page) : 0,
      limit ? Number(limit) : 100,
      description && description !== "" ? description : undefined
    );

    console.log({ list });

    return list;
  }
}
