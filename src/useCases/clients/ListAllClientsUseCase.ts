import { ClientsDto } from "@src/dtos/ClientsDto";
import { ClientsModel } from "@src/models/ClientsModel";

export class ListAllClientsUseCase {
  async execute(page: string, limit: string): Promise<ClientsDto[]> {
    const clientsModel = new ClientsModel();

    const list = await clientsModel.findAll(
      page ? Number(page) : 0,
      limit ? Number(limit) : 100
    );

    return list;
  }
}
