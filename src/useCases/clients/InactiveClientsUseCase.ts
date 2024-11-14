import { ClientsModel } from "@src/models/ClientsModel";

export class InactiveClientsUseCase {
  async execute(id: string): Promise<void> {
    const clientsModel = new ClientsModel();

    const findId = await clientsModel.findById(id);

    await clientsModel.inactive(id);
  }
}
