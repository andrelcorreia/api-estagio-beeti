import { ClientsDto } from "@src/dtos/ClientsDto";
import { AppError } from "@src/helper/errosHandler";
import { ClientsModel } from "@src/models/ClientsModel";
import { unMask } from "node-masker";
import { v4 as uuidV4 } from "uuid";

export class CreateClientsUseCase {
  async execute(
    data: Omit<ClientsDto, "id" | "created_at" | "active">
  ): Promise<ClientsDto> {
    const clientsModel = new ClientsModel();

    const phoneValidator =
      /^(?:(?:\+|00)?(55)\s?)?(?:(?:\(?[1-9][0-9]\)?)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/;

    const regex =
      /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/;

    if (!regex.test(data.document)) {
      throw new AppError({
        statusCode: 404,
        message: "Documento inválido!",
        result: "error",
      });
    }

    const cpf = data.document.replaceAll(/\D/g, "");

    if (!phoneValidator.test(data.telephone)) {
      throw new AppError({
        statusCode: 404,
        message: "Telefone inválido!",
        result: "error",
      });
    }

    const document = await clientsModel.findByDocument(data.document);

    if (document) {
      throw new AppError({
        statusCode: 404,
        message: "Documento já cadastrado!",
        result: "error",
      });
    }

    const telephone = await clientsModel.findByTelephone(data.telephone);

    if (telephone) {
      throw new AppError({
        statusCode: 404,
        message: "Telefone já cadastrado!",
        result: "error",
      });
    }

    const create = await clientsModel.create({
      id: uuidV4(),
      name: data.name.trim(),
      document: cpf.trim(),
      telephone: unMask(data.telephone).trim(),
      full_address: data.full_address.trim(),
    });

    return create;
  }
}
