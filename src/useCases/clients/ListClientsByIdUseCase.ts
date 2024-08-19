import { ClientsDto } from "@src/dtos/ClientsDto";
import { AppError } from "@src/helper/errosHandler";
import { ClientsModel } from "@src/models/ClientsModel";

export class ListClientsByIdUseCase {
  async execute(id: string): Promise<ClientsDto> {
    const clientsModel = new ClientsModel();

    const list = await clientsModel.findById(id);

    if (!list) {
      throw new AppError({
        statusCode: 400,
        message: "Id não encontrado",
        result: "error",
      });
    }

    return list;
  }
}
