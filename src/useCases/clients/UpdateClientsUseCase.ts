import { ClientsDto } from "@src/dtos/ClientsDto";
import { AppError } from "@src/helper/errosHandler";
import { ClientsModel } from "@src/models/ClientsModel";
import { unMask } from "node-masker";

export class UpdateClientsUseCase {
  async execute(
    data: Omit<ClientsDto, "document" | "created_at">
  ): Promise<ClientsDto> {
    const clientsModel = new ClientsModel();

    const list = await clientsModel.findById(data.id);

    if (!list) {
      throw new AppError({
        statusCode: 400,
        message: "Id não encontrado",
        result: "error",
      });
    }

    if (data.telephone) {
      const phoneValidator =
        /^(?:(?:\+|00)?(55)\s?)?(?:(?:\(?[1-9][0-9]\)?)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/;

      if (!phoneValidator.test(data.telephone)) {
        throw new AppError({
          statusCode: 404,
          message: "Telefone inválido!",
          result: "error",
        });
      }
    }

    const update = await clientsModel.update({
      id: data.id ? data.id : list.id,
      name: data.name ? data.name.trim() : list.name,
      full_address: data.full_address
        ? data.full_address.trim()
        : list.full_address,
      telephone: data.telephone
        ? unMask(data.telephone).trim()
        : list.telephone,
      active: data.active ? data.active : list.active,
    });

    return update;
  }
}
